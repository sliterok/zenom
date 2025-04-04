#!/usr/bin/env node
import { dev } from "./dev.js";
import { build, serve } from "./build.js"; // Assuming build function exists or will be added
import { loadConfig } from "./config.js";

const args = process.argv.slice(2);
const command = args[0];

async function run() {
  const config = await loadConfig(); // Load configuration

  if (command === "dev") {
    console.log("Starting development server...");
    await dev(config);
  } else if (command === "build") {
    console.log("Building project...");
    await build(config); // Call build function with config
  } else if (command === "serve") {
    console.log("Serving project...");
    await serve();
  } else {
    console.error(`Unknown command: ${command}`);
    console.log("Available commands: dev, build, serve");
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("An error occurred:", err);
  process.exit(1);
});
