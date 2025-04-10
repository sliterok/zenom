# Zenom Monorepo

Welcome to the Zenom monorepo! This repository contains the **Zenom framework** (`zenom`) and a **demonstration project** (`zenom-test`) showcasing its usage.

**Zenom** is a modern, opinionated toolchain built on top of [Vite](https://vitejs.dev/) designed to simplify the development, building, and serving of full-stack Single Page Applications (SPAs). It provides a unified CLI experience for managing both the frontend (client) and backend (server/API) components of your application.

**Key Features:**

- **Unified Dev Experience:** Start both client and server development servers with a single command (`zenom dev`).
- **Integrated Build Process:** Build optimized client and server assets for production (`zenom build`).
- **Simple Production Preview:** Serve your built application locally (`zenom serve`).
- **Vite Powered:** Leverages Vite's speed and features like Hot Module Replacement (HMR) for the client and efficient server-side bundling via `vite-plugin-node`.
- **Convention over Configuration:** Encourages a standard project structure (`client/`, `server/`) but allows customization via `spa.config.js` or `spa.config.mjs`.
- **TypeScript First:** Designed with TypeScript in mind.

## Repository Structure

This monorepo is organized using `pnpm` workspaces:

- **`zenom/`**: The core `zenom` framework package. This contains the CLI (`zenom dev`, `zenom build`, `zenom serve`) and the underlying logic for managing Vite configurations and processes. ([View Package README](./zenom/README.md))
- **`zenom-test/`**: An example full-stack SPA project built using the `zenom` framework. It demonstrates the recommended project structure (`client/`, `server/`) and configuration. ([View Example README](./zenom-test/README.md))

## Getting Started & Development

This project uses `pnpm` as the package manager. Ensure you have it installed (`npm install -g pnpm`).

**Important:** All commands below should be run from the **monorepo root directory**

- **Install dependencies:**
  ```bash
  pnpm install
  ```
- **Build the Zenom framework (`zenom` package):**
  ```bash
  pnpm build:framework
  # or the default build script:
  pnpm build
  ```
- **Run the test application (`zenom-test`) using the Zenom CLI (development mode):**
  ```bash
  pnpm --filter zenom-test dev
  # Or using the convenience script:
  pnpm dev:test-app
  ```
- **Build the test application (`zenom-test`) using the Zenom CLI (production):**
  ```bash
  pnpm --filter zenom-test build
  # Or using the convenience script:
  pnpm build:test-app
  ```
- **Serve the built test application (`zenom-test`) using the Zenom CLI:**
  ```bash
  pnpm --filter zenom-test serve
  # Or using the convenience script:
  pnpm serve:test-app
  ```

## Configuration

Individual projects using the Zenom framework (like `zenom-test`) can be configured using a `spa.config.js` or `spa.config.mjs` file in their respective root directories. For detailed configuration options, please refer to the [Zenom package README](./zenom/README.md#configuration-spaconfigjs-or-spaconfigmjs).

## Repository

Find the source code and contribute on GitHub: [https://github.com/sliterok/zenom](https://github.com/sliterok/zenom)
