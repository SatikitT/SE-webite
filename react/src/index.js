import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from './components/AuthConfig';

// MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.

const msalInstance = new PublicClientApplication(msalConfig);

// Default to using the first account if no account is active on page load
if (msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(msalInstance.getActiveAccount()[0]);
}

// Listen for sign-in event and set active account
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App instance={msalInstance} />
);
