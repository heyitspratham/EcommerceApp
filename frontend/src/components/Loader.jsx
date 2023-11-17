import React from "react";

const Loader = () => {
  return (
    <div className="h-[100vh] w-[100vw] grid place-items-center ">
      <div className="h-[10vmax] w-[10vmax] rounded-[50%] border-b-4 border-gray-500 animate-spin"></div>
    </div>
  );
};

export default Loader;
