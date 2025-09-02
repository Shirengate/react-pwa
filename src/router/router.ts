import MainLayout from "@/layout/MainLayout";
import BlogPage from "@/pages/BlogPage";
import CurrentBlog from "@/pages/CurrentBlog";
import MainPage from "@/pages/MainPage";
import { createBrowserRouter } from "react-router";
const routes = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: MainPage,
      },
      {
        path: "/blog",
        Component: BlogPage,
      },
      {
        path: "/blog/:id",
        Component: CurrentBlog,
      },
    ],
  },
]);

export default routes;
