function ProviderSupport() {
  const support = [
    { title: 'Customer installation query', status: 'Waiting for reply' },
    { title: 'Inventory mismatch report', status: 'Resolved' },
  ];

  return (
    <div className="dashboard-shell container">
      <aside className="dashboard-sidebar">
        <h2>Provider</h2>
        <nav>
          <a href="/provider">Overview</a>
          <a href="/provider/products">Manage products</a>
          <a href="/provider/products/add">Add product</a>
          <a href="/provider/profile">Profile</a>
          <a href="/provider/support">Support</a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="page-heading">
          <div>
            <span className="eyebrow">Support desk</span>
            <h1>Inbox</h1>
          </div>
        </div>

        <div className="ticket-list">
          {support.map((item) => (
            <div className="ticket-item" key={item.title}>
              <div>
                <h3>{item.title}</h3>
                <p>Customer from Nairobi</p>
              </div>
              <span className="status-badge success">{item.status}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProviderSupport;
