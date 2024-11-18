import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Easy from "./components/Home/Easy";
import Medium from "./components/Home/Medium";
import Hard from "./components/Home/Hard";
import { useTheme } from "./context/ThemeContext";

function App() {

  const {isDarkMode} = useTheme();

  const style:React.CSSProperties = {
    color: isDarkMode ? "white" : "black",
    backgroundColor: isDarkMode ? "black" : "white",
    margin: "-8px",
    minHeight: "100vh",
    boxSizing: "border-box",
  };

  return (
    <div style={style}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="easy" element={<Easy />} />
          <Route path="medium" element={<Medium />} />
          <Route path="hard" element={<Hard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
