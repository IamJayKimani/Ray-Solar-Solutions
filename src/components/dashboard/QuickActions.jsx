import { Link } from 'react-router-dom';

function QuickActions({ role }) {
  const actions = role === 'admin'
    ? [
        { label: 'Manage users', to: '/admin/users', icon: '👥' },
        { label: 'Manage providers', to: '/admin/providers', icon: '🏢' },
        { label: 'Manage products', to: '/admin/products', icon: '📦' },
        { label: 'View reports', to: '/admin', icon: '📊' },
      ]
    : [
        { label: 'Add product', to: '/provider/products/add', icon: '➕' },
        { label: 'Manage products', to: '/provider/products', icon: '📦' },
        { label: 'View orders', to: '/provider', icon: '📋' },
        { label: 'Support', to: '/provider/support', icon: '💬' },
      ];

  return (
    <div className="quick-actions">
      <span className="eyebrow">Quick actions</span>
      <div className="quick-actions-grid">
        {actions.map((action) => (
          <Link key={action.label} to={action.to} className="quick-action-card">
            <span className="quick-action-icon" aria-hidden="true">{action.icon}</span>
            <span>{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
