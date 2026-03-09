import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiStar, FiGrid, FiList, FiFilter, FiChevronDown } from 'react-icons/fi';
import Button from '../../components/common/Button';
import './ProductCatalog.css';

/**
 * Datos mock de productos (simulan lo que vendría del backend)
 */
const MOCK_PRODUCTS = [
  { id: 1, name: 'Audífonos Bluetooth Pro', price: 45990, image: '🎧', category: 'Electrónica', vendor: 'TechStore CR', rating: 4.8, reviews: 124, stock: 15 },
  { id: 2, name: 'Mochila Urban Explorer', price: 32500, image: '🎒', category: 'Accesorios', vendor: 'ModaViva', rating: 4.5, reviews: 89, stock: 23 },
  { id: 3, name: 'Cámara Instantánea Mini', price: 67000, image: '📷', category: 'Electrónica', vendor: 'FotoMundo', rating: 4.9, reviews: 201, stock: 8 },
  { id: 4, name: 'Set de Plantas Suculentas', price: 18900, image: '🪴', category: 'Hogar', vendor: 'GreenLife', rating: 4.7, reviews: 156, stock: 42 },
  { id: 5, name: 'Teclado Mecánico RGB', price: 54990, image: '⌨️', category: 'Electrónica', vendor: 'TechStore CR', rating: 4.6, reviews: 98, stock: 12 },
  { id: 6, name: 'Taza Cerámica Artesanal', price: 8500, image: '☕', category: 'Hogar', vendor: 'ArteLocal', rating: 4.4, reviews: 67, stock: 35 },
  { id: 7, name: 'Zapatillas Running Pro', price: 72000, image: '👟', category: 'Deportes', vendor: 'SportMax', rating: 4.8, reviews: 312, stock: 18 },
  { id: 8, name: 'Lámpara LED Escritorio', price: 22990, image: '💡', category: 'Hogar', vendor: 'LuzDeco', rating: 4.3, reviews: 45, stock: 27 },
  { id: 9, name: 'Smartwatch Deportivo', price: 89990, image: '⌚', category: 'Electrónica', vendor: 'TechStore CR', rating: 4.7, reviews: 178, stock: 6 },
  { id: 10, name: 'Bolso de Cuero Vintage', price: 41500, image: '👜', category: 'Accesorios', vendor: 'ModaViva', rating: 4.6, reviews: 92, stock: 14 },
  { id: 11, name: 'Kit Yoga Premium', price: 35900, image: '🧘', category: 'Deportes', vendor: 'SportMax', rating: 4.5, reviews: 73, stock: 20 },
  { id: 12, name: 'Parlante Portátil', price: 28990, image: '🔊', category: 'Electrónica', vendor: 'FotoMundo', rating: 4.4, reviews: 145, stock: 31 },
];

const CATEGORIES = ['Todas', 'Electrónica', 'Accesorios', 'Hogar', 'Deportes'];

const ProductCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filtrar productos
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Ordenar
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return b.id - a.id;
      default: return 0;
    }
  });

  // Formatear precio
  const formatPrice = (price) => {
    return '₡' + price.toLocaleString('es-CR');
  };

  return (
    <div className="catalog-page">
      {/* Header del catálogo */}
      <section className="catalog-header">
        <div className="container">
          <div className="catalog-header-content">
            <div>
              <h1 className="catalog-title">Nuestros Productos</h1>
              <p className="catalog-subtitle">
                Explorá el catálogo completo de nuestros vendedores verificados
              </p>
            </div>
            <div className="catalog-search">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar productos o vendedores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Barra de filtros */}
      <section className="catalog-toolbar">
        <div className="container">
          <div className="toolbar-content">
            {/* Categorías */}
            <div className="category-pills">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="toolbar-right">
              {/* Toggle filtros en móvil */}
              <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
                <FiFilter /> Filtros
              </button>

              {/* Ordenar */}
              <div className="sort-select">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="relevance">Relevancia</option>
                  <option value="price-low">Menor precio</option>
                  <option value="price-high">Mayor precio</option>
                  <option value="rating">Mejor calificados</option>
                  <option value="newest">Más recientes</option>
                </select>
                <FiChevronDown className="select-arrow" />
              </div>

              {/* Vista */}
              <div className="view-toggle">
                <button
                  className={viewMode === 'grid' ? 'active' : ''}
                  onClick={() => setViewMode('grid')}
                  aria-label="Vista grilla"
                >
                  <FiGrid />
                </button>
                <button
                  className={viewMode === 'list' ? 'active' : ''}
                  onClick={() => setViewMode('list')}
                  aria-label="Vista lista"
                >
                  <FiList />
                </button>
              </div>

              {/* Contador */}
              <span className="results-count">
                {sortedProducts.length} producto{sortedProducts.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Grilla de productos */}
      <section className="catalog-products">
        <div className="container">
          {sortedProducts.length > 0 ? (
            <div className={`products-${viewMode}`}>
              {sortedProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <span className="product-emoji">{product.image}</span>
                    {product.stock <= 10 && (
                      <span className="stock-badge">¡Últimas unidades!</span>
                    )}
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-vendor">por {product.vendor}</p>
                    <div className="product-rating">
                      <FiStar className="star-icon" />
                      <span className="rating-value">{product.rating}</span>
                      <span className="rating-count">({product.reviews})</span>
                    </div>
                    <div className="product-footer">
                      <span className="product-price">{formatPrice(product.price)}</span>
                      <button className="add-to-cart-btn" onClick={() => console.log('Agregar al carrito:', product.name)}>
                        <FiShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <span className="no-results-icon">🔍</span>
              <h3>No se encontraron productos</h3>
              <p>Intentá con otra búsqueda o categoría</p>
              <Button variant="secondary" onClick={() => { setSearchQuery(''); setSelectedCategory('Todas'); }}>
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductCatalog;
