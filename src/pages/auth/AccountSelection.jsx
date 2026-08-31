import { Link } from 'react-router-dom';

const roles = [
  {
    path: '/customer',
    title: 'Customer',
    description: 'Browse products, order solar lighting, and manage your support requests.',
    role: 'customer',
  },
  {
    path: '/provider',
    title: 'Provider',
    description: 'Manage inventory, add products, and grow your solar business.',
    role: 'provider',
  },
  {
    path: '/admin',
    title: 'Administrator',
    description: 'Monitor users, providers and platform-wide product activity.',
    role: 'admin',
  },
];

function AccountSelection() {
  const handleSelectRole = (role) => {
    localStorage.setItem('ray-solar-role', role);
  };

  return (
    <div className="auth-shell container center-block">
      <div className="account-selection">
        <span className="eyebrow">Choose your role</span>
        <h1>Who are you?</h1>

        <div className="role-grid">
          {roles.map((role) => (
            <Link
              key={role.role}
              to={role.path}
              className="role-card"
              onClick={() => handleSelectRole(role.role)}
            >
              <h3>{role.title}</h3>
              <p>{role.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccountSelection;
