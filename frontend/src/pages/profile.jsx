import React, { useState } from 'react';
import Navbar from '../componennts/Navbar'; // Ensure this path is correct
import profileImg from '../images/profile.png'; // Placeholder profile image

const Profile = () => {
  const [username, setUsername] = useState("JohnDoe");
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Implement save functionality here
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex w-screen h-screen bg-gray-100">
        {/* Left Side - Profile Image Section */}
        <div className="w-1/3 h-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center p-12">
          <img 
            src={profileImg}  // Replace with your profile image link
            alt="Profile"
            className="w-32 h-32 object-cover mx-auto rounded-full shadow-md"
          />
          <h1 className="text-2xl font-bold mt-4">{name}</h1>
          <p className="text-lg mt-2">{username}</p>
        </div>

        {/* Right Side - Profile Details and Edit Form */}
        <div className="w-2/3 h-full flex items-center justify-center bg-white p-12">
          <form onSubmit={handleSave} className="w-full max-w-md space-y-6">
            <div className="inputBox">
              <label className="text-gray-600">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!isEditing}
                className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
              />
            </div>

            <div className="inputBox">
              <label className="text-gray-600">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
              />
            </div>

            <div className="inputBox">
              <label className="text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
              />
            </div>

            {isEditing ? (
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                Edit Profile
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
