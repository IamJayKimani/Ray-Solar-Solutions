import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-[#10162B] text-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif tracking-tight">
          Ray Solar <span className="text-[#F5A623]">Solutions</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-gray-300">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/products">Shop</Link>
        </nav>

        <button className="bg-[#F5A623] text-white px-5 py-2 rounded-full font-medium hover:bg-[#D9820B]">
          Shop Now
        </button>
      </div>
    </header>
  );
}
