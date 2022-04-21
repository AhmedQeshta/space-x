import { Routes, Route } from 'react-router-dom';
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

import Home from './pages/Home';
import SingleLaunch from './components/SingleLaunch/SingleLaunch';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launch/:id" element={<SingleLaunch />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
