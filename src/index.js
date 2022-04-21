import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this: [[ import './style/index.css' ]];
import { AuthProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
