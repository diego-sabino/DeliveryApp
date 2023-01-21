import { Route, Routes, BrowserRouter } from 'react-router-dom';
// import AppProvider from '../context/AppProvider';

import Login from '../screens/Login';
import Register from '../screens/Register';
import CustomerProducts from '../screens/CustomerProducts';

function AppRoute() {
  return (
    <BrowserRouter>
      {/* <AppProvider> */}
      <Routes>
        <Route path="/login" element={ <Login /> } exact />
        <Route path="/register" element={ <Register /> } exact />
        <Route path="/customer/products" element={ <CustomerProducts /> } exact />
      </Routes>
      {/* </AppProvider> */}
    </BrowserRouter>
  );
}

export default AppRoute;
