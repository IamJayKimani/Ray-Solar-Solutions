export default function Footer() {
  return (
    <footer className="bg-[#10162B] text-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-2xl font-serif text-white">Ray Solar</h3>
          <p className="mt-3 text-gray-300">Reliable solar lighting for homes, businesses and communities.</p>
        </div>

        <div>
          <h4 className="font-semibold text-white uppercase tracking-wider">Explore</h4>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>Home</li>
            <li>Products</li>
            <li>Support</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white uppercase tracking-wider">Contact</h4>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>hello@raysolar.co</li>
            <li>+254 713 144 675</li>
            <li>Nairobi, Kenya</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
