import { NavLink, Outlet } from 'react-router-dom';
import BrandHeader from '../components/layout/BrandHeader';

function AdminLayout() {
  return (
    <>
      <BrandHeader />
      <div className="dashboard-shell container">
        <aside className="dashboard-sidebar">
          <h2>Admin</h2>
          <nav>
            <NavLink to="/admin">Overview</NavLink>
            <NavLink to="/admin/users">Manage users</NavLink>
            <NavLink to="/admin/providers">Manage providers</NavLink>
            <NavLink to="/admin/products">Manage products</NavLink>
          </nav>
        </aside>

        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AdminLayout;
