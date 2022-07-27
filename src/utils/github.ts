import { graphql } from "@octokit/graphql";
import matter from "gray-matter";

type githubPostStatus = "draft" | "published";
export type githubPostTitle = {
  number: string;
  createdAt: string;
  title: string;
  labels: {
    nodes: [{ name: githubPostStatus }];
  };
  // A post can have some or no attributes
  attributes: {
    // Out of these attributes, we have two possible types, strings and string arrays. We want to support both
    [key: string]: string | string[];
  } | null;
};

export type githubPost = {
  title: string;
  number: string;
  createdAt: string;
  bodyHTML: string;
  body: string;
};

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

export const getPostByTitle: (issueId: number) => Promise<githubPost> = async (
  issueId
) => {
  const { repository } = await graphqlWithAuth(
    `query getPost($number: Int!){
      repository(owner: "ivanleomk", name: "personal_website_v2") {
        issue(number: $number) {
            title
            number
            createdAt
            bodyHTML
            body
        }
      }
  }
`,
    {
      number: Number(issueId),
    }
  );

  return repository.issue;
};

export const getPublishedPosts: () => Promise<githubPostTitle[]> = async () => {
  // TODO: I'll figure it out when I get to beyond 50 posts
  const { repository } = await graphqlWithAuth(`
        {
          repository(owner: "ivanleomk", name: "personal_website_v2") {
            issues(last: 50) {
              edges {
                node {
                    number
                    title
                    createdAt
                    body
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
