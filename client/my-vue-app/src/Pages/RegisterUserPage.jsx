import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { IoArrowBack } from 'react-icons/io5';

const RegisterPage = () => {
  const navigate=useNavigate()
      const [loading,setloading]=useState(false)
        
   const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    Name:"",
    Email: "",
    Password: "",
  });

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
      let res=await fetch('https://coddy-app-dl6q.onrender.com/user/register',{
        method:"POST",
        body:JSON.stringify(formData),
         headers: {
    "Content-Type": "application/json",
        },
      })  
    let data=await res.json()
    if(data.msg=="new user has been registered"){
      navigate('/login')
    }else{ 
      setErrorMsg(data.msg); // set the message
      setTimeout(() => setErrorMsg(""), 1000); // clear after 1 sec
    }
  } catch (error) {
    console.log(error);
    setErrorMsg("Something went wrong");
    setTimeout(() => setErrorMsg(""), 1000);
  }finally{
    setloading(false)
  }
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
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Create Your Account
        </h2>
           {errorMsg && (
  <h3 className="mt-4 text-center text-lg font-semibold text-green-600 bg-green-100 p-2 rounded shadow">
    {errorMsg}
  </h3>
)}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="Name"
              placeholder="John Doe"
              value={formData.Name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

         
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

         
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="Password"
              placeholder="••••••••"
              value={formData.Password}
              minLength={8}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

         
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline font-medium">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
