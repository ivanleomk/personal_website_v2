import { getPostByTitle, getPublishedPosts } from "../../utils/github";
import matter from "gray-matter";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import Link from "next/link";

type BlogPostProps = {
  title: string;
  content: string;
};

type BlogPostParams = {
  params: { issueId: string };
};

export default function BlogPost({ title, content }: BlogPostProps) {
  return (
    <>
      <Link
        href={{
          pathname: "/",
        }}
      >
        <p> ← Go Back Home</p>
      </Link>
      <div className="prose mx-auto">
        <h1>{title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </>
  );
}

export async function getStaticProps({ params }: BlogPostParams) {
  const { issueId } = params;
  console.log(issueId);
  const post = await getPostByTitle(parseInt(issueId));
  const { title, body } = post;
  const { content: parsedBody } = matter(body);

  const content = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(parsedBody);

  return {
    props: {
      content: String(content),
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPublishedPosts();
  const paths = posts.map((post) => `/blog/${post.number}`);

  return {
    paths,
    fallback: false,
  };
}
