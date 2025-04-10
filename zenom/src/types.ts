import { RollupOutput } from "rollup";
import type { UserConfig as ViteUserConfig } from "vite"; // Import Vite's UserConfig

// Defines the structure of the spa.config.js file
export interface SpaConfig {
  root?: string; // Default: './'
  output?: string; // Default: './dist' (relative to root)
  backendConfig?: ViteUserConfig; // Vite config overrides for the server
  frontendConfig?: ViteUserConfig; // Vite config overrides for the client
  port?: number; // Default: 3000 (for dev server)
  maxAge?: number; // Default: 300_000 (for serve command Cache-Control header)
}

export interface IBuildResult {
  clientOutput: RollupOutput;
  serverOutput: RollupOutput;
}
