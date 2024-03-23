import React from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App";
const target = document.getElementById("root");
const root = createRoot(target);
root.render(<App />);
