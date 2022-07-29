import {
  getPostByIssueId,
  getPostIds,
  githubComment,
} from "../../utils/github";
import matter from "gray-matter";
import Link from "next/link";
import PostComment from "../../components/PostComment";
import { renderToHTML } from "../../utils/string";

type BlogPostProps = {
  title: string;
  content: string;
  createdAt: string;
  comments: githubComment[];
};

type BlogPostParams = {
  params: { issueId: string };
};

export default function BlogPost({
  title,
  content,
  createdAt,
  comments,
}: BlogPostProps) {
  console.log(comments);
  return (
    <>
      <Link
        href={{
          pathname: "/",
        }}
      >
        <p> ← Go Back Home</p>
      </Link>
      <div className="flex items-center justify-center flex-col">
        <div className="prose">
          <h1 className="mb-5">{title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>
        <div>
          <div className="max-w-xl">
            {comments &&
              comments.map((comment, index) => {
                return <PostComment key={index} {...comment} index={index} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }: BlogPostParams) {
  const { issueId } = params;
  const post = await getPostByIssueId(parseInt(issueId));
  const { title, body, createdAt, comments: rawComments } = post;
  const parsedComments = rawComments.edges.map((edge) => {
    return {
      ...edge.node,
    };
  });
  const { content: parsedBody } = matter(body);

  const content = await renderToHTML(parsedBody);

  return {
    props: {
      content: String(content),
      title,
      createdAt,
      comments: parsedComments,
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
