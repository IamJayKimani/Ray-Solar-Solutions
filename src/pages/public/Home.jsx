import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BatteryCharging, Leaf, Zap, ArrowRight, Sun, Shield, Wrench } from 'lucide-react';
import { fetchProducts } from '../../data/products';
import useScrollReveal from '../../hooks/useScrollReveal';

const highlights = [
  { title: 'Off-grid reliable', text: 'Solar lighting designed for homes, schools, clinics and businesses without unstable power supply.', icon: BatteryCharging },
  { title: 'Cost savings', text: 'Reduce fuel and electricity costs with durable systems built for long-term performance.', icon: Leaf },
  { title: 'Fast installation', text: 'Plug-and-play solutions from compact lanterns to full commercial lighting systems.', icon: Zap },
];

const stats = [
  { value: '14k+', label: 'Homes lit' },
  { value: '92%', label: 'Cost reduction' },
  { value: '24/7', label: 'Reliable support' },
];

function RevealSection({ children, className = '', delay = 0 }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`scroll-reveal${delay ? ` delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  );
}

function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetchProducts().then((products) => {
      const sorted = [...products].sort((a, b) => (b.description?.length || 0) - (a.description?.length || 0));
      setFeatured(sorted.slice(0, 3));
    }).catch(() => setFeatured([]));
  }, []);

  return (
    <>
      {/* HERO — full-bleed image + frosted glass card */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80"
            alt="Solar panels on rooftop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10162b]/80 via-[#10162b]/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#f5a623]/15 text-[#f5a623] text-xs font-bold uppercase tracking-wider mb-6">
              Clean energy for every dusk
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Bring light to every corner of your day.
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-lg leading-relaxed">
              Explore solar-powered lighting systems that are efficient, affordable and built for
              homes, businesses and off-grid communities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#f5a623] hover:bg-[#d9820b] text-white font-bold transition shadow-lg shadow-[#f5a623]/25"
              >
                Shop lighting <ArrowRight size={18} />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white font-bold hover:bg-white/10 transition"
              >
                Explore products
              </Link>
            </div>
          </div>

          {/* Right — frosted glass card */}
          <div className="hidden lg:block">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#f5a623] flex items-center justify-center">
                  <Sun size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Ray Solar Solutions</h3>
                  <p className="text-white/50 text-xs">Powering Kenya with clean energy</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <strong className="block text-xl font-extrabold text-white">{stat.value}</strong>
                    <span className="text-xs text-white/50">{stat.label}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/products"
                className="block w-full py-3 rounded-xl bg-white text-[#10162b] text-center text-sm font-bold hover:bg-white/90 transition"
              >
                View all products
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-white/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-[#faf6ee]">
        <div className="max-w-[1200px] mx-auto px-6">
          <RevealSection>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#f5a623]/10 text-[#d9820b] text-xs font-bold uppercase tracking-wider mb-4">
                Why choose us
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#10162b]">
                Made for dependable solar living
              </h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <RevealSection key={item.title} delay={i + 1}>
                  <article className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition group">
                    <div className="w-12 h-12 rounded-xl bg-[#f5a623]/10 flex items-center justify-center mb-5 group-hover:bg-[#f5a623] transition">
                      <Icon size={22} className="text-[#d9820b] group-hover:text-white transition" strokeWidth={2.2} />
                    </div>
                    <h3 className="text-lg font-bold text-[#10162b] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#4a5565] leading-relaxed">{item.text}</p>
                  </article>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <RevealSection>
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#f5a623]/10 text-[#d9820b] text-xs font-bold uppercase tracking-wider mb-4">
                  Featured products
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#10162b]">
                  Best sellers for brighter homes
                </h2>
              </div>
              <Link to="/products" className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-[#f5a623] hover:text-[#d9820b] transition">
                View all <ArrowRight size={16} />
              </Link>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((product, i) => (
              <RevealSection key={product.id} delay={i + 1} className="h-full">
                <Link
                  to={`/products/${product.id}`}
                  className="group flex flex-col h-full bg-white overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300"
                >
                  <div className="relative h-56 bg-gray-100 overflow-hidden shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
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
              </RevealSection>
            ))}
          </div>

          <Link to="/products" className="md:hidden mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-[#f5a623]">
            View all products <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <RevealSection>
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1400&q=80"
                alt="Solar panels"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#10162b]/90 to-[#10162b]/60" />
              <div className="relative z-10 px-10 py-16 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-lg">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                    Ready to switch?
                  </h2>
                  <p className="text-white/70">
                    Power your next project with solar lighting that lasts.
                  </p>
                </div>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#f5a623] hover:bg-[#d9820b] text-white font-bold transition shadow-lg shadow-[#f5a623]/25 shrink-0"
                >
                  Browse products <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-14 bg-[#10162b]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Sun, label: 'Solar-powered', desc: '100% renewable' },
              { icon: Shield, label: '2-year warranty', desc: 'Full coverage' },
              { icon: Wrench, label: 'Free installation', desc: 'Expert setup' },
              { icon: BatteryCharging, label: 'Long battery life', desc: 'Up to 12 hours' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#f5a623]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{item.label}</p>
                    <p className="text-xs text-white/50">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
