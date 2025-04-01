import { RollupOutput } from "rollup";

export interface IOptions {
  overrideInputPath?: string;
  overrideOutputPath?: string;
}

export interface IBuildResult {
  clientOutput: RollupOutput;
  serverOutput: RollupOutput;
}
