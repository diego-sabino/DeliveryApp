import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AppContext from '../context/AppContext';
import Navbar from '../components/Navbar';
import TableCheckout from '../components/TableCheckout';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';

export default function CustomerCheckout() {
  const { cart } = useContext(AppContext);

  const [orderData, setOrderData] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const cartList = getItemLocalStorage('cart');
    setOrderData(cartList);

    const fetchSallers = () => {
      axios.get('http://localhost:3001/seller')
        .then((response) => {
          setSellers(response.data);
          setSelectedSeller(response.data[0].name);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchSallers();
  }, [cart]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
    case 'address':
      setAddress(value);
      break;
    case 'number':
      setNumber(value);
      break;
    default:
      break;
    }
  };

  const handleSelect = (event) => {
    setSelectedSeller(event.target.value);
  };

  const handleSubmit = () => {
    axios.post('http://localhost:3001/orders', {
      seller: selectedSeller,
      address,
      number,
      orderData,
    }).then((response) => {
      console.log(response);
      navigate(`/customer/orders/${response.data.id}}`);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div>
      <Navbar />

      <main className="p-4">
        <p className="text-lg font-bold ">Checkout</p>
        <TableCheckout orderData={ orderData } />

        <p className="text-lg font-bold mt-6 ">Details and Delivery address</p>
        <form
          onSubmit={ handleSubmit }
          className="flex flex-wrap border-2 border-gray-300 p-4 gap-3"
        >
          <label
            htmlFor="seller-checkout"
            className="flex flex-col"
          >
            Seller
            <select
              name="cars"
              id="seller-checkout"
              className="border-2 border-slate-400 p-2 rounded"
              onChange={ handleSelect }
              data-testid="customer_checkout__select-seller"
            >
              {
                sellers.map((seller, index) => (
                  <option
                    key={ index }
                    name="selectedSeller"
                    value={ seller.name }
                  >
                    {seller.name}

                  </option>
                ))
              }
            </select>
          </label>

          <label
            htmlFor="delivery-address"
            className="flex flex-col"
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
              className="border-2 border-slate-400 rounded p-2"
            />
          </label>

          <label
            htmlFor="delivery-number"
            className="flex flex-col"
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
              className="border-2 border-slate-400 rounded p-2"
            />
          </label>

          <button
            type="submit"
            className="text-white bg-[#036B52] w-40 rounded uppercase"
            data-testid="customer_checkout__button-submit-order"
          >
            finalize order
          </button>
        </form>
      </main>
    </div>
  );
}
