import { useContext, useEffect, useState } from 'react';

import { BiUserCircle } from 'react-icons/bi';
import { BsTelephone } from 'react-icons/bs';
import { RiMapPinLine } from 'react-icons/ri';

import axios from 'axios';
import AppContext from '../context/AppContext';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';
import { statusCreated } from '../utils/LoginUtil';
import SuccessModal from './SucessModal';

export default function Confirmation() {
  const { payment, orderCheckout,
    setCart, showModal, setShowModal } = useContext(AppContext);
  const [method, setMethod] = useState([]);
  const [orderId, setOrderId] = useState();

  const user = getItemLocalStorage('user');
  const { deliveryAddress, deliveryNumber, totalPrice } = orderCheckout.postData;

  useEffect(() => {
    if (payment === 'credit-card') {
      setMethod('Cartão de crédito');
    } else if (payment === 'debit-card') {
      setMethod('Cartão de débito');
    } else if (payment === 'pix-option') {
      setMethod('Pix');
    } else {
      setMethod('Pagamento na entrega');
    }
  }, [payment]);

  const handlePost = () => {
    axios.post('http://localhost:3001/sales', orderCheckout.postData, {
      headers: {
        Authorization: user.token,
      },
    })
      .then((response) => {
        if (response.status === statusCreated) {
          localStorage.removeItem('cart');
          setCart([]);
          setOrderId(response.data.id);
          setShowModal(true);
        }
      }).catch((error) => {
        console.log(error);
      });
  };

  if (showModal) {
    return <SuccessModal orderId={ orderId } />;
  }
  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="shadow-md p-2 bg-white rounded-lg">
        <p className="text-green-main font-bold">Endereço de entrega</p>

        <ul>
          <li className="flex gap-2 items-center py-2">
            <BiUserCircle className="text-xl" />
            <p>{user.name}</p>
          </li>

          <li className="flex gap-2 items-center py-2">
            <RiMapPinLine className="text-xl" />
            <p>
              {`${deliveryAddress},
              ${deliveryNumber}`}
            </p>
          </li>

          <li className="flex gap-2 items-center py-2">
            <BsTelephone className="text-xl" />
            <p>{orderCheckout.phoneNumber}</p>
          </li>
        </ul>

      </div>

      <div className="shadow-md p-2 bg-white rounded-lg">
        <p className="text-green-main font-bold">Pagamento</p>
        <p>{method}</p>
      </div>

      <div
        className="flex font-bold items-center
      shadow-md p-2 bg-white rounded-lg justify-between"
      >
        <p>Valor total</p>
        <p className="text-lg">{`R$ ${totalPrice.toFixed(2).replace('.', ',')}`}</p>
      </div>

      <button
        type="button"
        onClick={ () => handlePost() }
        className=" text-white
          bg-green-main
          focus:ring-4 focus:outline-none
          drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]uppercase disabled:bg-[#ced7d3]
          focus:ring-primary-300 rounded-[15px] text-base
          p-2 text-center flex items-center gap-1 justify-center"
      >
        Confirmar pedido

      </button>
    </div>
  );
}
