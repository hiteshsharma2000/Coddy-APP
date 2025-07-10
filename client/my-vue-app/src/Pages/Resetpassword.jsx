import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { IoArrowBack } from 'react-icons/io5';
const ResetPasswordPage = () => {
  
      let {token}=useParams()
      const navigate=useNavigate()
       const [loading,setloading]=useState(false)
        const [note,setnote]=useState(null)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    setloading(true)
      const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort(); 
  }, 10000);

  try {
      if (formData.password !== formData.confirmPassword) {
        setnote("Passwords do not match");

        setTimeout(() => {
          setnote(null)
        }, 1000);
        return;
      }
   let res=await fetch(`http://localhost:8080/user/reset-password/${token}`,{
      method:"POST",
      body:JSON.stringify({"Password":formData.password}),
      headers: {
          'Content-Type': 'application/json',
      }
   })
 
    
   let data=await res.json()
   console.log(data);
   if(data && data.msg=="Password has been reset successfully"){
     clearTimeout(timeoutId);
     setnote("Password has been reset successfully")
    setTimeout(() => {
      setnote(null)
      navigate('/')
    }, 1000);
   }else{
    setnote(data.msg ? data.msg:"somethong went wrong")
     clearTimeout(timeoutId);
    setTimeout(()=>{
   setnote(null)
      navigate('/forgot-password')
    },1000)
    setloading(false)

   }
   } catch (error) {
    setnote("server not responding")
  
    setTimeout(()=>{
   setnote(null)  
    navigate('/forgot-password')
    },1000)
    console.log(error)
       
    setloading(setloading(false))
   
   }finally{
     clearTimeout(timeoutId);
    setloading(false)
   }
   
  
  };

   if(loading){
    return <Loading/>
   }

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-white px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl border border-gray-200 rounded-2xl p-8">
        <button
                onClick={() => navigate(-1)}
                className="mb-4 flex items-center gap-2 text-indigo-700 hover:text-indigo-900"
              >
                <IoArrowBack /> Back
              </button>
        <h2 className="text-2xl font-bold text-center text-pink-700 mb-6">
          Reset Your Password
        </h2>
          {note && (
  <h3 className="mt-4 text-center text-lg font-semibold text-green-600 bg-green-100 p-2 rounded shadow">
    {note}
  </h3>
)}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-semibold py-2 rounded-md hover:bg-pink-700 transition"
          >
            Reset Password
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Back to{" "}
          <a href="/login" className="text-pink-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
