import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center bg-gray-800 rounded-lg overflow-hidden w-full">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search products..."
        className="bg-gray-800 text-white px-4 py-2 border-none outline-none focus:ring-0 placeholder-gray-400 text-sm w-full flex-1"
      />
      <button type="submit" className="p-3 text-white hover:text-blue-400 transition-colors bg-gray-700 hover:bg-gray-600">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBox;