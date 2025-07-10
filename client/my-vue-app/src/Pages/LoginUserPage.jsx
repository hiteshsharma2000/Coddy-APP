import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loading from "./Loading";
import { IoArrowBack } from 'react-icons/io5';

const LoginPage = () => {
  const navigate=useNavigate()
     const [loading,setloading]=useState(false)
          
 
  const [formData, setFormData] = useState({
    
    Email: "",
    Password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
 e.preventDefault();
 setloading(true)

   const timeoutId = setTimeout(() => {
    controller.abort(); 
  }, 10000);
 clearTimeout(timeoutId);
    try {
      let res=await fetch('http://localhost:8080/user/login',{
        method:"POST",
        body:JSON.stringify(formData),
         headers: {
    "Content-Type": "application/json",
      
        },
          
        
      })  
    let data=await res.json()
    console.log(data);
      if (data.token) {
         Cookies.set("token", data.token);
        navigate("/");
    } else {
      setErrorMsg(data.msg); // set the message
      setTimeout(() => setErrorMsg(""), 1000); // clear after 1 sec
    }
  } catch (error) {
    console.log(error);
    setErrorMsg("Something went wrong");
    setTimeout(() => setErrorMsg(""), 1000);
  }finally{setloading(false)}

  };
if(loading){
 return <Loading/>
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-200 via-sky-100 to-white px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200">
   <button
                onClick={() => navigate(-1)}
                className="mb-4 flex items-center gap-2 text-indigo-700 hover:text-indigo-900"
              >
                <IoArrowBack /> Back
              </button>
      {errorMsg && (
  <div className="mt-4 bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md text-center shadow-sm transition duration-300">
    {errorMsg}
  </div>
)}
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Login Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
         

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="Email"
              placeholder="you@example.com"
              value={formData.Email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="Password"
              placeholder="••••••••"
              value={formData.Password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
             <div className="text-right mt-1">
              <a
                href="/forgot-password"
                className="text-sm text-indigo-600 hover:underline font-medium"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Create an account?{" "}
          <a href="/register" className="text-indigo-600 hover:underline font-medium">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
