import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/home";
import Easy from "./components/Home/easy";
import Medium from "./components/Home/medium";
import Hard from "./components/Home/hard";

function App() {
  return (
    <div>
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
