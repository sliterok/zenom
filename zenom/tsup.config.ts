import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts", "./src/cli.ts"],
  format: ["esm"],
  platform: "neutral",
  dts: true,
  bundle: true,
});
