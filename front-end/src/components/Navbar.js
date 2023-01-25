import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FiLogOut } from 'react-icons/fi';
import { getItemLocalStorage, removeItemLocalStorage } from '../utils/LocalStorageUtil';

export default function Navbar() {
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const user = getItemLocalStorage('user');
    if (user) {
      setUserData(user);
    }
  }, []);

  const handleLogout = () => {
    removeItemLocalStorage('user');
    navigate('/login');
  };

  return (
    <nav className="flex justify-between h-20 bg-[#036B52] uppercase items-stretch">
      <div className="flex">
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
