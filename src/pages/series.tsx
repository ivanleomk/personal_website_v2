import React from "react";
import { getPublishedPosts } from "../utils/github";

type SeriesType = {
  title: string;
  postIssueId: number[];
  description: string;
};

const Series = ({ posts }) => {
  console.log(posts);
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
            <h1 className="font-bold text-lg tracking-tight">Latest Series</h1>
            <ul>Posts</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const posts = await getPublishedPosts();
  return {
    props: {
      posts,
    },
  };
}

export default Series;
