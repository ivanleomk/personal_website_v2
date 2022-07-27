import { createRouter } from "./context";
import { z } from "zod";
import { getPublishedPosts, githubPostTitle } from "../../utils/github";

export const githubRouter = createRouter().query("get-posts", {
  async resolve({ input }) {
    const repositoryInformation = await getPublishedPosts();
    return {
      posts: repositoryInformation,
    };
  },
});
