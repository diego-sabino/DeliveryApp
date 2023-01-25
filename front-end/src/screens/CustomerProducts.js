import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AppContext from '../context/AppContext';
import Navbar from '../components/Navbar';
import DrinkCard from '../components/DrinkCard';
import { setItemLocalStorage } from '../utils/LocalStorageUtil';

export default function CustomerProducts() {
  const { cart, setCart } = useContext(AppContext);

  const [isDisabled, setIsDisabled] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const minusOne = -1;

  const navigate = useNavigate();

  useEffect(() => {
    const getCartFromLocalStorage = () => {
      const cartList = JSON.parse(localStorage.getItem('cart'));

      if (cartList) {
        setCart(cartList);
      }
    };

    const fetchProducts = () => {
      axios.get('http://localhost:3001/customer/products')
        .then((response) => {
          console.log(response.data);
          setProductsList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchProducts();
    getCartFromLocalStorage();
  }, []);

  const handleClick = (drink) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.id === drink.id);
    if (index !== minusOne) {
      newCart[index].quantity += 1;
    } else {
      newCart.push({ ...drink, quantity: 1 });
    }
    setCart(newCart);
    setItemLocalStorage('cart', newCart);
  };

  const handleRemove = (drink) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.id === drink.id);
    if (index !== minusOne) {
      if (newCart[index].quantity > 1) {
        newCart[index].quantity -= 1;
      } else {
        newCart[index].quantity = 0;
      }
      setCart(newCart);
      if (newCart[index].quantity === 0) {
        newCart.splice(index, 1);
      }
      setItemLocalStorage('cart', newCart);
    }
  };

  useEffect(() => {
    const totalPriceReduce = cart
      .reduce((acc, drink) => acc + (drink.price * drink.quantity), 0);
    if (totalPriceReduce > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    setTotalPrice(totalPriceReduce);
  }, [cart]);

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div
          className="mt-6 grid grid-cols-1
          gap-y-10 gap-x-6 "
        >
          {productsList.map((drink, index) => (
            <DrinkCard
              key={ index }
              drink={ drink }
              handleClick={ () => handleClick(drink) }
              handleRemove={ () => handleRemove(drink) }
            />
          ))}
        </div>

        <button
          className="
          bg-blue-500 hover:bg-blue-700
          text-white font-bold py-2 px-4
          rounded top-24 right-0 fixed"
          type="button"
          onClick={ () => navigate('/customer/checkout') }
          data-testid="customer_products__button-cart"
          disabled={ isDisabled }
        >
          <p
            data-testid="customer_products__checkout-bottom-value"
          >
            {`R$ ${totalPrice.toFixed(2).replace('.', ',')}`}

          </p>
        </button>
      </div>
    </div>

  );
}
