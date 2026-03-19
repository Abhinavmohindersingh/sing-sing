import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import DemoPage from "./pages/DemoPage";
import MarketingDemoPage from "./pages/MarketingDemoPage";
import PerformancePage from "./pages/PerformancePage";
import HistoricalPage from "./pages/HistoricalPage";

import LenisProvider from "./components/LenisProvider";

function App() {
  return (
    <div className="App">
      <LenisProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/marketing-demo" element={<MarketingDemoPage />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/historical" element={<HistoricalPage />} />
          </Routes>
        </BrowserRouter>
      </LenisProvider>
    </div>
  );
}

export default App;
