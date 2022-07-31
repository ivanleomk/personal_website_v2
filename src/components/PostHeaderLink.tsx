import React from "react";

export type PostHeaderLink = {
  text: string;
  id: string;
  children: PostHeaderLink[];
};

type PostHeaderLinkProps = {
  links: PostHeaderLink[];
  activeId: string | undefined;
};

const PostHeaderLink = ({ links, activeId }: PostHeaderLinkProps) => {
  return (
    <>
      {links &&
        links.map(({ id, children, text }, index) => {
          return (
            <li className="my-5" key={id}>
              <a
                className={id === activeId ? "text-blue-600" : ""}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  //@ts-ignore
                  document.querySelector(`#${id}`).scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {text}
              </a>
              <ul className="ml-10">
                {children.map((child, index) => {
                  return (
                    <PostHeaderLink
                      links={[child]}
                      activeId={activeId}
                      key={index}
                    />
                  );
                })}
              </ul>
            </li>
          );
        })}
    </>
  );
  //   return (
  //     {nestedHeadings.map((heading) => (
  //         <li key={heading.id}>
  //           <a
  //             className={heading.id === activeId ? "text-blue-600" : ""}
  //             href={`#${heading.id}`}
  //             onClick={(e) => {
  //               e.preventDefault();
  //               document.querySelector(`#${heading.id}`).scrollIntoView({
  //                 behavior: "smooth",
  //               });
  //             }}
  //           >
  //             {heading.text}
  //           </a>
  //           {heading.children.length > 0 && (
  //             <ul className="list-disc pl-10">
  //               {heading.children.map((child) => (
  //                 <li key={child.id}>
  //                   <a
  //                     onClick={(e) => {
  //                       e.preventDefault();
  //                       document.querySelector(`#${child.id}`).scrollIntoView({
  //                         behavior: "smooth",
  //                       });
  //                     }}
  //                     className={child.id === activeId ? "text-blue-600" : ""}
  //                     href={`#${child.id}`}
  //                   >
  //                     {child.text}
  //                   </a>
  //                 </li>
  //               ))}
  //             </ul>
  //           )}
  //         </li>
  //       ))}
  //   )
};

export default PostHeaderLink;
