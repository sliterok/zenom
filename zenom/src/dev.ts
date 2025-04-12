import { type InlineConfig, createServer, ViteDevServer } from "vite";
import { IMergedConfig } from "./types";

export async function dev(
  config: IMergedConfig
): Promise<{ clientServer: ViteDevServer; apiServer: ViteDevServer }> {
  const { clientConfig, serverConfig } = config;

  const [clientServer, apiServer] = await Promise.all([
    createServer(clientConfig),
    createServer(serverConfig),
  ]);

  clientServer.listen();
  apiServer.listen();

  return {
    clientServer,
    apiServer,
  };
}
