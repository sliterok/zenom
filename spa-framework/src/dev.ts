import { type InlineConfig, createServer, ViteDevServer } from "vite";

// Define the expected config structure directly
interface DevConfig {
  clientConfig: InlineConfig;
  serverConfig: InlineConfig;
}

export async function dev(
  config: DevConfig
): Promise<{ clientServer: ViteDevServer; apiServer: ViteDevServer }> {
  // No longer need to call getConfig here, use the provided configs
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
