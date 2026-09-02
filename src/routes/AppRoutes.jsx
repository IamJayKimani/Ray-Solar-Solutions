import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import Home from '../pages/public/Home';
import Products from '../pages/public/Products';
import ProductDetails from '../pages/public/ProductDetails';
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import ProviderDashboard from '../pages/provider/ProviderDashboard';
import ManageProviderProducts from '../pages/provider/ManageProducts';
import AddProduct from '../pages/provider/AddProduct';
import EditProduct from '../pages/provider/EditProduct';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageProviders from '../pages/admin/ManageProviders';
import ManageProducts from '../pages/admin/ManageProducts';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import AccountSelection from '../pages/auth/AccountSelection';

const ROLE_KEY = 'ray-solar-role';

function getStoredRole() {
  return localStorage.getItem(ROLE_KEY) || '';
}

function ProtectedRoleRoute({ allowedRoles, children }) {
  const role = getStoredRole();

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/account-selection" replace />;
  }

  return children;
}

// Person 6 (Admin) Import
import AdminDashboard from '../pages/admin/AdminDashboard';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Route>

      <Route path="/account-selection" element={<AccountSelection />} />

      <Route
        path="/customer"
        element={
          <ProtectedRoleRoute allowedRoles={['customer']}>
            <CustomerDashboard />
          </ProtectedRoleRoute>
        }
      />

      <Route
        path="/provider"
        element={
          <ProtectedRoleRoute allowedRoles={['provider']}>
            <ProviderDashboard />
          </ProtectedRoleRoute>
        }
      />
      <Route
        path="/provider/products"
        element={
          <ProtectedRoleRoute allowedRoles={['provider']}>
            <ManageProviderProducts />
          </ProtectedRoleRoute>
        }
      />
      <Route
        path="/provider/products/add"
        element={
          <ProtectedRoleRoute allowedRoles={['provider']}>
            <AddProduct />
          </ProtectedRoleRoute>
        }
      />
      <Route
        path="/provider/products/edit/:id"
        element={
          <ProtectedRoleRoute allowedRoles={['provider']}>
            <EditProduct />
          </ProtectedRoleRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoleRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoleRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoleRoute allowedRoles={['admin']}>
            <ManageUsers />
          </ProtectedRoleRoute>
        }
      />
      <Route
        path="/admin/providers"
        element={
          <ProtectedRoleRoute allowedRoles={['admin']}>
            <ManageProviders />
          </ProtectedRoleRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoleRoute allowedRoles={['admin']}>
            <ManageProducts />
          </ProtectedRoleRoute>
        }
      />

      <Route path="/provider" element={<ProviderDashboard />} />
      <Route path="/provider/products" element={<ManageProviderProducts />} />
      <Route path="/provider/products/add" element={<AddProduct />} />
      <Route path="/provider/products/edit/:id" element={<EditProduct />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/providers" element={<ManageProviders />} />
        <Route path="/admin/products" element={<ManageProducts />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Person 6 (Admin) Route */}
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default AppRoutes;