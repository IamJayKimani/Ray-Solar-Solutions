function Profile() {
  return (
    <div className="dashboard-shell container">
      <aside className="dashboard-sidebar">
        <h2>Customer</h2>
        <nav>
          <a href="/customer">Overview</a>
          <a href="/customer/orders">My orders</a>
          <a href="/customer/cart">Cart</a>
          <a href="/customer/support">Support</a>
          <a href="/customer/profile">Profile</a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="page-heading">
          <div>
            <span className="eyebrow">My profile</span>
            <h1>Account details</h1>
          </div>
        </div>

        <div className="profile-card">
          <label>
            <span>Full name</span>
            <input type="text" value="Crystal Mucheru" readOnly />
          </label>
          <label>
            <span>Email</span>
            <input type="email" value="crystal@raysolar.co" readOnly />
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

export default Profile;
