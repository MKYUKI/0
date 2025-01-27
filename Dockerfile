# File: Dockerfile
##########################################################################
# Stage 1: Build Next.js
##########################################################################
FROM node:18-alpine AS build-next
WORKDIR /app

# 1) package.json, package-lock.json (or pnpm lock) をCOPY
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

# 2) ソースをCOPY => もしprisma使うなら prisma/ もCOPY
COPY prisma/ ./prisma
COPY pages/ ./pages
COPY components/ ./components
COPY styles/ ./styles

# 3) Prisma generate (option) => Next build
#    prisma schema.prismaがある => generate
RUN npm run prisma:generate || echo "No prisma found"
# さらにDB pushしたいなら => npm run prisma:dbpush || echo "No DB push"
RUN npm run build

##########################################################################
# Stage 2: Prepare Python(Flask)
##########################################################################
FROM python:3.10-slim AS build-py
WORKDIR /app

RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates curl \
 && rm -rf /var/lib/apt/lists/*

COPY python/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY python/proxy.py .

##########################################################################
# Stage 3: Build Java (Spring Boot) - fallback
##########################################################################
FROM maven:3.9.4-eclipse-temurin-17 AS build-java
WORKDIR /app

COPY java/pom.xml .
RUN mvn dependency:go-offline

COPY java/src ./src
RUN mvn package -DskipTests

##########################################################################
# Stage 4: Final Container with Supervisor
##########################################################################
FROM ubuntu:22.04
WORKDIR /app

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      ca-certificates curl supervisor \
 && rm -rf /var/lib/apt/lists/*

####################################################################
# (A) Next.js => COPY from build-next
####################################################################
WORKDIR /app/nextjs
COPY --from=build-next /app/node_modules ./node_modules
COPY --from=build-next /app/.next ./.next
COPY --from=build-next /app/package*.json ./
COPY --from=build-next /app/tsconfig.json ./
COPY --from=build-next /app/prisma ./prisma

####################################################################
# (B) Python => COPY from build-py
####################################################################
WORKDIR /app/python
COPY --from=build-py /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=build-py /app/proxy.py ./proxy.py

####################################################################
# (C) Java => COPY from build-java
####################################################################
WORKDIR /app/java
COPY --from=build-java /app/target/deepseekjava-0.0.1-SNAPSHOT.jar app.jar

####################################################################
# Supervisor => Node(3000), Python(8000), Java(8080)
####################################################################
WORKDIR /app
RUN mkdir -p /etc/supervisor/conf.d

RUN echo "[supervisord]\n" \
"[program:nextjs]\n" \
"command=node /app/nextjs/node_modules/next/dist/bin/next start -p 3000\n" \
"autostart=true\n" \
"autorestart=true\n" \
"startsecs=0\n" \
"\n" \
"[program:python]\n" \
"command=python /app/python/proxy.py\n" \
"autostart=true\n" \
"autorestart=true\n" \
"startsecs=0\n" \
"\n" \
"[program:java]\n" \
"command=java -jar /app/java/app.jar\n" \
"autostart=true\n" \
"autorestart=true\n" \
"startsecs=0\n" \
> /etc/supervisor/conf.d/services.conf

EXPOSE 3000
EXPOSE 8000
EXPOSE 8080

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/services.conf", "-n"]
