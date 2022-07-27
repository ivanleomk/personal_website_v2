import type { NextPage } from "next";
import Head from "next/head";
import PostLink from "../components/PostLink";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const posts = trpc.useQuery(["github.get-posts"]);

  return (
    <>
      <h1>Posts</h1>

      {posts.data?.posts?.map((item) => {
        return <PostLink key={item.title} post={item} />;
      })}
    </>
  );
};

export default Home;
