  import { createRoot } from "react-dom/client";
  import App from "./app/App";
  import "./styles/index.css";
  import { ThemeProvider } from "next-themes";

  createRoot(document.getElementById("root")!).render(
    <ThemeProvider attribute="class" defaultTheme="dark">
      <App />
    </ThemeProvider>
  );
