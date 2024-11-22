import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import View from './pages/View';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id/view" element={<View />} />
    </Routes>
  );
}

export default App;
