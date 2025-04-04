// public/sw.js
const exceptions = ["/favicon.ico", "/sw.js"];
const prefixExceptions = ["/api", "/assets", "/@", "/src"];

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (
    exceptions.includes(url.pathname) ||
    prefixExceptions.some((exception) => url.pathname.startsWith(exception))
  )
    return;

  event.respondWith(fetch("/"));
});
