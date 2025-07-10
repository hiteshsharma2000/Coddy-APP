import React, { useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from 'react-icons/io5';

const ForgotPasswordPage = () => {
  const [Email, setEmail] = useState("");
  const navigate=useNavigate()
  const [loading,setloading]=useState(false)
  const [note,setnote]=useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault();
      setloading(true)
        const timeoutId = setTimeout(() => {
    controller.abort(); 
  }, 10000);
 clearTimeout(timeoutId);
   try {
    let res=await fetch('https://coddy-app-dl6q.onrender.com/user/forgot-password',{
      method:"POST",
      body:JSON.stringify({Email}),
      headers: {
          'Content-Type': 'application/json',
      }
   })
   let data=await res.json()
   console.log(data);
   if(data.msg=="Reset link sent to your email"){
    setnote("Check your mail")
    setTimeout(() => {
      setnote(null)
      navigate('/')
    }, 1000);
   }else{
    setnote(data.msg ? data.msg:"somethong went wrong")
    setTimeout(()=>{
   setnote(null)
    },1000)
   }
   
     
   } catch (error) {
    setnote('server not responding')
      setTimeout(()=>{
   setnote(null)
    },1000)
    console.log(error)
   }finally{
    
    setloading(false)
   }
  
  };

 if(loading){
  return <Loading/>
 }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-white px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8">
         <button
                onClick={() => navigate(-1)}
                className="mb-4 flex items-center gap-2 text-indigo-700 hover:text-indigo-900"
              >
                <IoArrowBack /> Back
              </button>
     
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Forgot Your Password?
        </h2>
       {note && (
  <h3 className="mt-4 text-center text-lg font-semibold text-green-600 bg-green-100 p-2 rounded shadow">
    {note}
  </h3>
)}

        <p className="text-center text-sm text-gray-600 mb-4">
          Enter your email address and we'll send you a reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="Email"
              placeholder="you@example.com"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <a href="/login" className="text-purple-600 hover:underline font-medium">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
