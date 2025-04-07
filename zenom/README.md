# Zenom Framework (`zenom`)

This package contains the core Zenom framework, a toolchain designed for building modern Single Page Applications (SPAs). It provides a command-line interface (CLI) and utilities for development, building, and serving your application.

## Features

- Integrated development server with Hot Module Replacement (HMR).
- Optimized production builds using Vite.
- Static file serving for built applications.
- Configuration loading (`zenom.config.js` or `zenom.config.ts`).

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
  - Loads configuration from `zenom.config.js` or `zenom.config.ts`.
  - Enables HMR for a fast development experience.

- **`zenom build`**

  - Builds your project for production.
  - Loads configuration from `zenom.config.js` or `zenom.config.ts`.
  - Outputs optimized assets typically to a `dist/` directory (configurable).

- **`zenom serve`**
  - Serves the previously built production assets.
  - Useful for previewing the production build locally.
  - `--distPath <path>`: Specifies the path to the distribution folder (defaults to `./dist`).

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

## Example Project

An example project demonstrating how to use Zenom can be found in the monorepo:

- [`zenom-test/`](https://github.com/sliterok/zenom/tree/main/zenom-test)

## Repository

Find the source code and contribute on GitHub: [https://github.com/sliterok/zenom/tree/main/zenom](https://github.com/sliterok/zenom/tree/main/zenom)

Refer to the main project [README](../README.md) for the overall monorepo structure.
