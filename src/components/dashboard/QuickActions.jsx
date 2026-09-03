import { Link } from 'react-router-dom';
import { BarChart3, Building2, ClipboardList, FilePlus2, MessageCircle, Package, Users } from 'lucide-react';

function QuickActions({ role }) {
  const actions = role === 'admin'
    ? [
        { label: 'Manage users', to: '/admin/users', icon: Users },
        { label: 'Manage providers', to: '/admin/providers', icon: Building2 },
        { label: 'Manage products', to: '/admin/products', icon: Package },
        { label: 'View reports', to: '/admin', icon: BarChart3 },
      ]
    : [
        { label: 'Add product', to: '/provider/products/add', icon: FilePlus2 },
        { label: 'Manage products', to: '/provider/products', icon: Package },
        { label: 'View orders', to: '/provider', icon: ClipboardList },
        { label: 'Support', to: '/provider/support', icon: MessageCircle },
      ];

  return (
    <div className="quick-actions">
      <span className="eyebrow">Quick actions</span>
      <div className="quick-actions-grid">
        {actions.map((action) => (
          <Link key={action.label} to={action.to} className="quick-action-card">
            <action.icon className="quick-action-icon" aria-hidden="true" />
            <span>{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
