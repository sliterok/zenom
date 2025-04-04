import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs/promises";
import { InlineConfig, mergeConfig, UserConfig } from "vite";
import { IOptions } from "./types";
import { VitePluginNode } from "vite-plugin-node";

// Keep the original getConfig function
function getConfig(opts?: IOptions, viteConfig?: UserConfig) {
  const inputPath = opts?.overrideInputPath || "./";
  const outputPath = opts?.overrideOutputPath || "./dist";

  const clientConfig: InlineConfig = mergeConfig<InlineConfig, InlineConfig>(
    {
      root: path.join(inputPath, "client"),
      build: {
        outDir: path.join("../", outputPath, "client"),
        emptyOutDir: true,
      },
      plugins: [react()],
      server: {
        port: 3000,
        proxy: {
          "/api": "http://localhost:3001",
        },
      },
    },
    viteConfig || {},
    false
  );

  const serverConfig: InlineConfig = mergeConfig<InlineConfig, InlineConfig>(
    {
      root: path.join(inputPath, "server"),
      build: {
        outDir: path.join("../", outputPath, "server"),
        emptyOutDir: true,
      },
      plugins: VitePluginNode({
        adapter: "express",
        appPath: "index.ts",
        exportName: "app",
      }),
      server: {
        port: 3001,
      },
    },
    viteConfig || {},
    false
  );

  return { clientConfig, serverConfig };
}

// Define the structure of the config file
interface SpaConfigFile {
  options?: IOptions;
  viteConfig?: UserConfig;
}

// New function to load config from a file
export async function loadConfig() {
  const possibleConfigFiles = ["spa.config.js", "spa.config.mjs"];
  let userConfig: SpaConfigFile = {};
  let foundConfigFile = false;

  for (const configFile of possibleConfigFiles) {
    const configPath = path.resolve(process.cwd(), configFile);
    try {
      await fs.access(configPath);
      // Dynamically import the config file
      const importedConfig = await import(`file://${configPath}`);
      userConfig = importedConfig.default || importedConfig;
      foundConfigFile = true;
      console.log(`Loaded configuration from ${configFile}`);
      break; // Stop searching once a config file is found
    } catch (error: any) {
      if (error.code !== "ENOENT") {
        // Log errors other than file not found
        console.error(`Error loading config file ${configFile}:`, error);
      }
      // Continue searching if file not found
    }
  }

  if (!foundConfigFile) {
    console.log(
      "No spa.config.js or spa.config.mjs found. Using default configuration."
    );
  }

  // Call the original getConfig with loaded options and vite config
  return getConfig(userConfig.options, userConfig.viteConfig);
}
