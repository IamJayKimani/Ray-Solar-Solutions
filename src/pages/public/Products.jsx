import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import { getProducts } from '../../data/products';

function Products() {
  const products = getProducts();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(1000000);

  const categories = ['all', ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      const matchesPrice = product.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [query, category, maxPrice]);

  return (
    <div className="page-shell container">
      <div className="section-heading page-title-row">
        <div>
          <span className="eyebrow">Our collection</span>
          <h1>Solar lighting products</h1>
        </div>
      </div>

      <div className="filters-panel">
        <label className="search-field">
          <Search size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products"
            className="search-input"
          />
        </label>

        <label className="select-field">
          <SlidersHorizontal size={18} />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="filter-select">
            {categories.map((option) => (
              <option key={option} value={option}>
                {option === 'all' ? 'All categories' : option}
              </option>
            ))}
          </select>
        </label>

        <label className="price-filter">
          <span>Max price: KSh {maxPrice.toLocaleString()}</span>
          <input type="range" min="20" max="1000000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
        </label>
      </div>

      <div className="product-grid product-page-grid">
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="product-body">
                <span className="tag">{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="meta-row">
                  <span>{product.wattage}</span>
                  <span>In stock: {product.stock}</span>
                </div>
                <div className="price-row">
                  <strong>KSh {product.price}</strong>
                  <Link to={`/products/${product.id}`} className="mini-btn">
                    View <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="empty-state">No products match your search. Try another price or keyword.</div>
        )}
      </div>
    </div>
  );
}

export default Products;
