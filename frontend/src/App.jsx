
// import React from "react"; 
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Nopage from "./pages/Nopage";
// import Signup from "./pages/Signup";
// import Login from "./pages/login";
// import UploadNewBlog from './pages/UploadNewBlog';
// import BlogDetails from './pages/BlogDetails';
// import AuthProvider from "./context/AuthContext"; 

// const App = () => {
//   return (
//     <AuthProvider>  {/* Wrap everything inside AuthProvider */}
//       <BrowserRouter>
      
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/Login" element={<Login />} />
//           <Route path="*" element={<Nopage />} />
//           <Route path="/UploadNewBlog" element={<UploadNewBlog />} />
//           <Route path="/Blog/:id" element={<BlogDetails />} />
//           <Route path="/blog/a" element={<BlogDetails />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// };

// export default App;

import React, { useContext } from "react"; 
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Nopage from "./pages/Nopage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UploadNewBlog from './pages/UploadNewBlog';
import BlogDetails from './pages/BlogDetails';
import Blog from './pages/Blog';  
import AuthProvider, { AuthContext } from "./context/AuthContext"; 
import Navbar from "./componennts/Navbar"; // Import Navbar

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);  
  return user ? element : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>  
      <BrowserRouter>
        {/* <Navbar />  */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/uploadnewblog" element={<ProtectedRoute element={<UploadNewBlog />} />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/blog" element={<ProtectedRoute element={<Blog />} />} />
          <Route path="*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
