import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Forum from './components/Forum';
import Post from './components/Post';
import AddPost from './components/AddPost';
import CoopRoom from './components/CoopRoom';
import Header from './components/header/Header';
import { MsalProvider } from "@azure/msal-react";
import './App.css';

const App = ({ instance }) => {
  const [activeAccount, setActiveAccount] = useState(null);  // Manage activeAccount with state

  useEffect(() => {
    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
      setActiveAccount(instance.getActiveAccount());
    }

    const callbackId = instance.addEventCallback((event) => {
      if (event.eventType === 'msal:loginSuccess' && event.payload.account) {
        const account = event.payload.account;
        instance.setActiveAccount(account);
        setActiveAccount(account);
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);

  console.log(activeAccount);

  return (
    <MsalProvider instance={instance}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cooproom" element={<CoopRoom />} />
          <Route path="/about" element={<About />} />
          <Route path="/forums" element={<Forum />} />
          <Route path="forums/:forumId/posts/:postId" element={<Post />} />
          <Route path="/add-post" element={<AddPost username={activeAccount ? activeAccount.name : ""} />} />
        </Routes>
      </Router>
    </MsalProvider>
  );
};

export default App;
