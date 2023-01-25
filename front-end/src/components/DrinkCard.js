import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';

import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import AppContext from '../context/AppContext';
import { setItemLocalStorage } from '../utils/LocalStorageUtil';

export default function DrinkCard({ drink, handleClick, handleRemove }) {
  const { cart, setCart } = useContext(AppContext);

  const [quantity, setQuantity] = useState(0);

  const minusOne = -1;
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

  const handleInputChange = (event) => {
    setQuantity(event.target.value);
    const num = parseFloat(event.target.value);
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.id === drink.id);
    if (index !== minusOne) {
      newCart[index].quantity = num;
    } else {
      console.log('tem nada aqui');
      newCart.push({ ...drink, quantity: num });
    }

    setCart(newCart);
    setItemLocalStorage('cart', newCart);
  };

  return (
    <div className="flex flex-col w-fit items-center">
      <img
        data-testid={ `customer_products__img-card-bg-image-${drink.id}` }
        src={ drink.urlImage }
        alt={ drink.name }
        className="w-56 object-cover h-60"
      />

      <div className="flex flex-col bg-[#EAF1EF] px-10 py-4">
        <div className="flex gap-2">
          <p
            data-testid={ `customer_products__element-card-title-${drink.id}` }
          >
            {drink.name}
          </p>

          <p
            data-testid={ `customer_products__element-card-price-${drink.id}` }
          >
            {`R$ ${parseFloatPrice}`}
          </p>

        </div>

        <div className="flex w-fit">
          <button
            onClick={ () => handleClick(drink) }
            type="button"
            className="p-2 bg-[#036B52] rounded-l-lg text-white"
            data-testid={ `customer_products__button-card-add-item-${drink.id}` }
          >
            <AiOutlinePlus />
          </button>

          <input
            data-testid={ `customer_products__input-card-quantity-${drink.id}` }
            className="px-5 py-2 bg-white"
            name="quantity"
            value={ quantity }
            onChange={ (event) => handleInputChange(event) }
          />

          <button
            onClick={ () => handleRemove(drink) }
            type="button"
            className="p-2 bg-[#036B52] rounded-r-lg text-white"
            data-testid={ `customer_products__button-card-rm-item-${drink.id}` }
          >
            <AiOutlineMinus />
          </button>
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
    urlImage: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};
