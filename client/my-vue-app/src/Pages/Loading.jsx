import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-blue-300 opacity-50 rounded-full blur-md"></div>
      </div>
    </div>
  );
};

export default Loading;
