import { useContext, useEffect, useState } from 'react';

import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

import AppContext from '../context/AppContext';
import Navbar from '../components/Navbar.jsx';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';
import PaymentSection from '../components/PaymentSection';
import Confirmation from '../components/Confirmation';

const three = 3;

export default function CustomerCheckout() {
  const { cart,
    setOrderData,
    orderCheckout, cardNumber,
    payment } = useContext(AppContext);

  const [component, setComponent] = useState(0);

  useEffect(() => {
    const cartList = getItemLocalStorage('cart');
    setOrderData(cartList);
  }, [cart]);

  const creditCartOption = payment === 'credit-card' || payment === 'debit-card';

  const handleNext = component === 1 && payment === '';
  const handlePrevious = component === 2 && !cardNumber && creditCartOption;

  return (
    <div className=" bg-slate-50 h-screen">
      <Navbar />

      <main className="px-4 py-2">
        {component === 0 && <AddressForm />}
        {component === 1 && <PaymentForm />}
        {component === 2 && <PaymentSection />}
        {component === three && <Confirmation />}
      </main>

      {
        (component < three)
        && (
          <div className="flex items-center justify-center gap-2 bottom-0">
            <button
              disabled={ component <= 0 }
              type="button"
              onClick={ () => setComponent(component - 1) }
              className=" text-white
            bg-green-main
            focus:ring-4 focus:outline-none
            drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]uppercase disabled:bg-[#ced7d3]
            disabled:text-[#ffffff]
            disabled:cursor-not-allowed
            focus:ring-primary-300 rounded-[15px] text-base
            p-2 text-center flex items-center gap-1 justify-center"
            >
              <MdNavigateBefore className="text-white text-lg" />
              Anterior
            </button>
            <button
              disabled={ orderCheckout === null
                || handleNext || component > three || handlePrevious }
              type="button"
              onClick={ () => setComponent(component + 1) }
              className=" text-white
                bg-green-main
                focus:ring-4 focus:outline-none
                drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]uppercase disabled:bg-[#ced7d3]
                disabled:text-[#ffffff]
                disabled:cursor-not-allowed
                focus:ring-primary-300 rounded-[15px] text-base
                p-2 text-center flex items-center gap-1 justify-center"
            >
              Próximo
              <MdNavigateNext className="text-white text-lg" />
            </button>
          </div>
        )
      }
    </div>
  );
}
