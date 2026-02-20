import React from 'react';
import './Button.css';

const Button = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`
        custom-btn
        btn-${variant}
        btn-${size}
        ${fullWidth ? 'btn-full-width' : ''}
        ${loading ? 'btn-loading' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn-spinner"></span>}
      {!loading && icon && <span className="btn-icon">{icon}</span>}
      {!loading && <span>{children}</span>}
    </button>
  );
};

export default Button;