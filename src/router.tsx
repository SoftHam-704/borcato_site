import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Esta experiência sempre reabre pela abertura e pelo Hero. Restaurar a
    // posição anterior no reload faria a cortina terminar no meio da história.
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
