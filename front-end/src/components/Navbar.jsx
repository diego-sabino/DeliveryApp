import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { CiUser } from 'react-icons/ci';
import { FiShoppingBag } from 'react-icons/fi';

import { getItemLocalStorage } from '../utils/LocalStorageUtil';
import { getLocation } from '../utils/OrdersUtil';
import Menu from './Menu';
import AppContext from '../context/AppContext';
import logo from '../images/logo.png';

export default function Navbar() {
  const { setOpen, orderData, totalPrice } = useContext(AppContext);

  const [isDisabled, setIsDisabled] = useState(true);
  const [userData, setUserData] = useState(undefined);
  const [role, setRole] = useState('');

  const location = useLocation();
  const customerCheckout = location.pathname === '/customer/checkout';

  useEffect(() => {
    const user = getItemLocalStorage('user');
    if (user) {
      setUserData(user);
    }

    setRole(getLocation(location.pathname));
  }, []);

  useEffect(() => {
    if (orderData && orderData.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [orderData]);

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

      { (userData !== undefined && !customerCheckout)
        ? (
          <button
            type="button"
            className={ `text-gray-500 hover:text-gray-600
              focus:outline-none 
              focus:text-gray-600 flex text-xs gap-2
               ${(location.pathname === '/customer/orders') ? 'hidden' : 'block'}` }
            onClick={ () => setOpen(true) }
            disabled={ isDisabled }
          >
            <FiShoppingBag className="self-center text-xl text-black" />
            <div>
              <p>
                {`R$ ${totalPrice.toFixed(2).replace('.', ',')}`}
              </p>
              {console.log(totalPrice)}
              <span>{(orderData) ? `${orderData.length} itens` : '0 itens' }</span>
            </div>
          </button>)
        : (!customerCheckout)
        && <Link to="/login"><CiUser className="self-center text-3xl" /></Link>}
    </nav>
  );
}
