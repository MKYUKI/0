// server/index.ts
import express from 'express';
import getPort from 'get-port';

const defaultPort = 3006;

(async () => {
  const port = await getPort({ port: defaultPort });

  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send(`> Custom server is running on port ${port}`);
  });

  app.listen(port, () => {
    console.log(`> Custom server ready on http://localhost:${port}`);
  });
})();
