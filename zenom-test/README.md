# Zenom Test Application (`zenom-test`)

This package is a demonstration project showcasing how to structure and build a full-stack Single Page Application (SPA) using the **`zenom` framework**. It provides a concrete example of the framework's conventions and capabilities.

## Purpose

This project serves to illustrate:

- **Recommended Project Structure:** How to organize `client` (frontend) and `server` (backend) code within a `zenom`-managed project.
- **Basic Configuration:** While this example uses default settings, it shows where a `spa.config.js` or `spa.config.mjs` would be placed to customize behavior (e.g., ports, build outputs, Vite overrides).
- **Core `zenom` Commands:** Practical usage of `zenom dev`, `zenom build`, and `zenom serve` via `pnpm` scripts.
- **Client-Server Interaction:** A simple setup where the React client can potentially interact with the Express backend (though the current example is minimal).

## Structure

- **`client/`**: Frontend application built with React and TypeScript.
  - `index.html`: Main HTML entry point for Vite.
  - `src/main.tsx`: React application entry point.
  - `src/App.tsx`: Root React component.
  - `public/`: Directory for static assets served directly by Vite.
- **`server/`**: Backend API built with Express and TypeScript.
  - `index.ts`: Defines a basic Express router. **Important:** It exports the router instance as `router`, which is the default `exportName` expected by `zenom`'s underlying `vite-plugin-node` configuration for development integration.
- **`spa.config.js`**: (Optional) Configuration file for `zenom`. This example currently relies on default settings but demonstrates where customization would occur.
- **`package.json`**: Defines project dependencies (including `zenom` via the `workspace:*` protocol, linking it to the local `zenom` package in the monorepo) and scripts (`dev`, `build`, `serve`) that invoke the `zenom` CLI.
- **`tsconfig.*.json`**: TypeScript configuration files tailored for the client (`tsconfig.app.json`) and server (`tsconfig.node.json`) environments, extending a base `tsconfig.json`.

## Running the Application

**Prerequisites:** Ensure you have installed dependencies and built the `zenom` framework from the **monorepo root**:

```bash
# From the monorepo root
pnpm install
pnpm build:framework
```

You can run the application using the scripts defined in `zenom-test/package.json`. These scripts conveniently wrap the `zenom` CLI commands. Run these commands from the `zenom-test` directory or use `pnpm --filter zenom-test <command>` from the monorepo root.

- **Development Mode:**

  ```bash
  # From zenom-test directory
  pnpm dev
  ```

  This executes `zenom dev`. It starts two Vite dev servers:

  - Client server (React app) on the configured port (default: 3000) with HMR.
  - Server/API server (Express app) on port+1 (default: 3001), integrated via `vite-plugin-node`.
  - The client dev server proxies requests starting with `/api` to the server/API dev server.

- **Build for Production:**

  ```bash
  # From zenom-test directory
  pnpm build
  ```

  This executes `zenom build`. It runs Vite builds for both the client and server, placing the optimized output in the configured directory (default: `zenom-test/dist/client` and `zenom-test/dist/server`).

- **Serve Production Build:**
  ```bash
  # From zenom-test directory
  pnpm serve
  ```
  This executes `zenom serve`. It starts a simple static file server for the built client assets (`dist/client`) and attempts to load and run the built server bundle (`dist/server/index.js`). Access the application on the configured port (default: 3000).

## Repository

Find the source code and contribute on GitHub: [https://github.com/sliterok/zenom/tree/main/zenom-test](https://github.com/sliterok/zenom/tree/main/zenom-test)

Refer to the main project [README](../README.md) for the overall monorepo structure.
