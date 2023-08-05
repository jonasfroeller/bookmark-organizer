import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const mainRouter = createTRPCRouter({
  getSecretMessage: protectedProcedure.query(() => {
    return "heeeeey!";
  }),
});
