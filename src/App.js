import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";

import LenisProvider from "./components/LenisProvider";

function App() {
  return (
    <div className="App">
      <LenisProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </LenisProvider>
    </div>
  );
}

export default App;
