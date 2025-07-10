import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loading from "./Loading";
import { IoArrowBack } from 'react-icons/io5';

const UpdateDocument = () => {
  const { id } = useParams(); // get document ID from URL
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState(null);

  const token = Cookies.get('token')

  // Fetch the existing document on mount
useEffect(() => {
  const fetchDoc = async () => {
    console.log(token);
    
    try {
      const res = await fetch(`https://coddy-app-dl6q.onrender.com/document/${id}`, {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Fetched document:", data);
        setContent(data.content);
        setNote(null);
      } else {
        // 🔥 Catch 401 / 403 response
        if (res.status === 401 || res.status === 403) {
          setNote("Session expired. Please login again.");
        } else {
          setNote(data.msg || "Error fetching document.");
        }
      }
    } catch (err) {
      setNote("Server error while fetching document.");
      console.error(err);
    }
  };

  fetchDoc();
}, [id]);


  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`https://coddy-app-dl6q.onrender.com/document/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();
      if (res.ok) {
        setNote("✅ Document updated successfully!");
        setTimeout(() => {
          navigate("/document"); // or your documents list
        }, 1500);
      } else {
        setNote(data.msg || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setNote("❌ Network/server error");
      setTimeout(() => {
          navigate("/document"); // or your documents list
        }, 1500);
    } finally {
      setLoading(false);
    }
  };
if(loading){
    return <Loading/>
}
  return (
    <div className="min-h-screen px-4 py-10 flex items-center justify-center bg-gradient-to-br from-gray-100 to-white">
         
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md">
         <button
                onClick={() => navigate(-1)}
                className="mb-4 flex items-center gap-2 text-indigo-700 hover:text-indigo-900"
              >
                <IoArrowBack /> Back
              </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Document</h2>

        {note && (
          <div className="mb-4 text-sm font-medium text-center p-2 rounded bg-blue-100 text-blue-700 shadow">
            {note}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="w-full border p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Edit your document here..."
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Updating..." : "Update Document"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDocument;
