# SPA Framework Test Application

This package serves as a test and demonstration application for the `zenom`.

## Purpose

The primary goal of this application is to showcase how to structure and run a full-stack SPA using the `Zenom`. It utilizes the framework's build and development functionalities.

## Structure

- **`client/`**: Contains the frontend React application.
  - `src/App.tsx`: The main application component, demonstrating basic routing with `react-router` and state management.
  - `src/main.tsx`: The entry point for the client application.
- **`server/`**: Contains the backend Express application.
  - `index.ts`: Defines a simple Express app with a basic `/api` endpoint, exporting the `app` instance as required by the `zenom`.
- **`package.json`**: Defines dependencies (React, Express, `zenom`, etc.) and scripts (`start`, `dev`) that utilize the `zenom` CLI.

## Running the Application

This application is intended to be run from the **root of the monorepo** using the scripts defined in the root `package.json`:

- **Development Mode:**

  ```bash
  # From the monorepo root
  pnpm run dev:test-app
  ```

  This starts Vite development servers for both the client (port 3000) and server (port 3001) with hot-reloading.

- **Production Mode:**
  ```bash
  # From the monorepo root
  # Ensure zenom is built first: pnpm run build
  pnpm run start:test-app
  ```
  This builds optimized client and server bundles using the `zenom` and serves the application on port 3000.

Refer to the main [monorepo README](../README.md) for more details on setup and overall project structure.
