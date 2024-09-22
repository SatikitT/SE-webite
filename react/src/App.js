import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Forum from './components/Forum';
import Post from './components/Post';
import AddPost from './components/AddPost';
import CoopRoom from './components/CoopRoom';
import './App.css';
import { InteractionStatus, EventType } from "@azure/msal-browser";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalProvider } from "@azure/msal-react";
import { loginRequest } from './components/AuthConfig';

const WrappedView = () => {
  const { instance, inProgress } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleRedirect = () => {
    if (inProgress === InteractionStatus.None) {
      setIsLoggingIn(true);
      instance
        .loginRedirect({
          ...loginRequest,
          prompt: "create",
        })
        .catch((error) => {
          console.log(error);
          setIsLoggingIn(false);
        });
    }
  };

  return (
    <div className="App">
      <AuthenticatedTemplate>
        {activeAccount ? (
          <div>
            <p>Authenticated Successfully</p>
            <p>Welcome, {activeAccount.name || activeAccount.username}!</p>
          </div>
        ) : null}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <button onClick={handleRedirect} disabled={isLoggingIn || inProgress !== InteractionStatus.None}>
          {isLoggingIn ? 'Signing Up...' : 'Sign Up'}
        </button>
      </UnauthenticatedTemplate>
    </div>
  );
}

const App = ({ instance }) => {
  useEffect(() => {

    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
    }

    const eventCallback = (event) => {
      if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
        const account = event.payload.account;
        instance.setActiveAccount(account);
      }
    };

    instance.addEventCallback(eventCallback, (error) => {
      console.log('error', error);
    });

    // Handle auth redirect and initial setup for MSAL
    instance.handleRedirectPromise().then(authResult => {
      // Check if user signed in
      const account = instance.getActiveAccount();
      if (!account) {
        // Redirect anonymous user to login page
        instance.loginRedirect();
      }
    }).catch(err => {
      // Handle errors
      console.log(err);
    });

  }, [instance]);

  return (
    <MsalProvider instance={instance}>
      <WrappedView />
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cooproom" element={<CoopRoom />} />
            <Route path="/about" element={<About />} />
            <Route path="/forums" element={<Forum />} />
            <Route path="forums/:forumId/posts/:postId" element={<Post />} />
            <Route path="/add-post" element={<AddPost />} />
          </Routes>
        </div>
      </Router>
    </MsalProvider>
  );
};

export default App;
