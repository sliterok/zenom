# Zenom Framework (`zenom`)

This package contains the core Zenom framework, a toolchain designed for building modern Single Page Applications (SPAs). It provides a command-line interface (CLI) and utilities for development, building, and serving your application.

## Features

- Integrated development server with Hot Module Replacement (HMR).
- Optimized production builds using Vite.
- Static file serving for built applications.
- Configuration loading (`zenom.config.js` or `zenom.config.ts`).

<img src="https://github.com/sliterok/zenom/blob/main/zenom/workflow.jpg?raw=true" width="300px">

## Installation

Zenom is intended to be used as a dependency within your SPA project. Install it using your preferred package manager:

```bash
pnpm add zenom -D
# or
npm install zenom --save-dev
# or
yarn add zenom -D
```

## CLI Commands

The `zenom` CLI provides the following commands:

- **`zenom dev`**

  - Starts the development server for your project.
  - Loads configuration from `spa.config.js` or `spa.config.mjs`.
  - Starts two Vite development servers: one for the client (frontend) and one for the server (backend/API).
  - Enables HMR for a fast development experience.
  - Sets up a proxy for client requests to `/api` to be forwarded to the backend server during development.

<img src="https://github.com/sliterok/zenom/blob/main/zenom/dev.jpg?raw=true" width="400px">

- **`zenom build`**

  - Builds your project for production.
  - Loads configuration from `spa.config.js` or `spa.config.mjs`.
  - Outputs optimized assets to the configured output directory (e.g., `dist/client` and `dist/server`).

- **`zenom serve`**
  - Serves the previously built production assets.
  - Loads configuration from `spa.config.js` or `spa.config.mjs` to determine defaults.
  - Useful for previewing the production build locally.
  - **Configuration Precedence:** Command-line options (`--distPath`, `--port`, `--max-age`) override settings defined in the configuration file. The configuration file settings override the built-in defaults.
  - **Options:**
    - `-d, --distPath <path>`: Specifies the path to the distribution folder containing the built client assets. If not provided, it defaults to the resolved output path calculated from the configuration (`<resolved_root>/<resolved_output>/client`).
    - `-p, --port <number>`: Specifies the port to listen on. If not provided, it defaults to the `port` value in the configuration file (which itself defaults to `3000`).
    - `--max-age <number>`: Specifies the `Cache-Control: public, max-age=<value>` header value in **milliseconds** for serving static assets. If not provided, it defaults to the `maxAge` value in the configuration file (which itself defaults to `300000` milliseconds, or 5 minutes).

<img src="https://github.com/sliterok/zenom/blob/main/zenom/build.jpg?raw=true" width="400px">

## Usage Example (within a project)

Add scripts to your project's `package.json`:

```json
{
  "scripts": {
    "dev": "zenom dev",
    "build": "zenom build",
    "serve": "zenom serve"
  }
}
```

Then run the commands:

```bash
pnpm dev
pnpm build
pnpm serve
```

## Initializing a New Project

Here's a basic guide to setting up a new project with Zenom:

1.  **Create Project Directory:**

    ```bash
    mkdir my-zenom-app
    cd my-zenom-app
    ```

2.  **Initialize Package Manager:**

    ```bash
    pnpm init
    # or npm init -y / yarn init -y
    ```

3.  **Install Zenom:**

    ```bash
    pnpm add zenom -D
    # or npm install zenom --save-dev / yarn add zenom -D
    ```

    _(Note: If developing Zenom locally within the monorepo, you might use `pnpm add zenom@workspace:_ -D` instead)\*

4.  **Create Project Structure:**

    ```bash
    mkdir client server
    mkdir client/src client/public
    touch client/index.html client/src/main.tsx client/src/App.tsx server/index.ts
    ```

5.  **Add Basic Client Files:**

    - `client/index.html`:
      ```html
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/vite.svg" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>My Zenom App</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" src="/src/main.tsx"></script>
        </body>
      </html>
      ```
    - `client/src/main.tsx`:

      ```typescript
      import React from "react";
      import ReactDOM from "react-dom/client";
      import App from "./App";

      ReactDOM.createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
      ```

    - `client/src/App.tsx`: (Example React component)

      ```typescript
      import React, { useState, useEffect } from "react";

      function App() {
        const [message, setMessage] = useState("Loading...");

        useEffect(() => {
          // Example API call (adjust '/api/hello' as needed)
          fetch("/api/hello")
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((data) => setMessage(data.message))
            .catch(() => setMessage("Failed to fetch from API"));
        }, []);

        return (
          <div>
            <h1>My Zenom App</h1>
            <p>API says: {message}</p>
          </div>
        );
      }

      export default App;
      ```

6.  **Add Basic Server File:**

    - `server/index.ts`: (Example Express router)

      ```typescript
      import express from "express";

      const router = express.Router();

      router.get("/hello", (req, res) => {
        res.json({ message: "Hello from the Zenom API!" });
      });

      // Add more routes here...

      export { router }; // Export the router as 'router'
      ```

7.  **Install Dependencies:**
    You'll need React, Express, and their types:

    ```bash
    pnpm add react react-dom express
    pnpm add @types/react @types/react-dom @types/express -D
    ```

8.  **(Optional) Create Configuration:**
    If needed, create `spa.config.js` or `spa.config.mjs` in the project root (`my-zenom-app/`). See the [Configuration](#configuration-spaconfigjs-or-spaconfigmjs) section for details.

9.  **Add Scripts to `package.json`:**

    ```json
    {
      "scripts": {
        "dev": "zenom dev",
        "build": "zenom build",
        "serve": "zenom serve"
      }
    }
    ```

10. **Run:**
    ```bash
    pnpm dev
    ```
    Your basic Zenom application should now be running!

## Example Project

An example project demonstrating how to use Zenom can be found in the monorepo:

- [`zenom-test/`](https://github.com/sliterok/zenom/tree/main/zenom-test)

## Repository

Find the source code and contribute on GitHub: [https://github.com/sliterok/zenom/tree/main/zenom](https://github.com/sliterok/zenom/tree/main/zenom)

## Configuration (`spa.config.js` or `spa.config.mjs`)

You can configure Zenom by creating a `spa.config.js` or `spa.config.mjs` file in your project root. Zenom will automatically search for these files. If neither is found, it will use default settings.

**Default Values:**

- `root`: `./`
- `output`: `./dist`
- `port`: `3000`
- `maxAge`: `300000` (milliseconds)

**Configuration Structure:**

Example `spa.config.js`:

```javascript
// spa.config.js
import { defineConfig } from "zenom";

export default defineConfig({
  root: "./", // Project root directory containing 'client' and 'server' folders. Default: './'.
  output: "./dist", // Output directory relative to the root for build artifacts. Default: './dist'.
  port: 3000, // Port for the client development server. The server/API dev server runs on port + 1. Default: 3000.
  maxAge: 600000, // Optional: Cache-Control max-age in milliseconds for the serve command. Default: 300000 (5 minutes).
  backendConfig: {
    /* ViteUserConfig */
  }, // Optional: Vite configuration overrides merged with Zenom's base server config.
  frontendConfig: {
    /* ViteUserConfig */
  }, // Optional: Vite configuration overrides merged with Zenom's base client config.
});
```

**Details:**

- **`root`**: The base directory for your project, expected to contain `client` and `server` subdirectories. Paths within the configuration (like `output`) and Vite configurations are often resolved relative to this root.
- **`output`**: The directory where built assets will be placed, relative to the `root`. The final output will be structured like `<output>/client` and `<output>/server`.
- **`port`**: The port used by the Vite development server for the client. The API server (also managed by Vite during development via `vite-plugin-node`) will run on `port + 1`. The client dev server is automatically configured to proxy `/api` requests to this API server. This port is also the default for the `zenom serve` command.
- **`maxAge`**: (Optional) Sets the default `Cache-Control: public, max-age=<value>` header value in **milliseconds** when using the `zenom serve` command. This can be overridden by the `--max-age` command-line option. Defaults to `300000`.
- **`backendConfig` / `frontendConfig`**: Allow you to provide specific Vite configuration options that will be deeply merged with Zenom's default Vite settings for the server and client builds, respectively. This allows customization of plugins, build options, server settings, etc.

**`defineConfig` Helper:**

Zenom exports a `defineConfig` helper function which you can wrap your configuration object with. This provides type checking and autocompletion if you're using TypeScript or have appropriate editor support.

```javascript
import { defineConfig } from "zenom";

export default defineConfig({
  // ... your config here
});
```

Refer to the main project [README](../README.md) for the overall monorepo structure.
