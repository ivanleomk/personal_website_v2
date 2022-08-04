import React from "react";
import Header from "../components/Header";

type ConstrainedWidthProps = {
  children: React.ReactNode;
};

const ConstrainedWidth = ({ children }: ConstrainedWidthProps) => {
  return (
    <div className="flex items-center flex-col justify-center mt-10">
      <div className="max-w-4xl w-full">
        <Header />
      </div>
      <div className="max-w-4xl w-full ">{children}</div>
    </div>
  );
};

export default ConstrainedWidth;
