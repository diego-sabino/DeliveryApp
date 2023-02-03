import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

import { AiOutlineUserAdd } from 'react-icons/ai';
import { BiShoppingBag, BiStore } from 'react-icons/bi';
import { CiLogin } from 'react-icons/ci';
import { RiFileUserLine } from 'react-icons/ri';

import avatar from '../../images/avatar.png';
import { removeItemLocalStorage } from '../../utils/LocalStorageUtil';

function Menu({ userData, role }) {
  const [firstName, setFirstname] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const name = userData.name.slice(0, userData.name.lastIndexOf(' '));
    setFirstname(name);
  }, []);

  const handleLogout = () => {
    removeItemLocalStorage('user');
    navigate('/');
  };

  const handleNavigate = () => {
    if (role === 'seller') {
      navigate('/seller/orders');
    } else {
      navigate('/customer/orders');
    }
  };

  return (
    <div className="hamburger-menu w-[70px]">
      <input id="menu__toggle" type="checkbox" />
      <label className="menu__btn mt-[9px] ml-[-2px]" htmlFor="menu__toggle">
        <span />
      </label>

      <ul className="menu__box flex flex-col text-white">
        <li className="p-4">
          <div className="flex">
            <img
              src={ avatar }
              alt="user avatar"
              className="w-[100px] rounded-md"
            />
            <div className="p-2 text-white">
              <p>{`Olá, ${firstName}!`}</p>
              <p className="text-xs lowercase mb-4">{userData.email}</p>
              <Link
                to="/profile"
                className="bg-white w-full py-2 px-4
                  rounded-full text-black text-center mt-7 text-sm"
              >
                Ver perfil
              </Link>
            </div>
          </div>
        </li>

        <li
          className={ ` py-4 uppercase border-t-[.5px]
          border-y-slate-400 w-full ${(role !== 'customer') ? 'hidden' : 'block'}` }
        >
          <button
            onClick={ () => navigate('/customer/products') }
            type="button"
            className="flex items-center uppercase w-full justify-center"
          >
            <BiStore className="text-lg" />
            <p className="ml-2">Produtos</p>
          </button>
        </li>

        <li
          className={ `py-4 uppercase border-t-[.5px]
          border-y-slate-400 w-full ${(role !== 'administrator' ? 'block' : 'hidden')}` }
        >
          <button
            onClick={ () => handleNavigate() }
            type="button"
            className="flex items-center uppercase
             w-full justify-center"
          >
            <BiShoppingBag className="text-lg" />
            <p className="ml-2">
              {(role === 'seller')
                ? 'Minhas vendas'
                : 'Meus pedidos'}

            </p>
          </button>
        </li>

        <li
          className={ `py-4 uppercase border-t-[.5px]
          border-y-slate-400 w-full ${(role === 'administrator' ? 'block' : 'hidden')}` }
        >
          <button
            onClick={ () => navigate('/admin/manage') }
            type="button"
            className="flex items-center uppercase
             w-full justify-center"
          >
            <RiFileUserLine className="text-lg" />
            <p className="ml-2">Usuários</p>
          </button>
        </li>

        <li
          className={ `py-4 uppercase border-t-[.5px]
          border-y-slate-400 w-full ${(role === 'administrator' ? 'block' : 'hidden')}` }
        >
          <button
            onClick={ () => navigate('/admin/products') }
            type="button"
            className="flex items-center uppercase
             w-full justify-center"
          >
            <AiOutlineUserAdd className="text-lg" />
            <p className="ml-2">Produtos</p>
          </button>
        </li>

        <li
          className="py-4 border-y-[.5px] border-y-slate-400 w-full"
        >
          <button
            onClick={ () => handleLogout() }
            type="button"
            className="flex items-center uppercase w-full justify-center"
          >
            <CiLogin />
            <p className="ml-2">Sair</p>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Menu;

Menu.propTypes = {
  userData: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    fullName: PropTypes.string,
  }).isRequired,
  role: PropTypes.string.isRequired,
};
