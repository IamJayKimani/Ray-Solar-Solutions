import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function DashboardLayout({ role, navLinks }) {
  return (
    <div className="dashboard-shell container">
      <Sidebar role={role} links={navLinks} />
      <div className="dashboard-main">
        <Navbar role={role} />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
