import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiEdit, FiSearch } from 'react-icons/fi';
import Cookies from "js-cookie";
import { IoArrowBack } from 'react-icons/io5';
import Loading from './Loading';

const DocumentCard = ({ doc }) => {
  const navigate=useNavigate()
  // console.log(doc)

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-indigo-700 mb-2">{doc.title}</h3>
      <h5 className=" font-semibold text-gray-700 mb-2"><span className='text-bold-700 text-red-500' >Description : </span>{doc.content}</h5>
      <p className="text-sm text-gray-600 mb-2">By: {doc.author?.Name || 'Unknown'}</p>
      <p className="text-xs text-gray-400 italic">Visibility: {doc.visibility}</p>
     <button
  onClick={() => navigate(`/document/update/${doc._id}`)}
  className="mt-3 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow hover:bg-indigo-700 transition duration-300"
>
  Update
</button>
    </div>
  );
};

export const DocumentList = () => {
   const [documents, setDocuments] = useState(null);
  const [query, setQuery] = useState('');
  const [loading,setloading]=useState(false)
  const [error, setError] = useState(null);
  const navigate = useNavigate();
const token=Cookies.get('token')
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
  
 setloading(true)
    try {
      const res = await axios.get('https://coddy-app-dl6q.onrender.com/document/my-documents', {
       
        headers: {
          'Content-Type': 'application/json',
           Authorization:token || "notavailable",
         
        }
      });
      // console.log(res);
     if(!res.data){
      setError('Server is not responding')
     }
      setDocuments(Array.isArray(res.data) ? res.data : []);
      // console.log(documents)
      setError(null);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError('Please login first.');
      setDocuments(null);
    }finally{setloading(false)}
  };

  const handleSearch = async () => {
if(query==""){
  return 
}
    const res = await axios.get(`https://coddy-app-dl6q.onrender.com/document/search?q=${query}`, {
        headers: {
    "Content-Type": "application/json",
     Authorization:token || "notavailable",
        },
        
    });
    setDocuments(Array.isArray(res.data) ? res.data : []);
    
    setError(null);

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

  if (!documents) return null;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-tr from-sky-50 via-indigo-50 to-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-indigo-700 hover:text-indigo-900"
      >
        <IoArrowBack /> Back
      </button>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">Your Documents</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search documents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:w-64"
          />
          <button
            onClick={handleSearch}
            className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <FiSearch />
          </button>
          <button
            onClick={() => navigate('/document/create')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
          >
            <FiEdit /> Create
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents?.map((doc) => (
          <DocumentCard key={doc._id} doc={doc} />
        ))}
      </div>
    </div>
  );
};
