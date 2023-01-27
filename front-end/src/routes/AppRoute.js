import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import AppProvider from '../context/AppProvider';

import Login from '../screens/Login';
import Register from '../screens/Register';
import CustomerProducts from '../screens/CustomerProducts';
import CustomerCheckout from '../screens/CustomerCheckout';
import CustomerOrders from '../screens/CustomerOrders';
import AdminManager from '../screens/AdminManager';
import OrderDetails from '../screens/OrderDetails';
import SellerOrders from '../screens/SellerOrders';

function AppRoute() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={ <Navigate to="/login" /> } />
          <Route path="/admin/manage" element={ <AdminManager /> } exact />
          <Route path="/customer/checkout" element={ <CustomerCheckout /> } exact />
          <Route path="/customer/products" element={ <CustomerProducts /> } exact />
          <Route path="/customer/orders" element={ <CustomerOrders /> } exact />
          <Route path="/customer/orders/:id" element={ <OrderDetails /> } exact />
          <Route path="/login" element={ <Login /> } exact />
          <Route path="/register" element={ <Register /> } exact />
          <Route path="/seller/orders" element={ <SellerOrders /> } exact />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default AppRoute;
