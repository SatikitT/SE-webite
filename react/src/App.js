// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ForumList from './components/ForumList';
import Home from './components/Home';
import PostList from './components/PostList';
import About from "./components/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<Home />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route path="/forums" element={<ForumList />} />
        <Route path="/forums/:forumId/posts" element={<PostList />} />
      </Routes>
    </Router>
  );
}

export default App;
