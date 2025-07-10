import axios from "axios";
import { useState } from "react";
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loading from "./Loading";
export const DocumentCreate = () => {
  const [form, setForm] = useState({ title: '', content: '', visibility: 'private', mentions: [] });
  const navigate = useNavigate();
  const [loading,setloading]=useState(false)
    const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
let token=Cookies.get('token')
  const handleSubmit = async (e) => {
    
    
    e.preventDefault();

setloading(true)

 const timeoutId = setTimeout(() => {
    controller.abort(); 
  }, 10000);
 clearTimeout(timeoutId);

try {
    
        let res=await fetch('http://localhost:8080/document/create',{
            method:"POST",
            body:JSON.stringify(form),
             headers: {
        "Content-Type": "application/json",
         Authorization:token || "notavailable",
            },
              
            
          })  
        let data=await res.json()
        console.log(data);
        navigate('/Document');
  setError(null);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError('Please login first.');
      setDocuments(null);
    }finally{
      setloading(false)
    }
  };

  if(loading){
    return <Loading/>
  }
  
   if (error || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-sky-50 via-indigo-50 to-white">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">{error}</h2>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-tr from-indigo-50 via-sky-50 to-white">
          <button
                onClick={() => navigate(-1)}
                className="mb-4 flex items-center gap-2 text-indigo-700 hover:text-indigo-900"
              >
                <IoArrowBack /> Back
              </button>
      <div className="max-w-3xl mx-auto bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create Document</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Document Title"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Document Content"
            rows="8"
            className="w-full p-2 border rounded"
            required
          ></textarea>
          <select
            name="visibility"
            value={form.visibility}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
