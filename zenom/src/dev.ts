import { type InlineConfig, createServer, ViteDevServer } from "vite";

interface DevConfig {
  clientConfig: InlineConfig;
  serverConfig: InlineConfig;
}

export async function dev(
  config: DevConfig
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
