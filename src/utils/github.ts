import { graphql } from "@octokit/graphql";

type githubPostStatus = "draft" | "published";
export type githubPostTitle = {
  createdAt: string;
  title: string;
  labels: {
    nodes: [{ name: githubPostStatus }];
  };
};

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

export const getPublishedPosts: () => Promise<githubPostTitle[]> = async () => {
  // TODO: I'll figure it out when I get to beyond 50 posts
  const { repository } = await graphqlWithAuth(`
        {
          repository(owner: "ivanleomk", name: "personal_website_v2") {
            
            issues(last: 50) {
              edges {
                node {
                    title
                    createdAt
                    labels(first: 3) {
                        nodes{
                            name
                        }
                    }
                }
              }
            }
          }
        }
      `);

  return (
    repository.issues.edges
      //@ts-ignore
      .map(({ node }) => {
        return { ...node };
      })
      .filter((post: githubPostTitle) => {
        return post.labels.nodes[0].name === "published";
      })
  );
};
