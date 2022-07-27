import Link from "next/link";
import React from "react";
import { githubPostTitle } from "../utils/github";
import { slugify } from "../utils/string";

type PostLinkProps = {
  post: githubPostTitle;
};

const PostLink = ({ post }: PostLinkProps) => {
  console.log(post);
  return (
    <Link href={`blog/${post.number}`}>
      <p>{post.title}</p>
    </Link>
  );
};

export default PostLink;
