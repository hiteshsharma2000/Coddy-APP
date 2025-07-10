import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Cookies from "js-cookie"; 
import { useEffect } from "react";
import { FaBookOpen } from "react-icons/fa";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState(null);

useEffect(() => {
  const cookieToken = Cookies.get("token"); // or whatever cookie name you use
  setToken(cookieToken);
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
        {/* Logo / Heading */}
        <h1 className="text-2xl font-bold text-blue-700 tracking-wide">Coddy</h1>

        {/* Desktop Buttons */}
<div className="hidden md:flex gap-4">
  {!token ? (
    <>
      <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition">
       <span className="text-white"> 

        Login
       </span>
      </Link>
      <Link to="/register" className="bg-gray-200 text-blue-700 px-4 py-2 rounded-md hover:bg-orange-300 transition">
        Register
      </Link>
    </>
  ) : (
    <button
      onClick={() => {
        Cookies.remove("token");
        setToken(null);
      }}
      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
    >
      Logout
    </button>
  )}
</div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-3xl text-blue-700"
          onClick={() => setMenuOpen(true)}
        >
          <HiMenuAlt3 />
        </button>
      </nav>

      {/* Slide-Out Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-blue-700">Menu</h2>
          <button onClick={() => setMenuOpen(false)} className="text-2xl text-gray-600">
            <HiX />
          </button>
        </div>
        {!token ? (
        <div className="flex flex-col gap-4 p-6">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-white">
               Login
            </span>
          </Link>
          <Link
            to="/register"
            className="bg-gray-200 text-blue-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Register
          </Link>
        </div>): (<div className="flex flex-col gap-4 p-6">
         <button
      onClick={() => {
        Cookies.remove("token");
        setToken(null);
      }}
      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
    >
        
      Logout
    </button>
         
        </div>)}
    
      </div>

      {/* Optional Overlay when menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center mt-24 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
          Welcome to Coddy 📚
        </h2>
        <p className="text-gray-600 text-lg max-w-xl">
          A simple, elegant platform to manage your knowledge and collaborate with your team.
        </p>
        
  {token && (
    <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
      <Link
        to="/Document"
        className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
      >
        <span className="text-white">

        📄 My Documents
        </span>
      </Link>
      <Link
        to="/document/create"
        className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
      >
        <span className="text-white">

        📝 Create Document
        </span>
      </Link>
    </div>
  )}
      </main>
       <div className="w-full flex justify-center my-10">
      <div className="flex flex-col items-center">
        <div className="text-7xl text-indigo-600 animate-bounce-slow">
          <FaBookOpen />
        </div>
        <p className="mt-4 text-indigo-700 font-semibold animate-pulse">Study in progress...</p>
      </div>
    </div>
    </div>
  );
};

export default HomePage;
