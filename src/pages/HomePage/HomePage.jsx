import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage({ searchQuery }) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/posts`)
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, [apiUrl]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchQuery, posts]);

  return (
    <div className="min-h-screen bg-[#DFF2EB] p-28 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
      {filteredPosts.map(post => (
        <div key={post.id} className="card bg-white shadow-lg rounded-lg">
          <figure className="px-4 pt-4">
            <img
              src={post.cover || 'https://via.placeholder.com/300x180'}
              alt={post.title}
              className="rounded-xl object-cover"
            />
          </figure>
          <div className="card-body items-center text-center p-10">
            <h2 className="card-title text-[#4A628A] text-lg">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{post.author}</p>
            <p className="text-gray-500 text-sm mb-4">
              {post.content.length > 50 ? `${post.content.substring(0, 500)}...` : post.content}
            </p>
            <div className="card-actions">
              <Link
                to={`/posts/${post.id}`}
                className="btn bg-[#4A628A] text-white hover:bg-[#7AB2D3] border-none transition duration-200"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
