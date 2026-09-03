import { Outlet } from 'react-router-dom';
import GlobalSidebar from '../components/layout/GlobalSidebar';
import BrandHeader from '../components/layout/BrandHeader';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#faf6ee]">
      <BrandHeader />
      <main className="ml-[72px] pt-[82px]">
        <Outlet />
      </main>
      <GlobalSidebar />
    </div>
  );
}
