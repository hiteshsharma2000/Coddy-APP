import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="relative w-20 h-20">
        {/* Outer Glow Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-300 opacity-40 blur-sm animate-ping"></div>

        {/* Main Spinner Ring */}
        <div className="absolute inset-0 border-[6px] border-t-transparent border-blue-500 rounded-full animate-spin"></div>

        {/* Center Dot */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg" />
      </div>
    </div>
  );
};

export default Loading;
