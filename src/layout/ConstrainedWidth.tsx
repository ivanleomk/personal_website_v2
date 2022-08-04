import React from "react";

type ConstrainedWidthProps = {
  children: React.ReactNode;
};

const ConstrainedWidth = ({ children }: ConstrainedWidthProps) => {
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="max-w-4xl w-full ">{children}</div>
    </div>
  );
};

export default ConstrainedWidth;
