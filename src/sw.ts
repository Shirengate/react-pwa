import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheOnly, NetworkFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

declare const self: ServiceWorkerGlobalScope;
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request }) => request.destination === "document",
  new NetworkFirst({
    cacheName: "html-documents",
    plugins: [],
  })
);

registerRoute(
  ({ url, request }) => {
    console.log(url);

    return request.method === "GET" && url.pathname.includes("tasks");
  },
  new NetworkFirst({
    cacheName: "api-dynamic",
    networkTimeoutSeconds: 3, // Таймаут 3 секунды
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 300 }), // 5 минут
    ],
  })
);

const POST_CACHE = "post-cache";

registerRoute(
  ({ url, request }) =>
    request.method == "GET" && url.pathname.includes("posts"),
  async ({ _, request }) => {
    try {
      const response = await fetch(request);
      const cache = await caches.open(POST_CACHE);
      cache.put(request, response.clone());
      return response;
    } catch (err) {
      const cache = await caches.open(POST_CACHE);
      const keys = await cache.keys();

      const allItems = [];

      for (const key of keys) {
        const cachedResponse = await cache.match(key);
        if (cachedResponse) {
          const data = await cachedResponse.json();
          allItems.push(...data);
        }
      }

      const clientsList = await self.clients.matchAll({ type: "window" });
      for (const client of clientsList) {
        client.postMessage({
          type: "OFFLINE_DATA",
          payload: allItems,
        });
      }

      return new Response(JSON.stringify({ data: [], offline: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }
);
