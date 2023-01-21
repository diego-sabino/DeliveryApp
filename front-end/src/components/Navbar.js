import { useNavigate } from 'react-router-dom';

import { FiLogOut } from 'react-icons/fi';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className="flex justify-between h-20 bg-[#036B52] uppercase items-stretch">
      <div className="flex">
        <button
          type="button"
          className="bg-[#2FC18C] px-4 flex"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ () => navigate('/customer/products') }
        >
          <span className="self-center uppercase">products</span>
        </button>

        <button
          type="button"
          className="flex px-4 text-white"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => navigate('/customer/orders') }
        >
          <span className="self-center uppercase">My orders</span>
        </button>
      </div>

      <div className="flex text-white">
        <div
          className="flex bg-[#421981] px-4"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          <p className=" self-center">Cleiton Domingos</p>
        </div>

        <button
          type="button"
          className="flex bg-[#056CF9] px-4"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ handleLogout }
        >
          <FiLogOut className="self-center text-xl" />
        </button>
      </div>
    </nav>
  );
}
