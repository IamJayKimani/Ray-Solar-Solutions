import { Link } from 'react-router-dom';

function BrandHeader() {
  return (
    <header className="sticky top-0 z-20 bg-[rgba(16,22,43,0.92)] backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center h-[82px] px-6 ml-[72px]">
        <Link to="/" className="inline-flex items-center gap-3 font-bold tracking-wide text-white">
          <span className="text-2xl text-[#f5a623]">☀</span>
          <span>Ray Solar <strong className="text-[#f5a623]">Solutions</strong></span>
        </Link>
      </div>
    </header>
  );
}

export default BrandHeader;
