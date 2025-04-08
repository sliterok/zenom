self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate" || event.request.method !== "GET")
    return;

  return event.respondWith(
    (async () => {
      try {
        const response = await fetch("/");
        if (response.status === 200) {
          const cache = await caches.open("v1");
          cache.put("index", response.clone());
        }
        return response;
      } catch (error) {
        console.error("Fallback fetch failed:", error);

        const cache = await caches.open("v1");
        const response = await cache.match("index");
        if (response) {
          console.log("Returning cached");
          return response;
        }

        return new Response("Offline", { status: 503 });
      }
    })()
  );
});
