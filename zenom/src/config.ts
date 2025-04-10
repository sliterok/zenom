import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs/promises";
import { InlineConfig, mergeConfig } from "vite";
import { SpaConfig } from "./types";
import { VitePluginNode } from "vite-plugin-node";
import express, { Router } from "express";

const DEFAULT_ROOT = "./";
const DEFAULT_OUTPUT = "./dist";
const DEFAULT_PORT = 3000;
const DEFAULT_MAXAGE = 300_000; // 5 min

export async function loadConfig() {
  const possibleConfigFiles = ["spa.config.js", "spa.config.mjs"];
  let loadedUserConfig: Partial<SpaConfig> = {};
  let foundConfigFile = false;

  for (const configFile of possibleConfigFiles) {
    const configPath = path.resolve(process.cwd(), configFile);
    try {
      await fs.access(configPath);
      const importedConfig = await import(`file://${configPath}`);
      loadedUserConfig = importedConfig.default || importedConfig;
      foundConfigFile = true;
      console.log(`Loaded configuration from ${configFile}`);
      break;
    } catch (error: any) {
      if (error.code !== "ENOENT") {
        console.error(`Error loading config file ${configFile}:`, error);
      }
    }
  }

  if (!foundConfigFile) {
    console.log(
      "No spa.config.js or spa.config.mjs found. Using default configuration."
    );
  }

  const resolvedConfig: Required<SpaConfig> = {
    root: loadedUserConfig.root ?? DEFAULT_ROOT,
    output: loadedUserConfig.output ?? DEFAULT_OUTPUT,
    port: loadedUserConfig.port ?? DEFAULT_PORT,
    backendConfig: loadedUserConfig.backendConfig ?? {},
    frontendConfig: loadedUserConfig.frontendConfig ?? {},
    maxAge: loadedUserConfig.maxAge ?? DEFAULT_MAXAGE,
  };

  const absoluteRoot = path.resolve(process.cwd(), resolvedConfig.root);
  const absoluteOutput = path.resolve(absoluteRoot, resolvedConfig.output);

  const clientBaseConfig: InlineConfig = {
    root: path.join(absoluteRoot, "client"),
    build: {
      outDir: path.join(absoluteOutput, "client"),
      emptyOutDir: true,
    },
    plugins: [react()] as any,
    server: {
      port: resolvedConfig.port,
      proxy: {
        "/api": `http://localhost:${resolvedConfig.port + 1}`,
      },
    },
  };
  const clientConfig = mergeConfig<InlineConfig, InlineConfig>(
    clientBaseConfig,
    resolvedConfig.frontendConfig,
    false
  );

  let apiRouter: Router;
  const app = express();
  app.use("/api", (req, res, next) => apiRouter(req, res, next));

  const serverBaseConfig: InlineConfig = {
    root: path.join(absoluteRoot, "server"),
    build: {
      outDir: path.join(absoluteOutput, "server"),
      emptyOutDir: true,
    },
    plugins: [
      VitePluginNode({
        adapter: ({ app: router, req, res }) => {
          apiRouter = router;
          app(req, res);
        },
        appPath: "index.ts",
        exportName: "router",
        outputFormat: "module",
      }),
    ] as any,
    server: {
      port: resolvedConfig.port + 1,
    },
  };
  const serverConfig = mergeConfig<InlineConfig, InlineConfig>(
    serverBaseConfig,
    resolvedConfig.backendConfig,
    false
  );

  return { clientConfig, serverConfig, resolvedConfig };
}

export function defineConfig(config: SpaConfig): SpaConfig {
  return config;
}
