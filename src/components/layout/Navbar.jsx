import { Link } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';

function Navbar({ role, user }) {
  return (
    <header className="dashboard-navbar">
      <div className="navbar-search">
        <Search size={18} aria-hidden="true" />
        <input type="text" placeholder="Search..." />
      </div>
      <div className="navbar-actions">
        <button className="navbar-icon-btn" aria-label="Notifications">
          <Bell size={18} aria-hidden="true" />
        </button>
        <Link to={`/${role}/profile`} className="navbar-user">
          <span className="navbar-avatar">
            {user?.name?.charAt(0) || 'U'}
          </span>
          <span className="navbar-username">{user?.name || 'User'}</span>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
