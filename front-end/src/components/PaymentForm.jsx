import { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPix } from '@fortawesome/free-brands-svg-icons';

import { BsCreditCard2Back, BsCreditCard2BackFill } from 'react-icons/bs';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import AppContext from '../context/AppContext';

export default function PaymentForm() {
  const { setPayment } = useContext(AppContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit');
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setPayment(value);
  };

  return (
    <form
      onSubmit={ handleSubmit }
      className="flex flex-col px-4"
    >

      <p
        className="text-green-main text-xl font-semibold"
      >
        Selecione o seu método de pagamento

      </p>
      <div id="qrcode" />

      <div className="flex flex-col gap-8 p-5 shadow-xl rounded-lg">
        <label
          htmlFor="cash-option"
          className="flex justify-between text-lg items-center"
        >
          <div className="flex gap-2 items-center">
            <MdOutlineDeliveryDining className=" text-3xl" />
            Pagamento na entrega
          </div>
          <input
            onChange={ (e) => handleChange(e) }
            type="radio"
            id="cash-option"
            name="option"
            className="w-4 h-4"
            value="cash-option"
          />
        </label>

        <label
          htmlFor="pix-option"
          className="flex justify-between text-lg items-center"
        >
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={ faPix } />
            Pix
          </div>

          <input
            onChange={ (e) => handleChange(e) }
            type="radio"
            id="pix-option"
            name="option"
            className="w-4 h-4"
            value="pix-option"
          />
        </label>

        <label
          htmlFor="credit-card"
          className="flex justify-between text-lg items-center"
        >
          <div className="flex gap-2 items-center">
            <BsCreditCard2Back className=" text-3xl" />
            Cartão de crédito
          </div>

          <input
            onChange={ (e) => handleChange(e) }
            type="radio"
            id="credit-card"
            name="option"
            className="w-4 h-4"
            value="credit-card"
          />
        </label>

        <label
          htmlFor="debit-card"
          className="flex justify-between text-lg items-center"
        >
          <div className="flex gap-2 items-center">
            <BsCreditCard2BackFill className=" text-3xl" />
            Cartão de débito
          </div>

          <input
            onChange={ (e) => handleChange(e) }
            type="radio"
            id="debit-card"
            name="option"
            className="w-4 h-4"
            value="debit-card"
          />
        </label>
      </div>
    </form>
  );
}
