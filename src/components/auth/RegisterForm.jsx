import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const roleRoutes = {
  customer: '/customer',
  provider: '/provider',
  admin: '/admin',
};

function RegisterForm() {
  const navigate = useNavigate();
  const [role, setRole] = useState('customer');

  const handleSubmit = async (event) => {
    event.preventDefault();

    localStorage.setItem('ray-solar-role', role);
    navigate(roleRoutes[role]);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First name</label>

          <input
            type="text"
            id="firstName"
            name="first_name"
            placeholder="First name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last name</label>

          <input
            type="text"
            id="lastName"
            name="last_name"
            placeholder="Last name"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="registerEmail">Email address</label>

        <input
          type="email"
          id="registerEmail"
            name="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone number</label>

        <input
          type="tel"
          id="phone"
            name="phone"
          placeholder="e.g. 0712 345 678"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="registerPassword">Password</label>

        <input
          type="password"
          id="registerPassword"
            name="password"
          placeholder="Create a password"
          required
        />
      </div>

      <div className="form-group">
        <label>Account type</label>

        <div className="role-options">
          <button
            type="button"
            className={`role-card ${role === 'customer' ? 'active' : ''}`}
            onClick={() => setRole('customer')}
          >
            <span className="role-icon">👤</span>
            <strong>Customer</strong>
            <small>Browse and purchase solar products</small>
          </button>

          <button
            type="button"
            className={`role-card ${role === 'provider' ? 'active' : ''}`}
            onClick={() => setRole('provider')}
          >
            <span className="role-icon">🏪</span>
            <strong>Provider</strong>
            <small>Manage inventory and add products</small>
          </button>

          <button
            type="button"
            className={`role-card ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
          >
            <span className="role-icon">⚙</span>
            <strong>Admin</strong>
            <small>Manage products and orders</small>
          </button>
        </div>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <button type="submit" className="auth-button" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </button>

      <p className="auth-switch">
        Already have an account?{' '}
        <Link to="/login">Sign in</Link>
      </p>
    </form>
  );
}

export default RegisterForm;