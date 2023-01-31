import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AppContext from '../context/AppContext';
import Navbar from '../components/Navbar';
import TableCheckout from '../components/TableCheckout';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';
import { statusCreated } from '../utils/LoginUtil';

export default function CustomerCheckout() {
  const { cart, setCart, orderData, setOrderData } = useContext(AppContext);

  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const cartList = getItemLocalStorage('cart');
    setOrderData(cartList);

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
  }, [cart]);

  useEffect(() => {
    if (address && number && selectedSeller && cart.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [address, number, selectedSeller, cart]);

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

  function Reset() {
    setAddress('');
    setNumber('');
    setSelectedSeller(sellers[0].id);
    const dropDown = document.getElementById('select-checkout');
    dropDown.selectedIndex = 0;
  }

  const handleSelect = (event) => {
    setSelectedSeller(event.target.value);
  };

  const userData = getItemLocalStorage('user');

  const handleSubmit = (e) => {
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

    e.preventDefault();
    axios.post('http://localhost:3001/sales', postData, {
      headers: {
        Authorization: userData.token,
      },
    })
      .then((response) => {
        if (response.status === statusCreated) {
          localStorage.removeItem('cart');
          setCart([]);
          Reset();
          navigate(`/customer/orders/${response.data.id}`);
        }
      }).catch((error) => {
        console.log(error);
        Reset();
      });
  };

  useEffect(() => {
    const totalPriceReduce = cart
      .reduce((acc, drink) => acc + (drink.price * drink.quantity), 0);
    setTotalPrice(totalPriceReduce);
  }, [cart]);

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
            htmlFor="select-checkout"
            className="flex flex-col"
          >
            Seller
            <select
              name="cars"
              id="select-checkout"
              className="border-2 border-slate-400 p-2 rounded"
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
              required
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
              required
            />
          </label>

          <button
            type="submit"
            className="text-white bg-[#036B52] w-40 rounded uppercase disabled:opacity-50"
            data-testid="customer_checkout__button-submit-order"
            disabled={ isDisabled }
          >
            finalize order
          </button>
        </form>
      </main>
    </div>
  );
}
