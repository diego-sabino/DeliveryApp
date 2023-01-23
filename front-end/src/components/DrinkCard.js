import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';

import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import AppContext from '../context/AppContext';

export default function DrinkCard({ drink, handleClick, handleRemove }) {
  const { cart } = useContext(AppContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const getCartFromLocalStorage = () => {
      const cartList = JSON.parse(localStorage.getItem('cart'));

      if (cartList.length > 0) {
        const filtered = cartList.filter((item) => item.id === drink.id);
        if (filtered.length > 0) {
          setQuantity(filtered[0].quantity);
        }
      } else {
        setQuantity(0);
      }
    };
    getCartFromLocalStorage();
  }, [cart]);

  return (
    <div className="flex flex-col w-fit items-center">
      <img
        data-testid={ `customer_products__img-card-bg-image-${drink.id}` }
        src={ drink.urlImage }
        alt={ drink.name }
        className="w-56 h-60"
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
            {drink.price.toFixed(2).replace('.', ',')}
          </p>

        </div>

        <div className="flex w-fit">
          <button
            onClick={ () => handleClick(drink) }
            type="button"
            className="p-2 bg-[#036B52] rounded-l-lg text-white"
          >
            <AiOutlinePlus />
          </button>

          <p className="px-5 py-2 bg-white">{quantity}</p>

          <button
            onClick={ () => handleRemove(drink) }
            type="button"
            className="p-2 bg-[#036B52] rounded-r-lg text-white"
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
    price: PropTypes.number,
    urlImage: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};