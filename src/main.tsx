import { createRoot } from "react-dom/client";
import "./assets/index.css";
import { Provider } from "react-redux";
import { persister, store } from "./store/store";

import routes from "./router/router";
import { RouterProvider } from "react-router";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persister}>
      <RouterProvider router={routes} />
    </PersistGate>
  </Provider>
);
