import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ds from "../images/bn.png";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    
    const userData = { username, name, email, password: pwd };
    try {
      const response = await fetch("http://localhost:3000/api/users/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      if (result.success) {
        alert("Signup successful! You can now log in."); // Alert message
        navigate("/login");
      } else {
        alert(result.msg);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };
  

  return (
    <div className="flex w-screen h-screen">
      
      {/* Left Side - Promotional Image Section */}
      <div className="w-1/2 h-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center p-12">
        <div className="text-center">
          {/* <h1 className="text-4xl font-bold mb-4">DR.Y AI TOOLS</h1> */}
          <p className="text-lg mb-8">Unlock the power of AI with our cutting-edge tools.</p>
          <img 
            src={ds}  // Replace with your promotional image link
            alt="AI Promotional"
          
            //  className="w-48 h-48 object-cover mx-auto rounded-full shadow-md"
          />
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-1/2 h-full flex items-center justify-center bg-white p-12">
        <form onSubmit={submit} className="w-full max-w-md space-y-6">
          <input
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Username"
            className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
          />

          <input
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Full Name"
            className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
          />

          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
          />

          <input
            required
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            type="password"
            placeholder="Password"
            className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>

          <div className="text-center text-gray-500 text-sm mt-4">
            Already have an account?{" "}
            <Link className="text-blue-600 hover:underline" to="/Login">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;