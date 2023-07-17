import React from "react";

const CustomLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-autoloader bg-opacity-10 backdrop-blur-sm">
      <span className="loader_custom"></span>
    </div>
  );
};

export default CustomLoader;
