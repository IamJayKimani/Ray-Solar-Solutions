import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const roleRoutes = {
  customer: '/customer',
  provider: '/provider',
  admin: '/admin',
};

function LoginForm() {
  const navigate = useNavigate();
  const [role, setRole] = useState('customer');

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('ray-solar-role', role);
    navigate(roleRoutes[role]);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email address</label>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="form-group">
        <div className="label-row">
          <label htmlFor="password">Password</label>

          <Link to="/forgot-password" className="forgot-link">
            Forgot password?
          </Link>
        </div>

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <div className="form-group">
        <label>Role</label>
        <div className="role-options">
          {Object.entries(roleRoutes).map(([value, path]) => (
            <button
              key={value}
              type="button"
              className={`role-card ${role === value ? 'active' : ''}`}
              onClick={() => setRole(value)}
            >
              <span className="role-icon">{value === 'customer' ? '👤' : value === 'provider' ? '🏪' : '⚙'}</span>
              <strong>{value === 'customer' ? 'Customer' : value === 'provider' ? 'Provider' : 'Admin'}</strong>
              <small>{path === '/customer' ? 'Shop and manage orders' : path === '/provider' ? 'Manage products and inventory' : 'Manage the platform'}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="remember-row">
        <label>
          <input type="checkbox" />
          <span>Remember me</span>
        </label>
      </div>

      <button type="submit" className="auth-button">
        Sign In
      </button>

      <p className="auth-switch">
        Don't have an account?{' '}
        <Link to="/register">Create an account</Link>
      </p>
    </form>
  );
}

export default LoginForm;