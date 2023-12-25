import React from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App";
const target = document.getElementById("root");
const root = createRoot(target);
root.render(<GoogleOAuthProvider clientId="461594728459-oh7qnijrbl8n6j706t4p830mvgvb3jqi.apps.googleusercontent.com">
    <App />
</GoogleOAuthProvider>);
