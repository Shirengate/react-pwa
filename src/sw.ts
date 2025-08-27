import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

declare const self: ServiceWorkerGlobalScope;
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request }) => {
    return (
      request.destination === "document" ||
      request.destination === "style" ||
      request.destination === "script"
    );
  },
  new CacheFirst({
    cacheName: "documentData",
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
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

registerRoute(
  ({ url, request }) => {
    return request.method == "GET" && url.pathname.includes("posts");
  },
  new NetworkFirst({
    cacheName: "paginated-posts",
    networkTimeoutSeconds: 5,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 300 }),
    ],
  })
);
