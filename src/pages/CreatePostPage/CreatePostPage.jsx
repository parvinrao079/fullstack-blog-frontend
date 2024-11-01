import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePostPage() {
  const [form, setForm] = useState({ author: '', title: '', content: '', cover: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#DFF2EB] p-4 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-[#4A628A] text-center">Create a New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:border-[#7AB2D3] bg-[#DFF2EB] text-[#4A628A]"
          />
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:border-[#7AB2D3] bg-[#DFF2EB] text-[#4A628A]"
          />
          <textarea
            name="content"
            placeholder="Content"
            value={form.content}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:border-[#7AB2D3] bg-[#DFF2EB] text-[#4A628A] h-32"
          />
          <input
            name="cover"
            placeholder="Cover URL"
            value={form.cover}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:border-[#7AB2D3] bg-[#DFF2EB] text-[#4A628A]"
          />
          <button
            type="submit"
            className="w-full bg-[#4A628A] text-white p-3 rounded hover:bg-[#7AB2D3] transition duration-200"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostPage;
