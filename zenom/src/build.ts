import { build as viteBuild, type InlineConfig } from "vite";
import { type RollupOutput } from "rollup";
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
