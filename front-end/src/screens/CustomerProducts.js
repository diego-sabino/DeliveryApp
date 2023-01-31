import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AppContext from '../context/AppContext';
import Navbar from '../components/Navbar.jsx';
import DrinkCard from '../components/DrinkCard';
import { setItemLocalStorage } from '../utils/LocalStorageUtil';

export default function CustomerProducts() {
  const { cart, setCart, totalPrice, setTotalPrice } = useContext(AppContext);

  const [isDisabled, setIsDisabled] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [search, setSearch] = useState('');
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
          setProductsList(response.data);
          const filterData = response.data
            .filter((drink) => drink.name.toLowerCase()
              .includes(search.toLowerCase()));
          if (search) {
            setProductsList(filterData);
          }
          if (search && filterData.length === 0) {
            setNotFound(true);
          } else {
            setNotFound(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchProducts();
    getCartFromLocalStorage();
  }, [search, setCart]);

  const handleSearch = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

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

      <main className="px-4 py-2">
        <div className="w-full">
          <p className="text-gray-400">Our products</p>
          <p className="text-green-main text-2xl font-semibold">Special for you</p>
          <input
            className="bg-slate-50 focus:outline-none focus:shadow-outline
        border border-gray-300 rounded py-2 px-4 block w-full
        appearance-none leading-normal mt-3"
            onChange={ handleSearch }
            type="text"
            placeholder="Search for a product"
          />
        </div>

        <div
          className="mt-6 w-full flex flex-wrap justify-center"
        >
          {notFound && <h2>No results found</h2>}
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
          text-white font-bold py-2 px-4 rounded
          bottom-0 fixed"
          type="button"
          onClick={ () => navigate('/customer/checkout') }
          data-testid="customer_products__button-cart"
          disabled={ isDisabled }
        >
          <p data-testid="customer_products__checkout-bottom-value">
            {`R$ ${totalPrice.toFixed(2).replace('.', ',')}`}
          </p>
        </button>
      </main>
    </div>
  );
}
