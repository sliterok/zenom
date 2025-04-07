# Zenom Test Application (`zenom-test`)

This package serves as an example application demonstrating how to build a full-stack Single Page Application (SPA) using the `zenom` framework.

## Purpose

The primary goal is to showcase the features and usage patterns of `zenom`, including:

- Project structure for client and server code.
- Configuration using `zenom.config.js` or `zenom.config.ts` (though not explicitly present in this simple example, `zenom` would load it if found).
- Running the development server (`zenom dev`).
- Building for production (`zenom build`).
- Serving the production build (`zenom serve`).

## Structure

- **`client/`**: Contains the frontend React application.
  - `index.html`: The main HTML entry point.
  - `src/main.tsx`: The entry point for the React application.
  - `src/App.tsx`: The root React component, demonstrating basic UI.
  - `public/`: Static assets.
- **`server/`**: Contains the backend Express application.
  - `index.ts`: Defines a simple Express server, exporting the `app` instance as required by `zenom`'s development server integration.
- **`package.json`**: Defines dependencies (React, Express, `zenom` via workspace protocol) and scripts that utilize the `zenom` CLI.
- **`tsconfig.*.json`**: TypeScript configuration files for the client and server.

## Running the Application

Ensure you have installed dependencies from the **monorepo root** first:

```bash
# From the monorepo root
pnpm install
```

Then, navigate to this directory (`zenom-test`) and use the following scripts:

- **Development Mode:**

  ```bash
  pnpm dev
  ```

  This executes `zenom dev`, starting the integrated development environment with HMR for both client and server code.

- **Build for Production:**

  ```bash
  pnpm build
  ```

  This executes `zenom build`, creating optimized production bundles for the client and server in the `dist/` directory.

- **Serve Production Build:**

  ```bash
  pnpm serve
  ```

  This executes `zenom serve`, serving the contents of the `dist/` folder (created by `pnpm build`) locally, typically on port 3000.

## Repository

Find the source code and contribute on GitHub: [https://github.com/sliterok/zenom/tree/main/zenom-test](https://github.com/sliterok/zenom/tree/main/zenom-test)

Refer to the main project [README](../README.md) for the overall monorepo structure.
