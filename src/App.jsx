import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage';
import PostDetailsPage from './pages/PostDetailsPage/PostDetailsPage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar onSearch={(query) => setSearchQuery(query)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/posts/:id" element={<PostDetailsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
