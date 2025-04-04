# spa-framework-monorepo

Monorepo for the `spa-framework` package and its test application `spa-framework-test`. This project uses [pnpm workspaces](https://pnpm.io/workspaces).

## Overview

This repository contains two main packages:

- **`spa-framework/`**: A toolchain built on [Vite](https://vitejs.dev/) designed to simplify the development and building of full-stack Single Page Applications (SPAs). It provides pre-configured setups for applications using:

  - **Frontend:** [React](https://react.dev/) (using `@vitejs/plugin-react-swc`)
  - **Backend:** [Express](https://expressjs.com/) (using `vite-plugin-node`)
    It handles separate build processes and development servers for the client and server, including proxying API requests from the client dev server to the backend dev server.

- **`spa-framework-test/`**: A sample application demonstrating how to use the `spa-framework`. It includes a basic React client and an Express server.

## Getting Started

1.  **Prerequisites:**

    - Node.js
    - [pnpm](https://pnpm.io/installation)

2.  **Install Dependencies:**
    Run the following command in the root directory of the monorepo:

    ```bash
    pnpm install
    ```

3.  **Build the Framework:**
    The `spa-framework` needs to be built before the test application can use its production build functionality.

    ```bash
    pnpm run build:framework
    # or simply `pnpm run build`
    ```

4.  **Run the Test Application:**

    - **Development Mode:** This command starts both the client and server development servers with hot-reloading, using the `spa-framework`'s `dev` function.

      ```bash
      pnpm run dev:test-app
      ```

      - Client runs on `http://localhost:3000`
      - Server runs on `http://localhost:3001`
      - API requests from the client (`/api/...`) are automatically proxied to the server.

    - **Production Mode:** This command uses the `spa-framework`'s `build` function to create optimized client and server bundles, and then uses the `serve` function to run the application.
      ```bash
      # Ensure the framework is built first (pnpm run build)
      pnpm run build:test-app
      pnpm run serve:test-app
      ```
      The application will be served on `http://localhost:3000`.

## Available Scripts (Root)

- `pnpm run build`: Builds the `spa-framework` package.
- `pnpm run build:framework`: Builds the `spa-framework` package.
- `pnpm run build:test-app`: Builds the `spa-framework-test` application in production mode.
- `pnpm run serve:test-app`: Serves the `spa-framework-test` application in production mode.
- `pnpm run dev:test-app`: Starts the `spa-framework-test` application in development mode.

Refer to the `package.json` files within `spa-framework/` and `spa-framework-test/` for package-specific details.

## CLI Usage

After building the `spa-framework` package (using `pnpm run build`), you can use the following CLI commands:

- `spa-framework dev`: Starts the development server.
- `spa-framework build`: Builds the application for production.
- `spa-framework serve`: Serves the application for production.
