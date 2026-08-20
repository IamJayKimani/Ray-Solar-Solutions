import { Link } from "react-router-dom";

function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="brand-icon">☀</div>

        <div>
          <h1>Ray Solar</h1>
          <p>Solutions</p>
        </div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          {children}
        </div>
      </div>

      <footer className="auth-footer">
        <p>
          © 2026 Ray Solar Solutions. Sustainable energy for a brighter
          tomorrow.
        </p>
      </footer>
    </div>
  );
}

export default AuthLayout;