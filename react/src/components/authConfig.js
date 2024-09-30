import { LogLevel } from "@azure/msal-browser";
import { PublicClientApplication, EventType } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "999616e1-632b-4cf4-aca7-bf7c0132817e",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "/",
        
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            }
        }
    }
};

export const loginRequest = {
    scopes: ["openid", "profile"], 
  };

export const msalInstance = new PublicClientApplication(msalConfig);

