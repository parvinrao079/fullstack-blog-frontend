import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Pass the search query up to the parent component
  };

  return (
    <nav className="navbar bg-[#4A628A] p-4 text-white flex justify-between">
      {/* Left Side - Brand */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl hover:text-[#7AB2D3]">
          Travel Blog
        </Link>
      </div>
      
      {/* Right Side - Search and Create Post Link */}
      <div className="flex-none gap-4 flex items-center">
        {/* Search Input */}
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto text-[#DFF2EB]"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Create Post Link */}
        <Link
          to="/create-post"
          className="btn btn-primary bg-[#4A628A] text-white px-4 py-2 rounded hover:bg-[#7AB2D3] transition duration-200"
        >
          Create Post
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
