import React from "react";
import PostLink from "../components/PostLink";
import {
  getPublishedPosts,
  githubPost,
  githubPostTitle,
} from "../utils/github";

type SeriesType = {
  title: string;
  postIssueId: number[];
  description: string;
};

type SeriesProps = {
  posts: githubPostTitle[];
};

const SeriesData: SeriesType[] = [
  {
    title: "Build A Blog with the T3 Stack",
    postIssueId: [1, 3, 4, 5],
    description: "in this series, we build a small blog using the T3 stack.",
  },
];

const Series = ({ posts }: SeriesProps) => {
  return (
    <>
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Blog Post Series
        </h2>
        <p className="text-xl text-gray-500">
          Read through some of the compiled posts by series
        </p>
      </div>
      <div className="container mx-auto mt-10">
        <div className="max-w-2xl">
          <div className="flex flex-col items-start justify-content">
            <h1 className="font-bold text-2xl tracking-tight">Latest Series</h1>
            {posts &&
              SeriesData.map((item) => {
                return (
                  <>
                    <div className="mt-4 font-bold">{item.title}</div>
                    <div className="mt-2">{item.description}</div>
                    <ul className="pl-4 mt-4">
                      {item.postIssueId.map((id) => {
                        const postInformation = posts[id] as githubPostTitle;
                        return (
                          <li key={postInformation.title}>
                            <PostLink post={postInformation} />
                          </li>
                        );
                      })}
                    </ul>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const posts = await getPublishedPosts();
  const issueIdToPost: {
    [key: string]: githubPostTitle;
  } = {};

  posts.forEach((item) => {
    issueIdToPost[item.number] = {
      ...item,
    };
  });
  return {
    props: {
      posts: issueIdToPost,
    },
  };
}

export default Series;
