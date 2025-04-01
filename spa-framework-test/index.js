import { serve, build } from "spa-framework";

async function init() {
  await build();
  await serve();
}

init();
