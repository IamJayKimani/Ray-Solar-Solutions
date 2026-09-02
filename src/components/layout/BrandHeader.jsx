import { Link } from 'react-router-dom';

function BrandHeader() {
  return (
    <header className="topbar">
      <div className="container nav-container">
        <Link to="/" className="brand" aria-label="Ray Solar Solutions home">
          <span className="brand-icon" aria-hidden="true">☀</span>
          <span>
            Ray Solar <strong>Solutions</strong>
          </span>
        </Link>

      </div>
    </header>
  );
}

export default BrandHeader;
