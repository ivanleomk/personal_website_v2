import Link from "next/link";
import React from "react";

import Image from "next/image";

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
      <div className="flex items-center">
        <span className="mx-4 cursor-pointer">
          <Link href={"https://twitter.com/ivanleomk"}>
            <Image src={`/twitter.svg`} width={32} height={32} alt="twitter" />
          </Link>
        </span>

        <span className="mx-4 cursor-pointer">
          <Link href={"https://github.com/ivanleomk"}>
            <Image src={`/github.svg`} width={32} height={32} alt="Github" />
          </Link>
        </span>
      </div>
    </nav>
  );
};

export default Header;
