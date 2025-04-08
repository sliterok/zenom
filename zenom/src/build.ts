import { build as viteBuild, type InlineConfig, UserConfig } from "vite";
import { type RollupOutput } from "rollup";
import { pathToFileURL } from "node:url";
import express, { Express } from "express";
import { IBuildResult } from "./types";

interface BuildConfig {
  clientConfig: InlineConfig;
  serverConfig: InlineConfig;
}

export async function build(config: BuildConfig): Promise<IBuildResult> {
  const { clientConfig, serverConfig } = config;

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

  // 5 min cache
  app.use(express.static("./dist/client", { maxAge: 300_000 }));

  app.listen(3000);
}
