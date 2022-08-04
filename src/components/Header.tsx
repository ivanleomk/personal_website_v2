import Link from "next/link";
import React from "react";
import { FiTwitter } from "react-icons/Fi";
import { FaGithub } from "react-icons/Fa";

const navigation = [
  { name: "Home", href: "/" },
  //   { name: "Articles", href: "/" },
  { name: "Series", href: "/series" },
];

const Header = () => {
  return (
    <nav className=" py-4 mb-4 flex justify-between">
      <div className="">
        {navigation.map((item) => {
          return (
            <Link key={item.name} href={item.href}>
              <span className=" cursor-pointer text-base mr-4 font-medium text-black hover:text-indigo-50">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="flex items-center space-x-6">
        <Link href={"https://twitter.com/ivanleomk"}>
          <FiTwitter className="h-6 w-6 cursor-pointer" />
        </Link>
        <Link href={"https://github.com/ivanleomk"}>
          <FaGithub className="h-6 w-6 cursor-pointer " />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
