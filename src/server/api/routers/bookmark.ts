import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const bookmarkRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      url: z.string().url(),
      name: z.string().min(1),
      isFavorite: z.boolean().optional(),
      folderId: z.string().optional(),
      ogTitle: z.string().optional(),
      ogDescription: z.string().optional(),
      ogImage: z.string().optional(),
      favicon: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.bookmark.create({
        data: {
          url: input.url,
          name: input.name,
          isFavorite: input.isFavorite ?? false,
          ogTitle: input.ogTitle,
          ogDescription: input.ogDescription,
          ogImage: input.ogImage,
          favicon: input.favicon,
          folderId: input.folderId,
          userId: ctx.session.user.id,
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.bookmark.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        folder: true,
        bookmarkTags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.bookmark.findUnique({
        where: { 
          id: input.id,
          userId: ctx.session.user.id 
        },
        include: {
          folder: true,
          bookmarkTags: {
            include: {
              tag: true,
            },
          },
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      url: z.string().url().optional(),
      name: z.string().min(1).optional(),
      isFavorite: z.boolean().optional(),
      folderId: z.string().optional().nullable(),
      ogTitle: z.string().optional(),
      ogDescription: z.string().optional(),
      ogImage: z.string().optional(),
      favicon: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const bookmark = await ctx.db.bookmark.findUnique({
        where: { 
          id: input.id,
          userId: ctx.session.user.id 
        },
      });

      if (!bookmark) {
        throw new Error("Bookmark not found or not authorized");
      }

      return ctx.db.bookmark.update({
        where: { id: input.id },
        data: {
          url: input.url,
          name: input.name,
          isFavorite: input.isFavorite,
          folderId: input.folderId,
          ogTitle: input.ogTitle,
          ogDescription: input.ogDescription,
          ogImage: input.ogImage,
          favicon: input.favicon,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const bookmark = await ctx.db.bookmark.findUnique({
        where: { 
          id: input.id,
          userId: ctx.session.user.id 
        },
      });

      if (!bookmark) {
        throw new Error("Bookmark not found or not authorized");
      }

      return ctx.db.bookmark.delete({
        where: { id: input.id },
      });
    }),
});
