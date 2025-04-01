import { type InlineConfig, createServer } from "vite";
import { IOptions } from "./types";
import { getConfig } from "./config";

export async function dev(opts?: IOptions, viteConfig?: InlineConfig) {
  const { clientConfig, serverConfig } = getConfig(opts, viteConfig);

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
