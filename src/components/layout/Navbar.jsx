import { Link } from 'react-router-dom';

function Navbar({ role, user }) {
  return (
    <header className="dashboard-navbar">
      <div className="navbar-search">
        <span aria-hidden="true">🔍</span>
        <input type="text" placeholder="Search..." />
      </div>
      <div className="navbar-actions">
        <button className="navbar-icon-btn" aria-label="Notifications">
          🔔
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
