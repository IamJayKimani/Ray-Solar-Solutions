function ProviderSupport() {
  const support = [
    { title: 'Customer installation query', status: 'Waiting for reply' },
    { title: 'Inventory mismatch report', status: 'Resolved' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#10162b] mb-8">Support</h1>
      <div className="space-y-4">
        {support.map((item) => (
          <div key={item.title} className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#10162b]">{item.title}</h3>
                <p className="text-xs text-[#4a5565] mt-0.5">Customer from Nairobi</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700">{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProviderSupport;
