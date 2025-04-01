import { build as viteBuild, type InlineConfig } from "vite";
import { type RollupOutput } from "rollup";
import { pathToFileURL } from "node:url";
import express, { Express } from "express";
import { IOptions, IBuildResult } from "./types";
import { getConfig } from "./config";

export async function build(
  opts?: IOptions,
  viteConfig?: InlineConfig
): Promise<IBuildResult> {
  const { clientConfig, serverConfig } = getConfig(opts, viteConfig);

  const [clientOutput, serverOutput] = (await Promise.all([
    viteBuild(clientConfig),
    viteBuild(serverConfig),
  ])) as [RollupOutput, RollupOutput];

  return {
    clientOutput,
    serverOutput,
  };
}

export async function serve(distPath = "dist") {
  const location = pathToFileURL(
    `${process.cwd()}/${distPath}/server/index.cjs`
  );
  const server = await import(location.href);
  const app = server.app as Express;

  app.use((req, res, next) => {
    const isHtml = req.headers.accept?.startsWith("text/html");
    if (isHtml)
      return res.sendFile("./dist/client/index.html", {
        root: process.cwd(),
      });

    next();
  });

  app.use(express.static("./dist/client"));

  app.listen(3000);
}
