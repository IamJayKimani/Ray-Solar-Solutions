import { Link } from 'react-router-dom';
import { BatteryCharging, Leaf, Zap } from 'lucide-react';
import { getProducts } from '../../data/products';

const highlights = [
  { title: 'Off-grid reliable', text: 'Solar lighting designed for homes, schools, clinics and businesses without unstable power supply.', icon: BatteryCharging },
  { title: 'Cost savings', text: 'Reduce fuel and electricity costs with durable systems built for long-term performance.', icon: Leaf },
  { title: 'Fast installation', text: 'Plug-and-play solutions from compact lanterns to full commercial lighting systems.', icon: Zap },
];

function Home() {
  const featured = getProducts().slice(0, 3);

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Clean energy for every dusk</span>
            <h1>Bring light to every corner of your day.</h1>
            <p>
              Explore solar-powered lighting systems that are efficient, affordable and built for
              homes, businesses and off-grid communities.
            </p>

            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">Shop lighting</Link>
              <Link to="/products" className="btn btn-secondary">Explore products</Link>
            </div>

            <div className="hero-stats">
              <div>
                <strong>14k+</strong>
                <span>Homes lit</span>
              </div>
              <div>
                <strong>92%</strong>
                <span>Cost reduction</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Reliable support</span>
              </div>
            </div>
          </div>

          <div className="hero-art" aria-label="Sunrise solar illustration">
            <div className="sunrise-card" role="img" aria-label="Sunrise skyline illustration">
              <svg viewBox="0 0 460 520" className="sunrise-svg" aria-hidden="true">
                <defs>
                  <linearGradient id="skyGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#11213d" />
                    <stop offset="32%" stopColor="#1b2447" />
                    <stop offset="32%" stopColor="#f5a623" />
                    <stop offset="100%" stopColor="#f8d4a0" />
                  </linearGradient>
                </defs>
                <rect width="460" height="520" fill="url(#skyGradient)"/>
                <circle cx="230" cy="150" r="62" fill="#fff0b8" opacity="0.96"/>
                <path d="M120 190 A140 140 0 0 1 340 190" fill="none" stroke="#f5a623" strokeWidth="10" strokeLinecap="round"/>
                <g opacity="0.75">
                  <line x1="230" y1="88" x2="230" y2="215" stroke="#f5a623" strokeWidth="8"/>
                  <line x1="130" y1="118" x2="205" y2="195" stroke="#f5a623" strokeWidth="6"/>
                  <line x1="330" y1="118" x2="255" y2="195" stroke="#f5a623" strokeWidth="6"/>
                </g>
                <g fill="#10162b" opacity="0.9">
                  <rect x="40" y="285" width="90" height="120" rx="10"/>
                  <rect x="160" y="245" width="120" height="160" rx="10"/>
                  <rect x="312" y="300" width="100" height="105" rx="10"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <div className="sunrise-divider" aria-hidden="true" />

      <section className="info-section">
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">Why choose us</span>
            <h2>Made for dependable solar living</h2>
          </div>

          <div className="feature-grid">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <article className="feature-card" key={item.title}>
                  <div className="feature-icon">
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Featured products</span>
              <h2>Best sellers for brighter homes</h2>
            </div>
            <Link to="/products" className="text-link">View all products</Link>
          </div>

          <div className="product-grid home-grid">
            {featured.map((product) => (
              <article className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="product-body">
                  <span className="tag">{product.category}</span>
                  <h3>{product.name}</h3>
                  <div className="meta-row">
                    <span>{product.wattage}</span>
                    <span>★ {product.rating}</span>
                  </div>
                  <div className="price-row">
                    <strong>KSh {product.price}</strong>
                    <Link to={`/products/${product.id}`} className="mini-btn">Details</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-box">
          <div>
            <span className="eyebrow">Ready to switch?</span>
            <h2>Power your next project with solar lighting that lasts.</h2>
          </div>
          <Link to="/products" className="btn btn-primary">Browse products</Link>
        </div>
      </section>
    </>
  );
}

export default Home;
