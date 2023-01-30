import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { tableProprietiesCheckout,
  tableProprietiesOrder } from '../utils/TableProprieties';
import AppContext from '../context/AppContext';
import { getLocation } from '../utils/OrdersUtil';

export default function TableCheckout({ orderData }) {
  const { cart, setCart, totalPrice, setTotalPrice } = useContext(AppContext);
  const [testIdRoute, setTestIdRoute] = useState('order_details' || 'checkout');
  const [tableProprieties, setTableProprieties] = useState();
  const [role, setRole] = useState('');

  const location = useLocation();
  const customerCheckout = location.pathname === '/customer/checkout';

  const removeItem = (id) => {
    const newOrderData = orderData.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(newOrderData));
    setCart(newOrderData);
  };

  useEffect(() => {
    setRole(getLocation(location.pathname));
  }, []);

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
    if (customerCheckout) {
      const totalPriceReduce = cart
        .reduce((acc, drink) => acc + (drink.price * drink.quantity), 0);
      setTotalPrice(totalPriceReduce);
    } else if (orderData) {
      const total = orderData.map((item) => item.price * item.product.quantity)
        .reduce((acc, current) => acc + current);
      setTotalPrice(total);
    }
  }, [orderData, cart, customerCheckout, setTotalPrice]);

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
                `${role}_${testIdRoute}__element-order-table-item-number-${index}`
              }
            >
              {index + 1}
            </td>
            <td
              className="px-4 py-2 md:px-6 md:py-3 text-md font-medium"
              data-testid={ `${role}_${testIdRoute}__element-order-table-name-${index}` }
            >
              {item.name}

            </td>
            <td
              className="px-4 py-2 md:px-6 md:py-3 text-md font-medium"
              data-testid={
                `${role}_${testIdRoute}__element-order-table-quantity-${index}`
              }
            >
              {(customerCheckout) ? item.quantity : item.product.quantity}
            </td>
            <td
              className="px-4 py-2 md:px-6 md:py-3 text-md font-medium"
              data-testid={
                `${role}_${testIdRoute}__element-order-table-unit-price-${index}`
              }
            >
              {(item.price)
                ? item.price.replace('.', ',') : item.totalPrice.replace('.', ',') }
            </td>
            <td
              className="px-4 py-2 md:px-6 md:py-3 text-md font-medium"
              data-testid={
                `${role}_${testIdRoute}__element-order-table-sub-total-${index}`
              }
            >
              {(customerCheckout)
                ? (item.price * item.quantity).toFixed(2).replace('.', ',')
                : (item.price * item.product.quantity).toFixed(2).replace('.', ',') }

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
          bg-[#036B52]
          text-white font-bold py-2 px-4
          rounded right-0 absolute mt-2"
        data-testid={ `${role}_${testIdRoute}__element-order-total-price` }
      >
        <p>
          {`TOTAL: R$ ${totalPrice.toFixed(2).replace('.', ',')}`}
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
