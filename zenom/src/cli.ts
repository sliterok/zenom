#!/usr/bin/env node
import { Command } from "commander";
import path from "path";
import { dev } from "./dev.js";
import { build } from "./build.js";
import { serve } from "./serve.js";
import { loadConfig } from "./config.js";
import { success, info, error } from "./log.js";

const program = new Command();
program
  .command("dev")
  .description("Start development server")
  .action(async () => {
    const config = await loadConfig();
    await dev(config);
    const clientServer = config.clientConfig.server;
    const clientUrl = `http://${clientServer?.host}:${clientServer?.port}`;
    success.log(`Client running on ${clientUrl}`);

    const apiServer = config.serverConfig.server;
    const apiUrl = `http://${apiServer?.host}:${apiServer?.port}`;
    success.log(`API server running on ${apiUrl} (${clientUrl}/api)`);
  });

program
  .command("build")
  .description("Build the project")
  .action(async () => {
    const config = await loadConfig();
    info.log("Building project...");
    await build(config);
    success.log(`Build finished`);
  });

program
  .command("serve")
  .description("Serve the built project")
  .option("-d, --distPath <path>", "Path to the dist folder (overrides config)")
  .option("-p, --port <number>", "Port to listen on (overrides config)")
  .option("--max-age <number>", "Cache-Control max-age in milliseconds")
  .action(
    async (cmdOptions: {
      distPath?: string;
      port?: string;
      maxAge?: string;
    }) => {
      const { resolvedConfig } = await loadConfig();

      const portInput = cmdOptions.port ?? resolvedConfig.port.toString();
      const port = parseInt(portInput, 10);

      if (isNaN(port)) {
        error.log(`Invalid port number provided: ${portInput}`);
        process.exit(1);
      }

      // Determine maxAge: CLI > config > default
      let maxAge: number;
      if (cmdOptions.maxAge) {
        // CLI option takes highest priority
        maxAge = parseInt(cmdOptions.maxAge, 10);
        if (isNaN(maxAge)) {
          error.log(
            `Invalid max-age number provided via CLI: ${cmdOptions.maxAge}`
          );
          process.exit(1);
        }
      } else {
        // Config file value is next priority
        maxAge = resolvedConfig.maxAge;
        if (typeof maxAge !== "number" || isNaN(maxAge)) {
          error.log(
            `Invalid max-age number provided in config file: ${resolvedConfig.maxAge}`
          );
          process.exit(1);
        }
      }

      let distPath: string;
      if (cmdOptions.distPath) {
        distPath = path.resolve(process.cwd(), cmdOptions.distPath);
      } else {
        const absoluteRoot = path.resolve(process.cwd(), resolvedConfig.root);
        distPath = path.resolve(absoluteRoot, resolvedConfig.output);
      }

      await serve({ distPath, port, maxAge });
    }
  );

program.parse(process.argv);
