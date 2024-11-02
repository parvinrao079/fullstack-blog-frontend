import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ author: '', title: '', content: '', cover: '' });

  // Use the API URL from environment variable
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/posts/${id}`)
      .then(response => response.json())
      .then(data => {
        setPost(data);
        setFormData({ author: data.author, title: data.title, content: data.content, cover: data.cover });
      })
      .catch(error => console.error('Error fetching post:', error));
  }, [id, apiUrl]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiUrl}/posts/${id}`, { method: 'DELETE' });
      if (response.ok) navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsEditing(false);
        setPost(formData);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  if (!post) return <div className="min-h-screen bg-[#DFF2EB] p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#DFF2EB] p-8 flex items-center justify-center">
      <div className="card card-side bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        <figure className="w-1/2">
          <img src={post.cover || 'https://via.placeholder.com/600x400'} alt={post.title} className="object-cover w-full h-full" />
        </figure>
        <div className="card-body w-1/2 p-6 bg-[#DFF2EB]">
          {isEditing ? (
            <form onSubmit={handleEdit} className="space-y-4">
              <label className="block text-gray-700 text-sm font-bold">Author</label>
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="input input-bordered w-full bg-[#DFF2EB] text-gray-800"
                placeholder="Author"
                required
              />
              <label className="block text-gray-700 text-sm font-bold">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input input-bordered w-full bg-[#DFF2EB] text-gray-800"
                placeholder="Title"
                required
              />
              <label className="block text-gray-700 text-sm font-bold">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="textarea textarea-bordered w-full bg-[#DFF2EB] text-gray-800"
                placeholder="Content"
                required
              />
              <label className="block text-gray-700 text-sm font-bold">Cover URL</label>
              <input
                name="cover"
                value={formData.cover}
                onChange={handleChange}
                className="input input-bordered w-full bg-[#DFF2EB] text-gray-800"
                placeholder="Cover URL"
              />
              <div className="card-actions justify-end space-x-4">
                <button type="button" onClick={() => setIsEditing(false)} className="btn bg-gray-400 text-white hover:bg-gray-500">
                  Cancel
                </button>
                <button type="submit" className="btn bg-[#4A628A] text-white hover:bg-[#7AB2D3]">
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <>
              <h2 className="card-title text-2xl text-[#4A628A] mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="card-actions justify-end space-x-4">
                <button onClick={() => setIsEditing(true)} className="btn bg-[#4A628A] text-white hover:bg-[#7AB2D3]">
                  Edit
                </button>
                <button onClick={handleDelete} className="btn bg-red-600 text-white hover:bg-red-700">
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDetailsPage;
