import { createRoot } from "react-dom/client";
import "./assets/index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

import routes from "./router/router";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
