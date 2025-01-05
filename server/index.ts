// server/index.ts

import express from "express";
import next from "next";

// "get-port@6" は ESM専用 → dynamic import + port配列を指定
async function main() {
  const dev = process.env.NODE_ENV !== "production";
  const app = next({ dev });
  const handle = app.getRequestHandler();

  await app.prepare();

  // ESM only の get-port を dynamic import
  const { default: getPort } = await import("get-port");

  // 3006 ~ 3016 辺りで空きを探す
  const portCandidates = [];
  for (let p = 3006; p <= 3016; p++) {
    portCandidates.push(p);
  }
  const port = await getPort({ port: portCandidates });
  console.log("Chosen port is:", port);

  // Express
  const server = express();

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Custom server ready on http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
