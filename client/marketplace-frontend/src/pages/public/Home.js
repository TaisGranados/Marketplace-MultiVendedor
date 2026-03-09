import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiTrendingUp, FiAward, FiShield } from 'react-icons/fi';
import Button from '../../components/common/Button';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Descubre el Marketplace
              <span className="gradient-text"> más completo</span>
            </h1>
            <p className="hero-subtitle">
              Miles de productos de vendedores verificados. Compra seguro,
              recibe rápido y disfruta de soporte post-venta de calidad.
            </p>
            <div className="hero-actions">
              <Link to="/productos">
                <Button variant="primary" size="large" icon={<FiShoppingBag />}>
                  Explorar Productos
                </Button>
              </Link>
              <Link to="/registro">
                <Button variant="secondary" size="large">
                  Registrarse Gratis
                </Button>
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600"
              alt="Shopping"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">¿Por qué elegirnos?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FiShoppingBag />
              </div>
              <h3>Múltiples Vendedores</h3>
              <p>
                Accede a miles de productos de diferentes vendedores verificados
                en un solo lugar.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FiShield />
              </div>
              <h3>Compra Segura</h3>
              <p>
                Todos los pagos están protegidos. Tu información está segura con
                nosotros.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FiTrendingUp />
              </div>
              <h3>Mejores Precios</h3>
              <p>
                Compara precios entre vendedores y encuentra las mejores ofertas
                del mercado.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FiAward />
              </div>
              <h3>Soporte 24/7</h3>
              <p>
                Nuestro equipo de soporte está disponible para ayudarte en todo
                momento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>¿Eres vendedor?</h2>
            <p>
              Únete a nuestra plataforma y alcanza miles de clientes
              potenciales. Gestiona tu inventario, órdenes y ventas desde un
              solo lugar.
            </p>
            <Link to="/vendedor/registro">
              <Button variant="primary" size="large">
                Vender en Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>10,000+</h3>
              <p>Productos</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Vendedores</p>
            </div>
            <div className="stat-item">
              <h3>50,000+</h3>
              <p>Clientes</p>
            </div>
            <div className="stat-item">
              <h3>4.8/5</h3>
              <p>Calificación</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;