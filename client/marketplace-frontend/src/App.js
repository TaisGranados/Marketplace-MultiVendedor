import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout
import MainLayout from './components/layout/MainLayout';

// Páginas públicas
import Home from './pages/public/Home';
import ProductCatalog from './pages/public/ProductCatalog';

// Páginas de autenticación
import Login from './pages/auth/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Rutas Públicas con Navbar/Footer */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="productos" element={<ProductCatalog />} />
          </Route>

          {/* Login (pantalla completa, sin Navbar/Footer) */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
