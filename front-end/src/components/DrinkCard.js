import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';

import AppContext from '../context/AppContext';
import { setItemLocalStorage } from '../utils/LocalStorageUtil';

export default function DrinkCard({ drink, handleClick, handleRemove }) {
  const { cart, setCart, orderData } = useContext(AppContext);

  const [quantity, setQuantity] = useState(0);
  const parseFloatPrice = parseFloat(drink.price).toFixed(2).replace('.', ',');

  useEffect(() => {
    const getCartFromLocalStorage = () => {
      const cartList = JSON.parse(localStorage.getItem('cart'));

      if (cartList && cartList.length) {
        const filtered = cartList.filter((item) => item.id === drink.id);
        if (filtered.length > 0) {
          setQuantity(filtered[0].quantity);
        } else {
          setQuantity(0);
        }
      } else {
        setQuantity(0);
      }
    };
    getCartFromLocalStorage();
  }, [cart]);

  const removeItem = (id) => {
    const newOrderData = orderData.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(newOrderData));
    setCart(newOrderData);
  };

  return (
    <div
      className="flex flex-col items-center
     w-[150px] bg-gray-100 rounded-xl shadow-lg shadow-gray-500/40 grow h-[350px]"
    >
      <img
        data-testid={ `customer_products__img-card-bg-image-${drink.id}` }
        src={ drink.url_image }
        alt={ drink.name }
        className="object-cover w-full h-2/3"
      />

      <div className="flex flex-col px-2 py-2 items-center h-fit">
        <p
          className="text-sm"
          data-testid={ `customer_products__element-card-title-${drink.id}` }
        >
          {drink.name}
        </p>

        <p
          data-testid={ `customer_products__element-card-price-${drink.id}` }
        >
          {`R$ ${parseFloatPrice}`}
        </p>

        <div>
          {(quantity > 0) ? (
            <div className="flex justify-center mt-2">
              <button
                onClick={ () => removeItem(drink.id) }
                type="button"
                className="px-4 py-2 transition ease-in
                  duration-200 uppercase rounded-full bg-green-main
                text-white border-2 text-xs border-green-main"
              >
                Remove from cart
              </button>
            </div>
          )
            : (
              <div className="flex justify-center mt-2">
                <button
                  onClick={ () => handleClick(drink) }
                  type="button"
                  className="px-4 py-2 transition ease-in
                    duration-200 uppercase rounded-full border-2 border-gray-700 text-xs
                    focus:outline-none"
                >
                  Add to cart
                </button>
              </div>)}

        </div>
      </div>
    </div>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    url_image: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};
