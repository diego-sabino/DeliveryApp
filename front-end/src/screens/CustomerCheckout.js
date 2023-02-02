import { useContext, useEffect, useState } from 'react';

import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

import AppContext from '../context/AppContext';
import Navbar from '../components/Navbar.jsx';
import { getItemLocalStorage, setItemLocalStorage } from '../utils/LocalStorageUtil';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';
import PaymentSection from '../components/PaymentSection';

export default function CustomerCheckout() {
  const { cart,
    setOrderData,
    payment,
    setPayment } = useContext(AppContext);

  const [totalPrice, setTotalPrice] = useState(0);
  const [component, setComponent] = useState(0);

  useEffect(() => {
    const cartList = getItemLocalStorage('cart');
    setOrderData(cartList);
  }, [cart]);

  // function Reset() {
  //   setAddress('');
  //   setNumber('');
  //   setSelectedSeller(sellers[0].id);
  //   const dropDown = document.getElementById('select-checkout');
  //   dropDown.selectedIndex = 0;
  // }

  // componente de confirmação do pedi

  //   e.preventDefault();
  //   axios.post('http://localhost:3001/sales', postData, {
  //     headers: {
  //       Authorization: userData.token,
  //     },
  //   })
  //     .then((response) => {
  //       if (response.status === statusCreated) {
  //         localStorage.removeItem('cart');
  //         setCart([]);
  //         Reset();
  //         navigate(`/customer/orders/${response.data.id}`);
  //       }
  //     }).catch((error) => {
  //       console.log(error);
  //       Reset();
  //     });
  // };

  useEffect(() => {
    const totalPriceReduce = cart
      .reduce((acc, drink) => acc + (drink.price * drink.quantity), 0);
    setTotalPrice(totalPriceReduce);
    // setItemLocalStorage('totalPrice', totalPriceReduce);
  }, [cart]);

  return (
    <div>
      <Navbar />

      <main className="p-4">
        {component === 0 && <AddressForm />}
        {component === 1 && <PaymentForm />}
        {component === 2 && <PaymentSection />}
      </main>

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
          disabled={ component >= 3 || payment === '' }
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
    </div>
  );
}
