function ProviderProfile() {
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
            <span className="eyebrow">Business profile</span>
            <h1>Provider information</h1>
          </div>
        </div>

        <div className="profile-card">
          <label>
            <span>Business name</span>
            <input type="text" value="Sunrise Electric Ltd" readOnly />
          </label>
          <label>
            <span>Contact email</span>
            <input type="email" value="sales@sunriseelectric.co" readOnly />
          </label>
          <label>
            <span>Location</span>
            <input type="text" value="Nairobi, Kenya" readOnly />
          </label>
        </div>
      </main>
    </div>
  );
}

export default ProviderProfile;
