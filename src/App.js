import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Password from './components/Password';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <Router>
      <SpeedInsights />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/password" element={<Password />} />
      </Routes>
    </Router>
  );
}

export default App;
