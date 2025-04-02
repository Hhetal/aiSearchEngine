

// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext"; // Make sure this path is correct
// import "./BlogCss.css";

// const BlogDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext); // Get user from AuthContext
  
//   const [blog, setBlog] = useState(null);
//   const [review, setReview] = useState("");
//   const [rating, setRating] = useState(0);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         // Check if the server is running
//         const response = await fetch(`http://localhost:3000/api/ai-content/${id}`, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
//         setBlog(data);
//         setReview(data.review || "");
//         setRating(data.rating || 0);
//       } catch (error) {
//         console.error("Error fetching blog details:", error);
//         setError(
//           error.message === "Failed to fetch" 
//             ? "Unable to connect to server. Please make sure the backend server is running on port 3000."
//             : `Error loading blog: ${error.message}`
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   // Handle link click based on user login status
//   const handleLinkClick = (link) => {
//     if (user) {
//       // User is logged in, navigate to the actual link
//       window.open(link, "_blank");
//     } else {
//       // User is not logged in, redirect to login page
//       navigate("/login");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading blog details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
//           <div className="text-red-500 text-xl mb-4">⚠️</div>
//           <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Blog</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <div className="flex justify-center space-x-4">
//             <button
//               onClick={() => window.location.reload()}
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//             >
//               Try Again
//             </button>
//             <button
//               onClick={() => navigate(-1)}
//               className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
//             >
//               Go Back
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <p className="text-gray-600">No blog found</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="blog-details-container">
//       <button 
//         onClick={() => navigate(-1)}
//         className="mb-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center space-x-2 group"
//       >
//         <svg 
//           className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
//           fill="none" 
//           stroke="currentColor" 
//           viewBox="0 0 24 24"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         <span className="font-medium">Back</span>
//       </button>

//       <div className="blog-details-content">
//         <div className="blog-info">
//           <h1 className="text-3xl font-semibold mb-4">{blog.title}</h1>
//           <p className="text-gray-600 mb-4">{blog.description}</p>
//           <div className="text-xs text-gray-400 mb-4">
//             <p>Created on: {new Date(blog.createdAt).toLocaleDateString()}</p>
//             <p>{blog.priceType === "free" ? "Free" : "Paid"}</p>
//           </div>
          
//           <div className="mt-4">
//             <h2 className="text-xl font-semibold">Content:</h2>
//             <p>{blog.content}</p>
//           </div>
          
//           <div className="mt-4">
//             <h2 className="text-xl font-semibold">Link:</h2>
//             {/* Replace <a> tag with a button that calls handleLinkClick */}
//             <button
//               onClick={() => handleLinkClick(blog.link)}
//               className="text-blue-500 hover:underline"
//             >
//               {blog.link}
//             </button>
//             {!user && (
//               <p className="text-sm text-red-500 mt-1">
//                 Please log in to access this link
//               </p>
//             )}
//           </div>
          
//           <div className="mt-6">
//             <h4 className="text-2xl font-bold mb-2">Rating</h4>
//             <div className="flex items-center gap-2">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <span
//                   key={star}
//                   className={`text-lg ${
//                     rating >= star ? "text-yellow-500" : "text-gray-300"
//                   }`}
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>
//             <p className="text-gray-600 mt-2">Current Rating: {rating} / 5</p>
//           </div>
          
//           <div className="mt-6">
//             <h4 className="text-2xl font-bold mb-2">Review</h4>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               {review ? (
//                 <p className="text-gray-700">{review}</p>
//               ) : (
//                 <p className="text-gray-500">No review yet.</p>
//               )}
//             </div>
//           </div>
//         </div>
        
//         <div className="blog-image-container">
//           <img
//             className="blog-image"
//             src={blog.imageUrl || "default-image-url.jpg"}
//             alt={blog.title}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogDetails;


import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Make sure this path is correct
import "./BlogCss.css";
import Navbar2 from "../componennts/navbar2";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get user from AuthContext
  
  const [blog, setBlog] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if the server is running
        const response = await fetch(`http://localhost:3000/api/ai-content/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Blog details response:", data); // Debug: Log the full blog object
        setBlog(data);
        setReview(data.review || "");
        setRating(data.rating || 0);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setError(
          error.message === "Failed to fetch" 
            ? "Unable to connect to server. Please make sure the backend server is running on port 3000."
            : `Error loading blog: ${error.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Helper function to determine price display
  const getPriceDisplay = (blog) => {
    if (!blog || typeof blog.priceType === 'undefined') {
      return 'N/A';
    }
    
    const priceType = String(blog.priceType).toLowerCase();
    return priceType === 'free' ? 'Free' : 'Paid';
  };

  // Handle link click based on user login status
  const handleLinkClick = (link) => {
    if (user) {
      // User is logged in, navigate to the actual link
      window.open(link, "_blank");
    } else {
      // User is not logged in, redirect to login page
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Blog</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">No blog found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar2 />
    <div className="blog-details-container">
     
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center space-x-2 group"
      >
        <svg 
          className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="font-medium">Back</span>
      </button>

      <div className="blog-details-content">
        <div className="blog-info">
          <h1 className="text-3xl font-semibold mb-4">{blog.title}</h1>
          <p className="text-gray-600 mb-4">{blog.description}</p>
          <div className="text-xs text-gray-400 mb-4">
            <p>Created on: {new Date(blog.createdAt).toLocaleDateString()}</p>
            <p>Price Type: {getPriceDisplay(blog)}</p>
          </div>
          
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Content:</h2>
            <p>{blog.content}</p>
          </div>
          
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Link:</h2>
            {/* Replace <a> tag with a button that calls handleLinkClick */}
            <button
              onClick={() => handleLinkClick(blog.link)}
              className="text-blue-500 hover:underline"
            >
              {blog.link}
            </button>
            {!user && (
              <p className="text-sm text-red-500 mt-1">
                Please log in to access this link
              </p>
            )}
          </div>
          
          <div className="mt-6">
            <h4 className="text-2xl font-bold mb-2">Rating</h4>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-lg ${
                    rating >= star ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-600 mt-2">Current Rating: {rating} / 5</p>
          </div>
          
          <div className="mt-6">
            <h4 className="text-2xl font-bold mb-2">Review</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              {review ? (
                <p className="text-gray-700">{review}</p>
              ) : (
                <p className="text-gray-500">No review yet.</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="blog-image-container">
          <img
            className="blog-image"
            src={blog.imageUrl || "default-image-url.jpg"}
            alt={blog.title}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default BlogDetails;