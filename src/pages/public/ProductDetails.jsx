import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, ShoppingCart, Star } from 'lucide-react';
import { fetchProductById } from '../../data/products';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductById(id).then(setProduct).catch(() => setProduct(undefined));
  }, [id]);

  if (product === null) return <div className="container page-shell">Loading product...</div>;

  if (!product) {
    return (
      <div className="container page-shell empty-state">
        <h2>Product not found</h2>
        <Link to="/products" className="btn btn-primary">Return to products</Link>
      </div>
    );
  }

  return (
    <div className="container page-shell product-detail">
      <Link to="/products" className="back-link">
        <ArrowLeft size={16} /> Back to products
      </Link>

      <div className="detail-grid">
        <div className="detail-image-wrap">
          <img src={product.image} alt={product.name} className="detail-image" />
        </div>

        <div className="detail-content">
          <span className="tag">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="meta-row detail-meta">
            <span><Star size={14} /> {product.rating}</span>
            <span>{product.wattage}</span>
            <span>{product.stock} in stock</span>
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="price-row detail-price">
            <strong>KSh {product.price}</strong>
            <span className="status-badge success">In Stock</span>
          </div>

          <ul className="feature-list">
            {product.features.map((feature) => (
              <li key={feature}><Check size={16} /> {feature}</li>
            ))}
          </ul>

          <div className="detail-actions">
            <button className="btn btn-primary" type="button">
              <ShoppingCart size={16} /> Add to cart
            </button>
            <button className="btn btn-secondary" type="button">Buy now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
