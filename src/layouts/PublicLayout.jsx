import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
  ChevronsLeft,
  ChevronsRight,
  Home,
  Info,
  LogIn,
  ShoppingBag,
  Sparkles,
  UserRoundPlus,
} from 'lucide-react';

const landingLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/products', label: 'Products', icon: ShoppingBag },
  { to: '/products', label: 'Shop', icon: Sparkles },
  { to: '/login', label: 'Login', icon: LogIn },
  { to: '/register', label: 'Register', icon: UserRoundPlus },
  { to: '/products', label: 'Support', icon: Info },
];

function PublicLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container nav-container">
          <Link to="/" className="brand" aria-label="Ray Solar Solutions home">
            <span className="brand-icon" aria-hidden="true">☀</span>
            <span>
              Ray Solar <strong>Solutions</strong>
            </span>
          </Link>

          <nav className="nav" aria-label="Main navigation">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/products">Shop</Link>
          </nav>

          <div className="nav-actions">
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/register" className="btn btn-primary">Sign up</Link>
            <Link to="/products" className="btn btn-primary">Shop now</Link>
          </div>
        </div>
      </header>

      <main className="public-main">
        <div className={`landing-layout ${collapsed ? 'collapsed' : ''}`}>
          <aside className={`landing-sidebar ${collapsed ? 'collapsed' : ''}`} aria-label="Landing page navigation">
            <div className="sidebar-topbar">
              <div className="sidebar-logo">
                <div className="sidebar-logo-mark">☀</div>
                {!collapsed && <span>Ray Solar</span>}
              </div>
            </div>

            <nav className="landing-nav" aria-label="Landing pages">
              {landingLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={`${item.to}-${item.label}`}
                    to={item.to}
                    className="sidebar-nav-item"
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="sidebar-nav-icon" />
                    {!collapsed && <span className="sidebar-nav-label">{item.label}</span>}
                  </Link>
                );
              })}
            </nav>

            <div className="sidebar-footer">
              <button type="button" className="sidebar-collapse-button" onClick={() => setCollapsed((value) => !value)}>
                {collapsed ? <ChevronsRight className="sidebar-nav-icon" /> : <ChevronsLeft className="sidebar-nav-icon" />}
                {!collapsed && <span>Collapse</span>}
              </button>
            </div>
          </aside>

          <div className="public-page-content">
            <Outlet />
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand">
              <span className="brand-icon" aria-hidden="true">☀</span>
              <span>Ray Solar</span>
            </div>
            <p>Brightening communities with sustainable solar lighting for homes, workspaces and public areas.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/">Benefits</Link></li>
              <li><Link to="/account-selection">Accounts</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>About us</li>
              <li>Support</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>hello@raysolar.co</li>
              <li>+254 700 000 000</li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Ray Solar Solutions. Powered by clean energy.</div>
      </footer>
    </div>
  );
}

export default PublicLayout;
