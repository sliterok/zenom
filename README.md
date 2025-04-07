# Zenom Monorepo

This monorepo contains the Zenom framework and related projects. Zenom is a toolchain designed for building modern Single Page Applications (SPAs).

## Structure

- `zenom/`: The core Zenom framework package ([zenom/](https://github.com/sliterok/zenom/tree/main/zenom)).
- `zenom-test/`: An example project demonstrating the usage of the Zenom framework ([zenom-test/](https://github.com/sliterok/zenom/tree/main/zenom-test)).

## Development

This project uses `pnpm` workspaces. All commands should be run from the monorepo root.

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
- **Run the test application (`zenom-test`) in development mode:**
  ```bash
  pnpm dev:test-app
  ```
- **Build the test application (`zenom-test`) for production:**
  ```bash
  pnpm build:test-app
  ```
- **Serve the built test application (`zenom-test`):**
  ```bash
  pnpm serve:test-app
  ```

## Repository

Find the source code and contribute on GitHub: [https://github.com/sliterok/zenom](https://github.com/sliterok/zenom)
