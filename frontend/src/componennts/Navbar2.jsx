
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import logo from "../images/bn.png";
import { AuthContext } from '../context/AuthContext';

const Navbar2 = ({ onSearch }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowLogout(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const navItems = [
    { name: "Home", path: "/" },
    // { name: "Submit AI Tool", path: "/UploadNewBlog" },
    // { name: "About", path: "/about" },
    // { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="navbar h-20 px-6 lg:px-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-6">
        <img
          src={logo}
          alt="Logo"
          className="h-12 w-36 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => navigate("/")}
        />
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-lg font-semibold">
          {navItems.map((item) => (
            <li 
              key={item.name}
              className="cursor-pointer hover:underline hover:text-white transition-all transform hover:scale-105"
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Center section with search bar */}
      {/* <div className="hidden md:block flex-grow mx-8 max-w-md">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search..."
            className="w-full py-2 px-4 rounded-full bg-white bg-opacity-20 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-white placeholder-opacity-70"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>  */}

      <div className="flex items-center space-x-6">
        {/* Notification icon */}
        {/* <div className="hidden md:block relative cursor-pointer">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
        </div> */}

        {user ? (
          <div className="relative">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setShowLogout(!showLogout)}>
              <div className="hidden md:block text-right">
                <div className="font-bold">{user.name}</div>
                <div className="text-xs opacity-80">Member</div>
              </div>
              <Avatar
                name={user.name}
                size="45"
                round="50%"
                className="border-2 border-white"
              />
            </div>
            {showLogout && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
                <div className="py-2 border-b border-gray-200">
                  <div className="px-4 font-medium text-gray-800">{user.name}</div>
                  <div className="px-4 text-sm text-gray-500">{user.email}</div>
                </div>
                {/* <button
                  onClick={() => navigate("/profile")}
                  className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                >
                  Profile
                </button> */}
                {/* <button
                  onClick={() => navigate("/settings")}
                  className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                >
                  Settings
                </button> */}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-red-500 hover:bg-red-50 rounded-b-lg text-left border-t border-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              className="hidden md:block px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-purple-600 transition duration-300"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="flex items-center space-x-2 bg-white text-purple-600 py-2 px-4 rounded-lg hover:bg-opacity-90 transition duration-300 font-semibold"
              onClick={() => navigate("/login")}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"></path>
              </svg>
              <span>Login</span>
            </button>
          </div>
        )}

        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-blue-600 md:hidden z-10">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <div 
                key={item.name}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
              >
                {item.name}
              </div>
            ))}
            <div className="pt-4 pb-3 border-t border-blue-700">
              <div className="flex items-center px-3">
                {user ? (
                  <>
                    <div className="ml-3">
                      <div className="text-base font-medium">{user.name}</div>
                      <button
                        onClick={handleLogout}
                        className="mt-2 w-full text-sm text-white bg-red-500 px-3 py-1 rounded"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      className="bg-white text-blue-600 px-3 py-1 rounded text-sm"
                      onClick={() => {
                        navigate("/login");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Login
                    </button>
                    <button
                      className="border border-white text-white px-3 py-1 rounded text-sm"
                      onClick={() => {
                        navigate("/register");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar2;