import { createRouter } from "./context";
import { z } from "zod";
import { getPostByIssueId, getPublishedPosts } from "../../utils/github";

export const githubRouter = createRouter()
  .query("get-posts", {
    async resolve({ input }) {
      const repositoryInformation = await getPublishedPosts();
      return {
        posts: repositoryInformation,
      };
    },
  })
  .query("getPost", {
    input: z.object({ issueId: z.number() }),
    async resolve({ input }) {
      const post = getPostByIssueId(input.issueId);
      return {
        post: null,
      };
    },
  });
