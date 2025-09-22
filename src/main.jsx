import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

import App from "./App";
import "./index.css";

async function configureAmplify() {
  const response = await fetch("/amplify_outputs.json");
  const outputs = await response.json();
  Amplify.configure(outputs);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

configureAmplify();
