import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { CiUser } from 'react-icons/ci';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';
import { getLocation } from '../utils/OrdersUtil';
import Menu from './Menu';

export default function Navbar() {
  const [userData, setUserData] = useState(undefined);
  const [role, setRole] = useState('');

  const location = useLocation();

  useEffect(() => {
    const user = getItemLocalStorage('user');
    if (user) {
      setUserData(user);
    }

    setRole(getLocation(location.pathname));
  }, []);

  return (
    <nav className="flex justify-between p-3 items-center">
      {
        (userData !== undefined)
          ? <Menu userData={ userData } role={ role } />
          : <div className="w-[24px] h-[24px]" />
      }

      <p>LOGO AQUI</p>

      {
        (userData !== undefined)
          ? <div className="w-[24px] h-[24px]" />
          : <Link to="/login"><CiUser className="self-center text-3xl" /></Link>
      }

    </nav>
  );
}
