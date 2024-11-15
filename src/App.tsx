import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Easy from "./components/Home/Easy";
import Medium from "./components/Home/Medium";
import Hard from "./components/Home/Hard";


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
