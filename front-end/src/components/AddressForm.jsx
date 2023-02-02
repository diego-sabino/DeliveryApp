import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import AppContext from '../context/AppContext';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';

export default function AddressForm() {
  const { setOrderCheckout, orderData } = useContext(AppContext);

  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [showSaveOption, setShowSaveOption] = useState(false);

  const totalPrice = getItemLocalStorage('totalPrice');
  const verifyPhone = phoneNumber && phoneNumber.length !== 0;
  const verifyNumber = number && number.length !== 0;

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

  const handleSave = () => {
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

    setOrderCheckout({ postData, phoneNumber });
  };

  useEffect(() => {
    const verifyInputs = () => {
      if (address !== '' && verifyNumber
         && verifyPhone
         && selectedSeller !== '') {
        setShowSaveOption(true);
      } else {
        setShowSaveOption(false);
      }
    };
    verifyInputs();
  }, [address,
    number,
    phoneNumber,
    selectedSeller,
    verifyNumber,
    verifyPhone]);

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
      className="flex flex-col px-4 gap-4 shadow-md py-2 pb-5 bg-white rounded-lg mb-5"
    >
      <p
        className="text-green-main text-lg font-semibold"
      >
        Detalhes e endereço de entrega
      </p>

      <label
        htmlFor="select-checkout"
        className="flex flex-col text-sm text-gray-500 mb-2"
      >
        Vendedor
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
        className="flex flex-col text-sm text-gray-500 mb-2"
      >
        Número de telefone
        <input
          type="tel"
          id="delivery-phone"
          name="phoneNumber"
          value={ phoneNumber }
          onChange={ handleChange }
          placeholder="Ex: (11) 91234-5678"
          className="border-b-[1px] border-slate-400
          py-2 text-black text-lg focus:outline-none"
          required
        />
      </label>

      <label
        htmlFor="delivery-city"
        className="flex flex-col text-sm text-gray-500 mb-2"
      >
        Cidade
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
        className="flex flex-col text-sm text-gray-500 mb-2"
      >
        Endereço
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
        className="flex flex-col text-sm text-gray-500 mb-2"
      >
        Número
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

      {
        (showSaveOption)
        && (
          <label
            htmlFor="save-address"
            className="flex text-sm text-gray-500 items-center gap-2 mb-2"
          >
            Salve este endereço
            <input
              type="checkbox"
              required
              id="save-address"
              onChange={ () => handleSave() }
              className="border-b-[1px] border-slate-400
          py-2 bg-transparent text-black text-lg focus:outline-none"
            />
          </label>
        )
      }
    </form>
  );
}
