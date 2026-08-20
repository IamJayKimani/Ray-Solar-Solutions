import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/public/Home';
import Products from '../pages/public/Products';
import ProductDetails from '../pages/public/ProductDetails';
import ProviderDashboard from '../pages/provider/ProviderDashboard';
import ManageProviderProducts from '../pages/provider/ManageProducts';
import AddProduct from '../pages/provider/AddProduct';
import EditProduct from '../pages/provider/EditProduct';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Route>
      <Route path="/provider" element={<ProviderDashboard />} />
      <Route path="/provider/products" element={<ManageProviderProducts />} />
      <Route path="/provider/products/add" element={<AddProduct />} />
      <Route path="/provider/products/edit/:id" element={<EditProduct />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default AppRoutes;
