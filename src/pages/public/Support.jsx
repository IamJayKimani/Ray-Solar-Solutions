import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

function Support() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#10162b] text-white">
      <div className="max-w-[700px] mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-white/60 text-base leading-relaxed mb-10">
          Have a question about buying, selling, or verifying a product? Send us a message and the Ray Solar
          support team will respond within 24 hours.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-white/50 text-xs font-bold uppercase tracking-wide mb-2">Email</p>
            <a href="mailto:hello@raysolar.co" className="text-[#f5a623] font-semibold hover:underline">
              hello@raysolar.co
            </a>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-white/50 text-xs font-bold uppercase tracking-wide mb-2">Phone</p>
            <a href="tel:+254700000000" className="text-[#f5a623] font-semibold hover:underline">
              +254 700 000 000
            </a>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-white/50 text-xs font-bold uppercase tracking-wide mb-2">Location</p>
            <p className="font-semibold">Nairobi, Kenya</p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12">
            <CheckCircle size={48} className="mx-auto text-[#f5a623] mb-4" />
            <h2 className="text-xl font-bold mb-2">Message sent!</h2>
            <p className="text-white/60 text-sm mb-6">We&apos;ll get back to you within 24 hours.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 rounded-xl bg-[#f5a623] hover:bg-[#d9820b] text-white text-sm font-bold transition"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 text-left">
            <input
              type="text"
              placeholder="Your name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl bg-transparent border border-white/15 text-white text-sm placeholder-white/30 outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 transition"
            />
            <input
              type="email"
              placeholder="Your email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl bg-transparent border border-white/15 text-white text-sm placeholder-white/30 outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 transition"
            />
            <input
              type="text"
              placeholder="Subject"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl bg-transparent border border-white/15 text-white text-sm placeholder-white/30 outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 transition"
            />
            <textarea
              placeholder="How can we help?"
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl bg-transparent border border-white/15 text-white text-sm placeholder-white/30 outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 transition resize-none"
            />
            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#f5a623] hover:bg-[#d9820b] text-white text-sm font-bold transition"
              >
                <Send size={16} />
                Send message
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Support;
