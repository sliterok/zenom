import { RollupOutput } from "rollup";
import type { InlineConfig, UserConfig as ViteUserConfig } from "vite"; // Import Vite's UserConfig

// Defines the structure of the spa.config.js file
export interface ISpaConfig {
  root?: string; // Default: './'
  output?: string; // Default: './dist' (relative to root)
  backendConfig?: ViteUserConfig; // Vite config overrides for the server
  frontendConfig?: ViteUserConfig; // Vite config overrides for the client
  host?: string; // Default: localhost
  port?: number; // Default: 3000 (for dev server)
  maxAge?: number; // Default: 300_000 (for serve command Cache-Control header)
}

export type IServeConfig = Pick<ISpaConfig, "port" | "maxAge"> & {
  distPath: string;
};

export interface IMergedConfig {
  clientConfig: Partial<InlineConfig>;
  serverConfig: Partial<InlineConfig>;
  resolvedConfig: Required<ISpaConfig>;
}

export interface IBuildResult {
  clientOutput: RollupOutput;
  serverOutput: RollupOutput;
}
