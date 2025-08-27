import { createRoot } from "react-dom/client";
import "./assets/index.css";
import { Provider } from "react-redux";
import { persister, store, useAppDispatch } from "./store/store";

import routes from "./router/router";
import { RouterProvider } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { setOfflineData } from "./store/reducer/posts";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data?.type === "OFFLINE_DATA") {
      store.dispatch(setOfflineData(event.data.payload));
    }
  });
}
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persister}>
      <RouterProvider router={routes} />
    </PersistGate>
  </Provider>
);
