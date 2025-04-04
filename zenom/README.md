# zenom: A Vite-based Full-Stack SPA Toolchain

`zenom` is a streamlined toolchain built on [Vite](https://vitejs.dev/) for developing and building full-stack Single Page Applications (SPAs). It simplifies the process by providing pre-configured setups for React frontends and Express backends, handling separate build processes and development servers, and including API request proxying.

## Key Features

- **Simplified Setup:** Pre-configured Vite setup for React frontend and Express backend. Minimizes initial configuration overhead.
- **Hot Reloading:** Fast development with hot module replacement for both client and server. Enables rapid iteration and debugging.
- **API Proxying:** Seamless integration between client and server during development. Simplifies API calls during development.
- **Optimized Builds:** Production-ready builds for deployment. Creates optimized bundles for production environments.
- **Clean Architecture:** Clear separation of concerns between frontend and backend. Promotes maintainability and scalability.

## Getting Started

1. **Prerequisites:** Ensure you have Node.js and pnpm installed.

2. **Installation:** This package is part of a monorepo. Install dependencies using `pnpm install` in the root directory.

3. **Build:** Build the `zenom` package using `pnpm run build` (or `pnpm run build:framework`) in the root directory.

4. **Usage:** After building, the `zenom` CLI is available. See the CLI Usage section below.

## CLI Usage

The `zenom` CLI provides the following commands:

- `zenom dev`: Starts the development server.

- `zenom build`: Builds the application for production.

- `zenom serve [options]`: Serves the application for production. Options include:
  - `--distPath <path>`: Path to the dist folder (defaults to `./dist`).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

[MIT](../../LICENSE)
