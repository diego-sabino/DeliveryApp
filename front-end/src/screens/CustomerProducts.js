import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import Navbar from '../components/Navbar';
import drinks from '../mocks/DrinkMock';
import DrinkCard from '../components/DrinkCard';

export default function CustomerProducts() {
  const { cart, setCart } = useContext(AppContext);
  const minusOne = -1;

  useEffect(() => {
    const getCartFromLocalStorage = () => {
      const cartList = JSON.parse(localStorage.getItem('cart'));

      if (cartList.length > 0) {
        setCart(cartList);
      }
    };
    getCartFromLocalStorage();
  }, []);

  function saveCartToLocalStorage(item) {
    localStorage.setItem('cart', JSON.stringify(item));
  }

  const handleClick = (drink) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.id === drink.id);
    if (index !== minusOne) {
      newCart[index].quantity += 1;
    } else {
      newCart.push({ ...drink, quantity: 1 });
    }
    setCart(newCart);
    saveCartToLocalStorage(newCart);
  };

  const handleRemove = (drink) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.id === drink.id);
    if (index !== minusOne) {
      if (newCart[index].quantity > 1) {
        newCart[index].quantity -= 1;
      } else {
        newCart.splice(index, 1);
      }
      setCart(newCart);
      localStorage.removeItem('cart');
      saveCartToLocalStorage(newCart);
    }
  };

  const totalPrice = cart.reduce((acc, drink) => acc + (drink.price * drink.quantity), 0);

  return (
    <div>
      <Navbar />

      <div>
        {drinks.map((drink) => (
          <DrinkCard
            key={ drink.id }
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
          rounded absolute top-24 right-0"
        type="button"
        // onClick={ navigateToCheckout }
      >
        {`R$ ${totalPrice.toFixed(2).replace('.', ',')}`}
      </button>
    </div>

  );
}
