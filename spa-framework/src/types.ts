import { RollupOutput } from "rollup";
import type { OutputOptions } from "rollup";

export interface IOptions {
  overrideInputPath?: string;
  overrideOutputPath?: string;
}

export interface ServeOptions {
  distPath: string;
}

export interface IBuildResult {
  clientOutput: RollupOutput;
  serverOutput: RollupOutput;
}
