import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import { MdNavigateNext } from 'react-icons/md';

import AppContext from '../context/AppContext';

export default function AddressForm() {
  const { setOrderCheckout, cart, orderData } = useContext(AppContext);

  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const fetchSallers = () => {
      axios.get('http://localhost:3001/seller')
        .then((response) => {
          setSellers(response.data);
          setSelectedSeller(response.data[0].id);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchSallers();
  }, []);

  const handleSelect = (event) => {
    setSelectedSeller(event.target.value);
  };

  const handleSubmit = () => {
    const userData = getItemLocalStorage('user');
    const order = orderData
      .map((product) => ({ product_id: product.id, quantity: product.quantity }));

    const postData = {
      userId: userData.id,
      sellerId: selectedSeller,
      totalPrice,
      deliveryAddress: address,
      deliveryNumber: number,
      status: 'Pendente',
      order,
    };

    setOrderCheckout(postData);
  };

  useEffect(() => {
    if (address && number && selectedSeller) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [address, number, selectedSeller]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
    case 'address':
      setAddress(value);
      break;
    case 'number':
      setNumber(value);
      break;
    case 'phoneNumber':
      setPhoneNumber(value);
      break;
    default:
      break;
    }
  };

  return (
    <form
      onSubmit={ handleSubmit }
      className="flex flex-col px-4 gap-12"
    >

      <p
        className="text-green-main text-2xl font-semibold"
      >
        Details and Delivery address

      </p>

      <label
        htmlFor="select-checkout"
        className="flex flex-col text-sm text-gray-500"
      >
        Seller
        <select
          name="cars"
          id="select-checkout"
          className="border-b-[1px] border-slate-400
          py-2 bg-transparent text-black text-lg focus:outline-none"
          onChange={ handleSelect }
          data-testid="customer_checkout__select-seller"
          required
        >
          {
            sellers.map((seller, index) => (
              <option
                key={ index }
                name="selectedSeller"
                value={ seller.id }
              >
                {seller.name}

              </option>
            ))
          }
        </select>
      </label>

      <label
        htmlFor="delivery-phone"
        className="flex flex-col text-sm text-gray-500"
      >
        Phone number
        <input
          type="tel"
          id="delivery-phone"
          name="phone"
          placeholder="Ex: (11) 91234-5678"
          className="border-b-[1px] border-slate-400
          py-2 text-black text-lg focus:outline-none"
          required
        />
      </label>

      <label
        htmlFor="delivery-city"
        className="flex flex-col text-sm text-gray-500"
      >
        City
        <input
          type="text"
          id="delivery-city"
          name="city"
          placeholder="Ex: São Paulo"
          className="border-b-[1px] border-slate-400
          py-2 text-black text-lg focus:outline-none"
          required
        />
      </label>

      <label
        htmlFor="delivery-address"
        className="flex flex-col text-sm text-gray-500"
      >
        Address
        <input
          type="text"
          data-testid="customer_checkout__input-address"
          id="delivery-address"
          name="address"
          value={ address }
          onChange={ handleChange }
          placeholder="Ex: Travessa Terceira da Castanheira, Bairro Muruci"
          className="border-b-[1px] border-slate-400
          py-2 text-black text-lg focus:outline-none"
          required
        />
      </label>

      <label
        htmlFor="delivery-number"
        className="flex flex-col text-sm text-gray-500"
      >
        Number
        <input
          type="text"
          data-testid="customer_checkout__input-address-number"
          id="delivery-number"
          name="number"
          value={ number }
          onChange={ handleChange }
          placeholder="Ex: 193"
          className="border-b-[1px] border-slate-400
          py-2 text-black text-lg focus:outline-none"
          required
        />
      </label>
    </form>
  );
}
