// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { githubRouter } from "./github-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("github.", githubRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
