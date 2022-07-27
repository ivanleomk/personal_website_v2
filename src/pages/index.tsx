import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const posts = trpc.useQuery(["github.get-posts"]);

  return (
    <>
      <h1>Posts</h1>
      {posts.data?.posts?.map((item) => {
        return <p key={item.title}>{item.title}</p>;
      })}
    </>
  );
};

export default Home;
