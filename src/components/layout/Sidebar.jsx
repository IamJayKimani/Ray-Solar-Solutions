import { NavLink } from 'react-router-dom';

function Sidebar({ role, links }) {
  const title = role === 'admin' ? 'Admin' : role === 'provider' ? 'Provider' : 'Dashboard';

  return (
    <aside className="dashboard-sidebar">
      <h2>{title}</h2>
      <nav>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to}>
            {link.icon && <span aria-hidden="true">{link.icon}</span>}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
