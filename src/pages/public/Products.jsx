import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Sun } from 'lucide-react';
import { fetchProducts } from '../../data/products';
import useScrollReveal from '../../hooks/useScrollReveal';

function RevealSection({ children, className = '', delay = 0 }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`scroll-reveal${delay ? ` delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    fetchProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  const categories = ['all', ...new Set(products.map((p) => p.category).filter(Boolean))];

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name?.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [query, category, sortBy, products]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[380px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920&q=80"
            alt="Solar panels in sunlight"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#10162b]/70 via-[#10162b]/40 to-[#10162b]/80" />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 text-center">
          <RevealSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#f5a623]/20 text-[#f5a623] text-xs font-bold uppercase tracking-wider mb-4">
              Our Collection
            </span>
          </RevealSection>
          <RevealSection delay={1}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
              Powering Homes<br />
              <span className="text-[#f5a623]">With the Sun</span>
            </h1>
          </RevealSection>
          <RevealSection delay={2}>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              Browse our curated range of solar lighting solutions — from compact lanterns to full commercial systems.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Filters + Products */}
      <section className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Filter bar */}
        <RevealSection>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            {/* Category pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition border ${
                    category === cat
                      ? 'bg-[#10162b] text-white border-[#10162b]'
                      : 'bg-white text-[#4a5565] border-gray-200 hover:border-[#10162b] hover:text-[#10162b]'
                  }`}
                >
                  {cat === 'all' ? 'All Products' : cat}
                </button>
              ))}
            </div>

            {/* Search + Sort */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full md:w-56 pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition bg-white"
                />
              </div>
              <div className="relative">
                <SlidersHorizontal size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] outline-none focus:border-[#f5a623] bg-white appearance-none cursor-pointer transition"
                >
                  <option value="default">Sort by</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Results count */}
        <p className="text-sm text-[#4a5565] mb-6">
          Showing <span className="font-bold text-[#10162b]">{filteredProducts.length}</span> of {products.length} products
        </p>

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group flex flex-col h-full bg-white overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-56 bg-gray-100 overflow-hidden shrink-0">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Sun size={40} className="text-[#f5a623]/30" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-[#10162b] mb-2">{product.name}</h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <strong className="text-xl font-bold text-[#10162b]">
                        KSh {product.price.toLocaleString()}
                      </strong>
                      <span className="text-sm text-gray-400 line-through">
                        KSh {(product.price * 1.3).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-[#4a5565] leading-relaxed mb-5 flex-1 line-clamp-2">
                      {product.description || 'Efficient solar lighting for your home or business.'}
                    </p>
                    <span className="block w-full py-3 bg-[#2c1810] group-hover:bg-[#1a0f0a] text-white text-center text-sm font-bold tracking-wide transition-colors mt-auto">
                      Buy now
                    </span>
                  </div>
                </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Sun size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-[#4a5565]">No products match your search. Try another keyword or category.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Products;
