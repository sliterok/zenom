#!/usr/bin/env node
import { Command } from "commander";
import { dev } from "./dev.js";
import { build, serve } from "./build.js";
import { loadConfig } from "./config.js";
import type { ServeOptions } from "./types.js"; // Assuming types are defined here

const program = new Command();
program
  .command("dev")
  .description("Start development server")
  .action(async () => {
    const config = await loadConfig();
    console.log("Starting development server...");
    await dev(config);
  });

program
  .command("build")
  .description("Build the project")
  .action(async () => {
    const config = await loadConfig();
    console.log("Building project...");
    await build(config);
  });

program
  .command("serve")
  .description("Serve the built project")
  .option("-d, --distPath <path>", "Path to the dist folder", "./dist")
  .action(async (options: ServeOptions) => {
    // Added type annotation
    console.log("Serving project...");
    await serve(options.distPath);
  });

program.parse(process.argv);
