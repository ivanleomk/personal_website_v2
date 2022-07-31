import { graphql } from "@octokit/graphql";
import matter from "gray-matter";
import { slugify } from "./string";

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
  body: string;
};

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

export const getSinglePost: (slug: string) => Promise<githubPost> = async (
  slug: string
) => {
  const { repository } = await graphqlWithAuth(
    `
    query getPost{
      repository(owner: "ivanleomk", name: "personal_website_v2") {
        issues(last:100){
          edges{
            node{
              title
              number
              createdAt
              body
            }
          }
        }
      }
}
    `
  );

  //@ts-ignore
  const post = repository.issues.edges.filter((issue) => {
    return slugify(issue.node.title) === slug;
  })[0].node;

  return post;
};

export const getPostByIssueId: (
  issueId: number
) => Promise<githubPost> = async (issueId) => {
  const { repository } = await graphqlWithAuth(
    `query getPost($number: Int!){
      repository(owner: "ivanleomk", name: "personal_website_v2") {
        issue(number: $number) {
            title
            number
            createdAt
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

export const getPostIds: () => Promise<string[]> = async () => {
  const { repository } = await graphqlWithAuth(
    `query getPostIds {
      repository(owner: "ivanleomk", name: "personal_website_v2") {
        issues(last: 100) {
            nodes {
                title
            }
        }
      }
  }
`
  );

  // Quick Type Definition here
  return repository.issues.nodes.map((issue: { title: string }) => issue.title);
};

export const getPublishedPosts: () => Promise<githubPostTitle[]> = async () => {
  const { repository } = await graphqlWithAuth(`
        {
          repository(owner: "ivanleomk", name: "personal_website_v2") {
            issues(last: 10) {
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
        const { data } = matter(node.body);
        return { ...node, attributes: data };
      })
      .filter((post: githubPostTitle) => {
        return post.labels.nodes.some((label) => label.name === "published");
      })
  );
};
