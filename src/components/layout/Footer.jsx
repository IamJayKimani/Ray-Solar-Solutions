import { Link } from 'react-router-dom';

function Footer() {
  return (
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
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
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
  );
}

export default Footer;
