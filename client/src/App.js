import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout
import MainLayout from './components/layout/MainLayout';

// Páginas
import Home from './pages/public/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;