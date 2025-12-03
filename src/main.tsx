
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/mophradat.css";

console.log("Main.tsx is executing");

const rootElement = document.getElementById("root");
console.log("Root element:", rootElement);

if (!rootElement) {
  document.body.innerHTML = '<div style="padding: 20px; color: red; background: yellow;">Error: Root element not found!</div>';
  throw new Error("Root element not found");
}

console.log("About to render App");
createRoot(rootElement).render(<App />);
console.log("App rendered");
  