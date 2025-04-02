import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ds from "../images/bn.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"

const Login = () => { 
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  const { setUser } = useContext(AuthContext);

  const submit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pwd }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      setUser(data.user); // ✅ Update user state immediately
      navigate('/'); // ✅ Redirect to home
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("🔥 Fetch Error:", error);
  }
};

  return (
    <div className="flex w-screen h-screen">
      {/* Left Side - Promotional Image Section */}
      <div className="w-1/2 h-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center p-12">
        <div className="text-center">
          <p className="text-lg mb-8">
            Unlock the power of AI with our cutting-edge tools.
          </p>
          <img
            src={ds} // Replace with your promotional image link if different
            alt="AI Promotional"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 h-full flex items-center justify-center bg-white p-12">
        <form onSubmit={submit} className="w-full max-w-md space-y-6">
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
          {error && <p className="text-red-500">{error}</p>} {/* Display error if login fails */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
          <p className="text-center text-gray-500 text-sm mt-4">
            Don't have an account?{" "}
            <Link className="text-blue-600 hover:underline" to="/Signup">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;