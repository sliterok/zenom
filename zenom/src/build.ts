import { build as viteBuild } from "vite";
import { type RollupOutput } from "rollup";
import { IBuildResult, IMergedConfig } from "./types";

export async function build(config: IMergedConfig): Promise<IBuildResult> {
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
