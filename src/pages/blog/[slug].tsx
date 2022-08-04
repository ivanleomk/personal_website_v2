import {
  getPostByIssueId,
  getPostIds,
  getSinglePost,
} from "../../utils/github";
import matter from "gray-matter";
import Link from "next/link";
import { renderToHTML, slugify } from "../../utils/string";
import { useEffect } from "react";
import TableOfContents from "../../components/TableOfContents";
import dayjs from "dayjs";

type BlogPostProps = {
  title: string;
  content: string;
  createdAt: string;
};

type BlogPostParams = {
  params: { slug: string };
};

export default function BlogPost({ title, content, createdAt }: BlogPostProps) {
  return (
    <>
      <div className="flex items-center justify-center flex-col mb-40">
        <h1 className="mb-10 font-extrabold text-2xl ">{title}</h1>
        <p className="cursor-pointer hover:underline">
          Published on {dayjs(createdAt).format("DD-MM-YYYY")}
        </p>
        <div className="xl:grid xl:grid-cols-7 xl:w-full xl:max-w-7xl">
          <div
            id="content"
            className="max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-4xl xl:col-span-4 prose xl:prose-lg px-4"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
          <TableOfContents />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }: BlogPostParams) {
  const { slug } = params;
  // const post = await getPostByIssueId(parseInt(issueId));
  const post = await getSinglePost(slugify(slug));
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
  const paths = posts.map((issueId) => `/blog/${slugify(issueId)}`);

  return {
    paths,
    fallback: false,
  };
}
