import { pathToFileURL } from "node:url";
import express, { Router } from "express";
import path from "path";

export async function serve({
  distPath,
  port,
}: {
  distPath: string;
  port: number;
}) {
  const serverEntryPath = path.resolve(
    process.cwd(),
    distPath,
    "server/index.cjs"
  );
  const clientStaticPath = path.resolve(process.cwd(), distPath, "client");

  const location = pathToFileURL(serverEntryPath);
  const backend = await import(location.href);
  const api = backend.router as Router;

  const app = express();
  app.listen(port, () => {
    console.info(`HTTP Server listening on http://0.0.0.0:${port}...`);
  });

  app.use("/api", api);
  app.use(express.static(clientStaticPath, { maxAge: 300_000 })); // 5 min cache
}
