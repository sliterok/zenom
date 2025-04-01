import react from "@vitejs/plugin-react-swc";
import path from "path";
import { InlineConfig, mergeConfig } from "vite";
import { IOptions } from "./types";
import { VitePluginNode } from "vite-plugin-node";

export function getConfig(opts?: IOptions, viteConfig?: InlineConfig) {
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
