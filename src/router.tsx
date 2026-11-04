import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Smooth-scroll to #section links on the home page.
    defaultHashScrollIntoView: { behavior: "smooth" },
    defaultPreloadStaleTime: 0,
  });

  return router;
};
