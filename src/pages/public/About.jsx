import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';

function RevealSection({ children, className = '', delay = 0 }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`scroll-reveal${delay ? ` delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  );
}

const beliefs = [
  {
    num: '01',
    title: 'Affordable before premium',
    text: 'Nobody should choose between lighting their home and feeding their family. Every product is priced for real households, not luxury imports.',
  },
  {
    num: '02',
    title: 'The provider owns the quality',
    text: 'Every product listed is verified by the provider who stands behind it. No anonymous listings, no ghost sellers.',
  },
  {
    num: '03',
    title: 'Nothing is installed in the dark',
    text: 'Every order includes clear setup guidance and responsive support so your system works from day one.',
  },
  {
    num: '04',
    title: 'One platform for everything',
    text: 'Browse, buy, track and get support — all in one place. No phone calls, no middlemen, no guesswork.',
  },
];

const roles = [
  {
    title: 'Customers',
    text: 'Families, businesses and institutions looking for reliable solar lighting. They browse, order and track delivery in one place.',
    image: 'https://images.unsplash.com/photo-1668097613572-40b7c11c8727?w=600&h=400&fit=crop&q=80',
  },
  {
    title: 'Providers',
    text: 'Verified solar suppliers who list their products, manage inventory and grow their business through our marketplace.',
    image: 'https://plus.unsplash.com/premium_photo-1661409078904-42334551db0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW92ZXJzJTIwYW5kJTIwcGFja2Vyc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    title: 'Our Team',
    text: 'The people verifying products, supporting customers and making sure every installation delivers on its promise.',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGluc3RhbGxlcnN8ZW58MHx8MHx8fDA%3D',
  },
];

function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80"
            alt="Solar panels over Nairobi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10162b]/90 via-[#10162b]/40 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-16">
          <RevealSection>
            <span className="inline-block text-[#f5a623] text-xs font-bold uppercase tracking-widest mb-4">
              About Us
            </span>
          </RevealSection>
          <RevealSection delay={1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl" style={{ fontFamily: "'Fraunces', serif" }}>
              We built the solar platform we kept wishing existed.
            </h1>
          </RevealSection>
          <RevealSection delay={2}>
            <p className="text-lg text-white/75 max-w-2xl mt-6 leading-relaxed">
              Ray Solar Solutions is a solar energy marketplace for East Africa. It replaces the endless phone calls, uncertain pricing and unreliable suppliers with one platform where every side of a purchase can see what is happening.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* The Problem */}
      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <RevealSection>
            <span className="inline-block text-[#d9820b] text-xs font-bold uppercase tracking-widest mb-4">
              The Problem
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#10162b] leading-tight mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
              Getting solar is harder than it should be
            </h2>
            <p className="text-[#4a5565] leading-relaxed text-lg">
              Finding the right solar system for your home is rarely hard. Knowing what it will cost, who is selling it and whether it will actually work is the hard part — and it is usually solved with a sequence of phone calls, forwarded contacts and hope.
            </p>
          </RevealSection>
          <RevealSection delay={1}>
            <img
              src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80"
              alt="Solar installation in progress"
              className="w-full h-[420px] object-cover rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            />
          </RevealSection>
        </div>
      </section>

      {/* What We Believe */}
      <section className="bg-[#faf6ee] py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <RevealSection>
            <span className="inline-block text-[#d9820b] text-xs font-bold uppercase tracking-widest mb-4">
              What We Believe
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#10162b] mb-14" style={{ fontFamily: "'Fraunces', serif" }}>
              Four rules the platform follows
            </h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {beliefs.map((item, i) => (
              <RevealSection key={item.num} delay={i + 1}>
                <div className="bg-white rounded-2xl p-8 h-full">
                  <span className="text-[#d9820b] text-sm font-bold">{item.num}</span>
                  <h3 className="text-xl font-bold text-[#10162b] mt-3 mb-3">{item.title}</h3>
                  <p className="text-[#4a5565] leading-relaxed">{item.text}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who Uses It */}
      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <RevealSection>
          <span className="inline-block text-[#d9820b] text-xs font-bold uppercase tracking-widest mb-4">
            Who Uses It
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#10162b] mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
            Three roles, three different views
          </h2>
          <p className="text-[#4a5565] text-lg max-w-2xl mb-14">
            Everyone signs into the same platform and sees only what their role requires.
          </p>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, i) => (
            <RevealSection key={role.title} delay={i + 1}>
              <div>
                <img
                  src={role.image}
                  alt={role.title}
                  className="w-full h-72 object-cover rounded-2xl mb-6"
                />
                <h3 className="text-xl font-bold text-[#10162b] mb-2">{role.title}</h3>
                <p className="text-[#4a5565] leading-relaxed">{role.text}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#10162b] py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <RevealSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
              Ready to go solar?
            </h2>
            <p className="text-white/60 max-w-lg mx-auto mb-8 text-lg">
              Browse our range of solar solutions and start saving on energy costs today.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#f5a623] hover:bg-[#d9820b] text-white text-sm font-bold rounded-xl transition"
              >
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 hover:bg-white/10 text-white text-sm font-bold rounded-xl transition"
              >
                Create Account
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}

export default About;
