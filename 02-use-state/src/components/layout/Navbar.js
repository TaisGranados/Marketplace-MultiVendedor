import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Por ahora no hace nada, solo es la carcasa
    console.log('Búsqueda:', searchQuery);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/logo192.png" alt="Logo" />
          <span>Marketplace</span>
        </Link>

        {/* Barra de búsqueda */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" aria-label="Buscar">
            <FiSearch />
          </button>
        </form>

        {/* Menú de navegación */}
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/productos" onClick={() => setIsMenuOpen(false)}>
            Productos
          </Link>
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>
            Iniciar Sesión
          </Link>
          <Link
            to="/registro"
            className="btn btn-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Registrarse
          </Link>
        </div>

        {/* Botón de menú móvil */}
        <button
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;