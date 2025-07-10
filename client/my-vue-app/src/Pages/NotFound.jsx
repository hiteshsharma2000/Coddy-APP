import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4 py-12 text-center">
      <img
        src="https://tse3.mm.bing.net/th/id/OIP.Y0PsBlMQ94YUEVozDGzf2wHaG3?rs=1&pid=ImgDetMain&o=7&rm=3"
        alt="404 Illustration"
        className="w-full max-w-md mb-8"
      />
      <h1 className="text-6xl font-bold text-blue-600 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Oops! Page not found
      </h2>
      <p className="text-gray-500 mb-6">
        The page you're looking for doesn’t exist or has been moved.
      </p>
<Link
  to="/"
  className="bg-blue-600 text-white px-6 py-2 rounded-md 
             hover:bg-blue-700 hover:scale-105 transform 
             transition-transform duration-300 
             shadow-lg hover:shadow-xl"
><span className="text-white">

  Go Home
</span>
</Link>

    </div>
  );
};

export default NotFoundPage;
