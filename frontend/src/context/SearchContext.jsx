import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTools, setFilteredTools] = useState([]);

  const updateSearch = (query, allTools) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = allTools.filter((tool) =>
        tool.title.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredTools(filtered);
    } else {
      setFilteredTools([]);
    }
  };

  return (
    <SearchContext.Provider value={{ searchQuery, filteredTools, updateSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}; 