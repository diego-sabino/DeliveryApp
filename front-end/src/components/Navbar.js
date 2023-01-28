import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FiLogOut } from 'react-icons/fi';
import { getItemLocalStorage, removeItemLocalStorage } from '../utils/LocalStorageUtil';
import getLocation from '../utils/OrdersUtil';

export default function Navbar() {
  const [userData, setUserData] = useState({});
  const [url, setUrl] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = getItemLocalStorage('user');
    if (user) {
      setUserData(user);
    }

    setUrl(getLocation(location.pathname));
  }, []);

  const handleLogout = () => {
    removeItemLocalStorage('user');
    navigate('/login');
  };

  return (
    <nav className="flex justify-between h-20 bg-[#036B52] uppercase items-stretch">
      <div
        className={ `flex ${(url === 'seller')
          ? 'hidden' : 'block'}` }
      >
        <Link
          to="/customer/products"
          className="bg-[#2FC18C] px-4 flex"
          data-testid="customer_products__element-navbar-link-products"
        >
          <span className="self-center uppercase">Products</span>
        </Link>

        <Link
          className="flex px-4 text-white"
          data-testid="customer_products__element-navbar-link-orders"
          to="/customer/orders"
        >
          <span className="self-center uppercase">My orders</span>
        </Link>
      </div>

      <div
        className={ `flex ${(url === 'seller')
          ? 'block' : 'hidden'}` }
      >
        <Link
          to="/seller/orders"
          className="bg-[#2FC18C] px-4 flex"
          data-testid="customer_products__element-navbar-link-orders"
        >
          <span className="self-center uppercase">Orders</span>
        </Link>
      </div>

      <div className="flex text-white">
        <div
          className="flex bg-[#421981] px-4"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          <p className=" self-center capitalize">{userData.name}</p>
        </div>

        <Link
          to="/"
          className="flex bg-[#056CF9] px-4"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ handleLogout }
        >
          <FiLogOut className="self-center text-xl" />
        </Link>
      </div>
    </nav>
  );
}
