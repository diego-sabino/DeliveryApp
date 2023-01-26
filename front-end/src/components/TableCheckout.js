import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { tableProprietiesCheckout,
  tableProprietiesOrder } from '../utils/TableProprieties';
import AppContext from '../context/AppContext';

export default function TableCheckout({ orderData }) {
  const { cart, setCart, totalPrice, setTotalPrice } = useContext(AppContext);
  const [testIdRoute, setTestIdRoute] = useState('order_details' || 'checkout');
  const [tableProprieties, setTableProprieties] = useState();

  const customerCheckout = window.location.pathname === '/customer/checkout';

  const removeItem = (id) => {
    const newOrderData = orderData.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(newOrderData));
    setCart(newOrderData);
  };

  useEffect(() => {
    const getCartFromLocalStorage = () => {
      const cartList = JSON.parse(localStorage.getItem('cart'));

      if (cartList) {
        setCart(cartList);
      }
    };
    const setTestId = () => {
      if (customerCheckout) {
        setTestIdRoute('checkout');
        setTableProprieties(tableProprietiesCheckout);
      } else {
        setTestIdRoute('order_details');
        setTableProprieties(tableProprietiesOrder);
      }
    };
    setTestId();
    getCartFromLocalStorage();
  }, [customerCheckout, setCart]);

  useEffect(() => {
    const totalPriceReduce = cart
      .reduce((acc, drink) => acc + (drink.price * drink.quantity), 0);
    setTotalPrice(totalPriceReduce);
  }, [cart]);

  return (
    <table
      className="table-auto mx-auto text-center
      md:text-center bg-gray-100 shadow-lg w-full"
    >
      <thead>
        <tr className="bg-teal-500 text-white">
          { (tableProprieties) && (
            tableProprieties.map((item, index) => (
              <th
                key={ index }
                className="px-4 py-2 md:px-6 md:py-3 text-lg font-medium"
              >
                {item}

              </th>
            ))
          )}
        </tr>
      </thead>
      <tbody>
        {(orderData) && orderData.map((item, index) => (
          <tr key={ item.id } className="border-b">
            <td
              className="px-4 py-2 md:px-6 md:py-3 text-md font-medium"
              data-testid={
                `customer_${testIdRoute}__element-order-table-item-number-${index}`
              }
            >
              {index + 1}
            </td>
            <td
              className="px-4 py-2 md:px-6 md:py-3 text-md font-medium"
              data-testid={ `customer_${testIdRoute}__element-order-table-name-${index}` }
            >
              {item.name}

            </td>
            <td
              className="px-4 py-2 md:px-6 md:py-3 text-md font-medium"
              data-testid={
                `customer_${testIdRoute}__element-order-table-quantity-${index}`
              }
            >
              {item.quantity}

            </td>
            <td
              className="px-4 py-2 md:px-6 md:py-3 text-md font-medium"
              data-testid={
                `customer_${testIdRoute}_element-order-table-unit-price-${index}`
              }
            >
              {item.price.replace('.', ',')}

            </td>
            <td
              className="px-4 py-2 md:px-6 md:py-3 text-md font-medium"
              data-testid={
                `customer_${testIdRoute}__element-order-table-sub-total-${index}`
              }
            >
              {(item.price * item.quantity).toFixed(2).replace('.', ',')}

            </td>
            {(testIdRoute === 'checkout') && (
              <td className="px-4 py-2 md:px-6 md:py-3">
                <button
                  type="button"
                  onClick={ () => removeItem(item.id) }
                  data-testid={
                    `customer_${testIdRoute}__element-order-table-remove-${index}`
                  }
                  className="bg-red-500
                 text-white p-2 rounded-lg md:py-2 md:px-4 text-md font-medium"
                >
                  Remove
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
      <div
        className="
          bg-blue-500 hover:bg-blue-700
          text-white font-bold py-2 px-4
          rounded top-24 right-0 fixed"
        data-testid={ `customer_${testIdRoute}__element-order-total-price` }
      >
        <p>
          {`R$ ${totalPrice.toFixed(2).replace('.', ',')}`}
        </p>
      </div>
    </table>
  );
}

TableCheckout.propTypes = {
  orderData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
    url_image: PropTypes.string,
  })).isRequired,
};
