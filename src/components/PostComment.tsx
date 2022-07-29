import React, { useEffect, useState } from "react";
import { VFileWithOutput } from "unified";
import { githubComment } from "../utils/github";
import { renderToHTML } from "../utils/string";
import { classNames } from "../utils/tailwind";

type PostCommentProps = {
  index: number;
} & githubComment;

const PostComment = ({
  author: { login, avatarUrl },
  createdAt,
  body,
  index,
}: PostCommentProps) => {
  const [loading, setLoading] = useState(true);
  const [renderedHTML, setRenderedHTML] =
    useState<VFileWithOutput<void> | null>(null);

  useEffect(() => {
    renderToHTML(body).then((res) => {
      setRenderedHTML(res);
      setLoading(false);
    });
  });

  if (loading || !renderedHTML) {
    return null;
  }

  return (
    <div key={index} className="flex text-sm text-gray-500 space-x-4">
      <div className="flex-none py-10">
        <img
          src={avatarUrl}
          alt=""
          className="w-10 h-10 bg-gray-100 rounded-full"
        />
      </div>
      <div
        className={classNames(
          index === 0 ? "" : "border-t border-gray-200",
          "flex-1 py-10"
        )}
      >
        <h3 className="font-medium text-gray-900">{login}</h3>
        <p>
          <time dateTime={createdAt}>{createdAt}</time>
        </p>

        <div
          dangerouslySetInnerHTML={{
            __html: String(renderedHTML),
          }}
        />
      </div>
    </div>
  );
};

export default PostComment;
