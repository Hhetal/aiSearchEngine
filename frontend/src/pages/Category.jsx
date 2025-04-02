import React from 'react';

const Category = ({ category, onSelect }) => {
  return (
    <option value={category}>{category}</option>
  );
};

export default Category;