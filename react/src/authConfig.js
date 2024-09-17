import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "594385b2-53da-40c5-ad8e-934677ba1cb5", // Replace with your client ID
        authority: "https://login.microsoftonline.com/fd206715-7509-4ae5-9b96-76bb97886a84", // Replace with your tenant ID
        redirectUri: "https://se-website-dpehdfcxbhebemes.southeastasia-01.azurewebsites.net/.auth/login/aad/callback", // Replace with your redirect URI
        postLogoutRedirectUrl: '/',
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
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
    scopes: ["User.Read"]
};
