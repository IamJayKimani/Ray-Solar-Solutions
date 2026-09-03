import { Outlet, Link } from 'react-router-dom';
import GlobalSidebar from '../components/layout/GlobalSidebar';

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-20 bg-[rgba(16,22,43,0.92)] backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[82px] px-6 gap-5">
          <Link to="/" className="inline-flex items-center gap-3 font-bold tracking-wide text-white">
            <span className="text-2xl text-[#f5a623]">☀</span>
            <span>Ray Solar <strong className="text-[#f5a623]">Solutions</strong></span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-white/75">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <Link to="/products" className="hover:text-white transition">Products</Link>
            <Link to="/about" className="hover:text-white transition">About</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-semibold text-white/80 hover:text-white transition">Login</Link>
            <Link to="/register" className="px-5 py-2.5 rounded-xl bg-[#f5a623] hover:bg-[#d9820b] text-white text-sm font-bold transition">Sign up</Link>
          </div>
        </div>
      </header>

      <main className="flex-1 ml-[72px]">
        <Outlet />
      </main>

      <footer className="bg-[#10162b] text-white/70 ml-[72px]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 py-14">
          <div>
            <div className="flex items-center gap-3 font-bold text-white mb-4">
              <span className="text-xl">☀</span>
              <span>Ray Solar</span>
            </div>
            <p className="text-sm leading-relaxed">Brightening communities with sustainable solar lighting for homes, workspaces and public areas.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Explore</h4>
            <ul className="grid gap-2 text-sm">
              <li><Link to="/products" className="hover:text-white transition">Products</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="grid gap-2 text-sm">
              <li>About us</li>
              <li>Support</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="grid gap-2 text-sm">
              <li>hello@raysolar.co</li>
              <li>+254 700 000 000</li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs py-5 border-t border-white/[0.08]">© 2026 Ray Solar Solutions. Powered by clean energy.</div>
      </footer>

      <GlobalSidebar />
    </div>
  );
}

export default PublicLayout;
