import { useEffect, useState } from 'react';

import Menu from './Menu';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';
import logo from '../images/logo.png';

export default function NavbarAdm() {
  const [userData, setUserData] = useState(undefined);
  const [role, setRole] = useState('');

  useEffect(() => {
    const user = getItemLocalStorage('user');
    if (user) {
      setUserData(user);
      setRole(user.role);
    }
  }, []);

  return (
    <nav className="flex justify-between p-3 items-center">
      {
        (userData !== undefined)
          ? <Menu userData={ userData } role={ role } />
          : <div className="w-[24px] h-[24px]" />
      }

      <img
        src={ logo }
        alt="Bar do Lado logo"
        className="w-9 h-9"
      />
    </nav>
  );
}
