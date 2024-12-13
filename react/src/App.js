import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Forum from './pages/forum2/Forum';
import Post from './components/Post';
import AddPost from './components/AddPost';
import CoopRoom from './pages/room/Room';
import Map from './pages/map/Map';
import Header from './components/header/Header';
import Admin from './pages/admin/Admin';
import Program from './pages/program/Program';
import GlassGlow from './pages/program/SubProgram/GlassGlow/GlassGlow';
import Queensland from './pages/program/SubProgram/Queensland/Queenland';
import Software from './pages/program/SubProgram/Software/Software';
import Admission from './pages/admission/Admission';
import NewsDetail from './pages/home/img-slider/New/NewDetail';
import QuestionDetail from './pages/forum2/PostDetail';
import ScrollToTop from './components/ScrollToTop';
import { MsalProvider } from "@azure/msal-react";
import './App.css';


const admin = ["Satikit Tapbumrong", "Jirawatt Chimmanee", "Natchapon Sukthep"];

const App = ({ instance }) => {
  const [activeAccount, setActiveAccount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
      const account = instance.getActiveAccount();
      setActiveAccount(account);

      if (account && admin.includes(account.name)) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }

    const callbackId = instance.addEventCallback((event) => {
      if (event.eventType === 'msal:loginSuccess' && event.payload.account) {
        const account = event.payload.account;
        instance.setActiveAccount(account);
        setActiveAccount(account);

        if (account && admin.includes(account.name)) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);

  return (
    <MsalProvider instance={instance}>
      <Router>
        <ScrollToTop />
        <Header isAdmin={isAdmin} />
        <Routes>
          <Route path="/" element={<Home isAdmin={isAdmin} />} />

          <><Route path="/cooproom" element={<CoopRoom username={activeAccount ? activeAccount.name : ""} />} />
          <Route path="/forums" element={<Forum username={activeAccount ? activeAccount.name : ""} />} /></>
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/map" element={<Map />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/program" element={<Program />} />
          <Route path="/program/software" element={<Software />} />
          <Route path="/program/glasgow" element={<GlassGlow />} />
          <Route path="/program/queensland" element={<Queensland />} />
          <Route path="forums/:forumId/posts/:postId" element={<Post />} />
          <Route path="/news-detail" element={<NewsDetail />} />
          <Route path="/forum/:title" element={<QuestionDetail />} />
          <Route
            path="/add-post"
            element={
              <AddPost username={activeAccount ? activeAccount.name : ""} />
            }
          />
        </Routes>
      </Router>
    </MsalProvider>
  );
};

export default App;
