import { getPostByIssueId, getPostIds } from "../../utils/github";
import matter from "gray-matter";
import Link from "next/link";
import { renderToHTML } from "../../utils/string";

type BlogPostProps = {
  title: string;
  content: string;
  createdAt: string;
};

type BlogPostParams = {
  params: { issueId: string };
};

export default function BlogPost({ title, content, createdAt }: BlogPostProps) {
  return (
    <>
      <Link
        href={{
          pathname: "/",
        }}
      >
        <p> ← Go Back Home</p>
      </Link>
      <div className="flex items-center justify-center flex-col ">
        <h1 className="mb-10">{title}</h1>
        <div className="xl:grid xl:grid-cols-7 xl:w-full xl:max-w-7xl">
          <div
            className="max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-4xl xl:col-span-4 prose xl:prose-lg px-4"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
          <div className="xl:col-span-3 mx-10 bg-red-400">
            Table of Contents
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }: BlogPostParams) {
  const { issueId } = params;
  const post = await getPostByIssueId(parseInt(issueId));
  const { title, body, createdAt } = post;

  const { content: parsedBody } = matter(body);

  const content = await renderToHTML(parsedBody);

  return {
    props: {
      content: String(content),
      title,
      createdAt,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPostIds();
  const paths = posts.map((issueId) => `/blog/${issueId}`);

  return {
    paths,
    fallback: false,
  };
}
