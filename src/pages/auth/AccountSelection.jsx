import { Link } from 'react-router-dom';

function AccountSelection() {
  return (
    <div className="auth-shell container center-block">
      <div className="account-selection">
        <span className="eyebrow">Choose your role</span>
        <h1>Who are you?</h1>

        <div className="role-grid">
          <Link to="/customer" className="role-card">
            <h3>Customer</h3>
            <p>Browse products, order solar lighting, and manage your support requests.</p>
          </Link>

          <Link to="/provider" className="role-card">
            <h3>Provider</h3>
            <p>Manage inventory, add products, and grow your solar business.</p>
          </Link>

          <Link to="/admin" className="role-card">
            <h3>Administrator</h3>
            <p>Monitor users, providers and platform-wide product activity.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccountSelection;
