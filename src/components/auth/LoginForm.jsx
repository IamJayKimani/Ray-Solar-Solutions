import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { apiRequest } from '../../data/api';

const roleRoutes = {
  customer: '/customer',
  provider: '/provider',
  admin: '/admin',
};

function LoginForm() {
  const navigate = useNavigate();
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      });

      const accountRole = data.user.role.toLowerCase();
      if (accountRole !== role) {
        throw new Error(`This account is registered as a ${accountRole}.`);
      }

      localStorage.setItem('ray-solar-role', accountRole);
      localStorage.setItem('ray-solar-access-token', data.access_token);
      navigate(roleRoutes[accountRole]);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
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

      {error && <p className="form-error" role="alert">{error}</p>}

      <button type="submit" className="auth-button" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </button>

      <p className="auth-switch">
        Don't have an account?{' '}
        <Link to="/register">Create an account</Link>
      </p>
    </form>
  );
}

export default LoginForm;