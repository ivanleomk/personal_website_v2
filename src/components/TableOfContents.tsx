import React, { useEffect, useState } from "react";
import useHeadingsData from "../hook/useHeadingData";
import useIntersectionObserver from "../hook/useIntersectionObserver";
import PostHeaderLink from "./PostHeaderLink";

const TableOfContents = () => {
  const { nestedHeadings } = useHeadingsData();
  const [activeId, setActiveId] = useState();

  useIntersectionObserver(setActiveId);

  return (
    <div
      className="xl:col-span-3 mx-10  sticky overflow-auto "
      style={{
        top: "40px",
        maxHeight: "calc(100vh - 130px)",
        bottom: "60px",
      }}
    >
      <div className="hidden xl:block xl:cursor-pointer xl:text-xl xl:py-10 xl:px-4 ">
        <p className="font-extrabold">Table Of Contents</p>
        <ul>
          <PostHeaderLink links={nestedHeadings} activeId={activeId} />
        </ul>
      </div>
    </div>
  );
};

export default TableOfContents;
