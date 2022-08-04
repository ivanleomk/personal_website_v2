import PostLink from "../components/PostLink";
import ConstrainedWidth from "../layout/ConstrainedWidth";
import { getPublishedPosts, githubPostTitle } from "../utils/github";

type HomePageProps = {
  posts: githubPostTitle[];
};

const Home = ({ posts }: HomePageProps) => {
  return (
    <>
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Yo I&apos;m Ivan
        </h2>
        <p className="text-xl text-gray-500">I&apos;m a software engineer</p>
      </div>
      <div className="container mx-auto mt-10">
        <div className="max-w-2xl">
          <div className="flex flex-col items-start justify-content">
            <h1 className="font-bold text-lg tracking-tight">Latest Posts</h1>
            <ul>
              {posts &&
                posts?.map((item) => {
                  return <PostLink key={item.title} post={item} />;
                })}
            </ul>
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

export default Home;
