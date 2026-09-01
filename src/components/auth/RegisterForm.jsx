import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { apiRequest } from '../../data/api';

const roleRoutes = {
  customer: '/customer',
  provider: '/provider',
  admin: '/admin',
};

function RegisterForm() {
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
      await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          first_name: formData.get('first_name'),
          last_name: formData.get('last_name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          password: formData.get('password'),
          role,
        }),
      });
      navigate('/login');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
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