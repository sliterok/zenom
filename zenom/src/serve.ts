import { pathToFileURL } from "node:url";
import express, { Router } from "express";
import path from "path";
import { IServeConfig } from "./types";
import { success } from "./log";

export async function serve(options: IServeConfig) {
  const { distPath, port, maxAge } = options;
  const serverEntryPath = path.resolve(
    process.cwd(),
    distPath,
    "server/index.js"
  );
  const clientStaticPath = path.resolve(process.cwd(), distPath, "client");

  const location = pathToFileURL(serverEntryPath);
  const backend = await import(location.href);
  const api = backend.router as Router;

  const app = express();
  app.listen(port, () => success.log(`Listening on http://0.0.0.0:${port}...`));

  app.use("/api", api);

  const headers = { maxAge };
  app.use(express.static(clientStaticPath, headers));
  app.use((req, res) =>
    res.sendFile(path.join(clientStaticPath, "index.html"), headers)
  );
}
