import React, { useEffect, useState } from "react";
import useHeadingsData from "../hook/useHeadingData";
import useIntersectionObserver from "../hook/useIntersectionObserver";
import PostHeaderLink from "./PostHeaderLink";

const TableOfContents = () => {
  const { nestedHeadings } = useHeadingsData();
  const [activeId, setActiveId] = useState();
  console.log(activeId);

  useIntersectionObserver(setActiveId);

  return (
    <div
      className="xl:col-span-3 mx-10  sticky "
      style={{
        top: "60px",
        maxHeight: "calc(100vh - 90px)",
        bottom: "30px",
      }}
    >
      <div className="cursor-pointer text-xl py-10 px-4">
        <ul>
          <PostHeaderLink links={nestedHeadings} activeId={activeId} />
        </ul>
      </div>
    </div>
  );
};

export default TableOfContents;
