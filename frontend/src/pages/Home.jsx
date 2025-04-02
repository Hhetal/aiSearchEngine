import React, { useState } from 'react';
import Blog from './Blog';
 import Navbar from '../componennts/Navbar';
//import Navbar2 from '../componennts/navbar2';
const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className='w-full'>
      <Navbar onSearch={handleSearch} />
      <Blog searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
