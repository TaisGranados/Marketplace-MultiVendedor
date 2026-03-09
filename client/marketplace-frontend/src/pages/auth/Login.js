import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { FiMail, FiLock } from 'react-icons/fi';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login intentado con:', { email, password });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-section">
          <div className="auth-form-wrapper">
            <div className="auth-logo">
              <div className="auth-logo-icon">M</div>
              <h1>Marketplace</h1>
            </div>
            <div className="auth-header">
              <h2>Iniciar Sesión</h2>
              <p>Bienvenido de nuevo, ingresa tus credenciales</p>
            </div>
            <form onSubmit={handleSubmit} className="auth-form">
              <Input label="Email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} icon={<FiMail />} placeholder="tu@email.com" required />
              <Input label="Contraseña" type={showPassword ? 'text' : 'password'} name="password" value={password} onChange={(e) => setPassword(e.target.value)} icon={<FiLock />} placeholder="••••••••" required />
              <div className="form-options">
                <label className="checkbox-label"><input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} /><span>Mostrar contraseña</span></label>
                <Link to="#" className="forgot-link">¿Olvidaste tu contraseña?</Link>
              </div>
              <Button type="submit" variant="primary" size="large" fullWidth>Iniciar Sesión</Button>
            </form>
            <div className="auth-footer"><p>¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></p></div>
          </div>
        </div>
        <div className="auth-visual-section">
          <div className="visual-content">
            <h2>Únete a nuestro Marketplace</h2>
            <p>Descubre miles de productos de vendedores verificados. Compra seguro y recibe soporte post-venta de calidad.</p>
            <ul className="features-list">
              <li>✓ Múltiples vendedores en un solo lugar</li>
              <li>✓ Pagos seguros y protegidos</li>
              <li>✓ Soporte al cliente 24/7</li>
              <li>✓ Devoluciones fáciles y rápidas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
