import Head from "next/head";
import PostLink from "../components/PostLink";
import { getPublishedPosts, githubPostTitle } from "../utils/github";
import Image from "next/image";
import matter from "gray-matter";

type HomePageProps = {
  posts: githubPostTitle[];
};

const Home = ({ posts }: HomePageProps) => {
  console.log(posts);
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="max-w-4xl w-full ">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Yo I &apos m Ivan
          </h2>
          <p className="text-xl text-gray-500">I&aposm a software engineer</p>
        </div>
        <div className="container mx-auto mt-10">
          <div className="max-w-lg">
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
      </div>
    </div>

    // <div className="bg-white">
    //   <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
    //     <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
    //       <div className="space-y-5 sm:space-y-4">
    //         <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
    //           Yo I'm Ivan
    //         </h2>
    //         <p className="text-xl text-gray-500">I'm a software engineer</p>
    //       </div>
    //       <div>
    //         <div className="flex items-center space-x-4 lg:space-x-6">
    //           <Image src="/profilePic.jpeg" height={100} width={100} alt = "profile picture" />
    //           <div className="font-medium text-lg leading-6 space-y-1">
    //                   <h3>{person.name}</h3>
    //                   <p className="text-indigo-600">{person.role}</p>
    //                 </div>
    //         </div>
    //         {/* <div className="lg:col-span-2">

    //         <ul
    //           role="list"
    //           className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8"
    //         >
    //           {people.map((person) => (
    //             <li key={person.name}>
    //               <div className="flex items-center space-x-4 lg:space-x-6">
    //                 <Image src="/profilePic.jpeg" height={100} width={100} />

    //                 <div className="font-medium text-lg leading-6 space-y-1">
    //                   <h3>{person.name}</h3>
    //                   <p className="text-indigo-600">{person.role}</p>
    //                 </div>
    //               </div>
    //             </li>
    //           ))}
    //         </ul>
    //       </div> */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
