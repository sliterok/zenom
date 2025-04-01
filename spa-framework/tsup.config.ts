import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  format: ["esm"],
  platform: "neutral",
  dts: true,
  bundle: true,
});
