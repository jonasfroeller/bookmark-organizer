import { mainRouter } from "~/server/api/routers/main";
import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  main: mainRouter,
});

export type AppRouter = typeof appRouter;
