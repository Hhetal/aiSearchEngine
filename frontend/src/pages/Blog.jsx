// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import logo from '../images/logo.png';
// import { api_base_url } from '../helper';

// const Blog = ({ searchQuery }) => {
//   const navigate = useNavigate();
//   const [blogs, setBlogs] = useState([]);
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   const categories = ['All', 'Text', 'Image', 'Code', 'Audio', 'Video', 'Business', 'Other'];

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         console.log("Fetching blogs from API...");
//         const response = await axios.get(`${api_base_url}/api/ai-content`);
//         // console.log("Received blogs:", response.data.map(blog => ({ id: blog._id, title: blog.title })));
//         setBlogs(response.data);
//         setFilteredBlogs(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching blogs:", err);
//         setError('Failed to fetch blog posts. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   useEffect(() => {
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       const filtered = blogs.filter(blog => 
//         blog.title.toLowerCase().includes(query) ||
//         blog.description.toLowerCase().includes(query) ||
//         blog.type.toLowerCase().includes(query)
//       );
//       setFilteredBlogs(filtered);
//     } else {
//       setFilteredBlogs(blogs);
//     }
//   }, [searchQuery, blogs]);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     if (category === 'All') {
//       setFilteredBlogs(blogs);
//     } else {
//       setFilteredBlogs(blogs.filter(blog => blog.type.toLowerCase() === category.toLowerCase()));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-red-500 text-center">
//           <p className="text-xl font-semibold mb-2">{error}</p>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="text-blue-500 hover:text-blue-700 underline"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col lg:flex-row">
//         <div className="w-full lg:w-1/4 bg-gray-100 text-gray-700 p-6 rounded-lg shadow-md mb-6 lg:mb-0 lg:mr-6">
//           <h2 className="text-2xl font-semibold mb-4">Categories</h2>
//           <ul className="space-y-2">
//             {categories.map((category) => (
//               <li
//                 key={category}
//                 onClick={() => handleCategoryChange(category)}
//                 className={`cursor-pointer p-3 rounded-lg transition-colors duration-300 ${
//                   selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'
//                 }`}
//               >
//                 {category}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="w-full lg:w-3/4">
//           {filteredBlogs.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {filteredBlogs.map((blog) => {
//                 // console.log("Rendering blog card:", { id: blog._id, title: blog.title });
//                 return (
//                   <Link
//                     key={blog._id}
//                     to={`/blog/${blog._id}`}
//                     onClick={() => console.log("Clicked blog:", { id: blog._id, title: blog.title })}
//                     className="relative block p-6 rounded-lg shadow-lg bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 transition-transform transform hover:scale-105"
//                   >
//                     <img
//                       className="w-16 h-16 rounded-full absolute top-4 right-4 object-cover"
//                       src={blog.imageUrl || logo}
//                       alt="Blog"
//                     />
//                     <div className="text-left mt-4">
//                       <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
//                       <p className="text-gray-600 mb-4">
//                         {blog.description.substring(0, 50)}{blog.description.length > 50 ? '...' : ''}
//                       </p>
//                       <div className="flex items-center mb-4">
//                         <div className="flex items-center">
//                           {[...Array(5)].map((_, index) => (
//                             <svg
//                               key={index}
//                               className={`w-4 h-4 ${
//                                 index < blog.rating ? 'text-yellow-400' : 'text-gray-300'
//                               }`}
//                               fill="currentColor"
//                               viewBox="0 0 20 20"
//                             >
//                               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                             </svg>
//                           ))}
//                         </div>
//                         <span className="ml-2 text-sm text-gray-500">({blog.rating}/5)</span>
//                       </div>
//                       <p className="text-xs text-gray-400">
//                         {new Date(blog.createdAt).toLocaleDateString()} | {blog.priceType === 'free' ? 'Free' : 'Paid'}
//                       </p>
//                     </div>
//                   </Link>
//                 );
//               })}
//             </div>
//           ) : (
//             <p className="text-gray-500 text-center mt-10">No blogs available yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Blog; 


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../images/logo.png';
import { api_base_url } from '../helper';

const Blog = ({ searchQuery }) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Text', 'Image', 'Code', 'Audio', 'Video', 'Business', 'Other'];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log("Fetching blogs from API...");
        const response = await axios.get(`${api_base_url}/api/ai-content`);
        console.log("API Response - First item:", response.data[0]); // Debug: Log the first blog object
        setBlogs(response.data);
        setFilteredBlogs(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError('Failed to fetch blog posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = blogs.filter(blog => 
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query) ||
        blog.type.toLowerCase().includes(query)
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchQuery, blogs]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter(blog => blog.type.toLowerCase() === category.toLowerCase()));
    }
  };

  // Helper function to determine price display
  const getPriceDisplay = (blog) => {
    if (!blog || typeof blog.priceType === 'undefined') {
      return 'N/A';
    }
    
    const priceType = String(blog.priceType).toLowerCase();
    return priceType === 'free' ? 'Free' : 'Paid';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4 bg-gray-100 text-gray-700 p-6 rounded-lg shadow-md mb-6 lg:mb-0 lg:mr-6">
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`cursor-pointer p-3 rounded-lg transition-colors duration-300 ${
                  selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'
                }`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full lg:w-3/4">
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => {
                console.log(`Blog ${blog._id} priceType:`, blog.priceType); // Debug: Log each blog's priceType
                return (
                  <Link
                    key={blog._id}
                    to={`/blog/${blog._id}`}
                    onClick={() => console.log("Clicked blog:", { id: blog._id, title: blog.title, priceType: blog.priceType })}
                    className="relative block p-6 rounded-lg shadow-lg bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 transition-transform transform hover:scale-105"
                  >
                    <img
                      className="w-16 h-16 rounded-full absolute top-4 right-4 object-cover"
                      src={blog.imageUrl || logo}
                      alt="Blog"
                    />
                    <div className="text-left mt-4">
                      <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                      <p className="text-gray-600 mb-4">
                        {blog.description.substring(0, 50)}{blog.description.length > 50 ? '...' : ''}
                      </p>
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, index) => (
                            <svg
                              key={index}
                              className={`w-4 h-4 ${
                                index < blog.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">({blog.rating}/5)</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {new Date(blog.createdAt).toLocaleDateString()} | {getPriceDisplay(blog)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-10">No blogs available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;