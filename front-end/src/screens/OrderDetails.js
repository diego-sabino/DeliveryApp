import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Navbar from '../components/Navbar.jsx';
import TableCheckout from '../components/TableCheckout';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';
import { formatDate } from '../utils/OrdersUtil';
import AppContext from '../context/AppContext';
import ProgressBar from '../components/ProgressBar.jsx';

export default function OrderDetails() {
  const { changeStatus, setChangeStatus } = useContext(AppContext);
  const [orderData, setOrderData] = useState([]);
  const [sallerData, setSallerData] = useState([]);

  const { id } = useParams();

  console.log(orderData.status);

  useEffect(() => {
    // get order data by id
    axios.get(`http://localhost:3001/salesProducts/${id}`)
      .then((response) => {
        setOrderData(response.data);
      }).catch((error) => {
        console.log(error);
      });

    // get saller data by id
    axios.get(`http://localhost:3001/sellerName/${id}`)
      .then((response) => {
        setSallerData(response.data.seller);
      }).catch((error) => {
        console.log(error);
      });
  }, [changeStatus, id]);

  const handleDelivered = () => {
    const userData = getItemLocalStorage('user');
    const config = {
      headers: { Authorization: userData.token },
    };
    axios.put(
      `http://localhost:3001/sales/${id}`,
      { status: 'Entregue' },
      config,
    )
      .then((response) => {
        console.log(response);
        setChangeStatus(!changeStatus);
      }).catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <ProgressBar orderStatus={ orderData.status } />

      <main className="p-4">
        <h1 className="text-lg font-bold text-center">Detalhes do pedido</h1>
        <p
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          {`Pedido nº ${orderData.id}` }

        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {formatDate(orderData.saleDate)}
        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {`Vendedor ${sallerData.name}` }
        </p>
        {/* <p
          data-testid={
            `customer_order_details__element-order-details-label-delivery-status${1}`
          }
        >
          {`Status ${orderData.status}` }
        </p> */}

        <div className="flex items-center justify-center">
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            className="w-[221px] h-[43px] text-white
              bg-green-main
              focus:ring-4 focus:outline-none
              drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]uppercase
              font-thin disabled:bg-[#ced7d3]
              disabled:text-[#ffffff]
              disabled:cursor-not-allowed
              focus:ring-primary-300 rounded-[15px] text-base
              px-5 py-2.5 text-center"
            onClick={ () => handleDelivered() }
            disabled={ orderData.status !== 'Em Trânsito' }
          >
            Marcar como entregue
          </button>
        </div>

        {
          (orderData.length !== 0)
            ? (
              <div className="mt-8">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {(orderData) && orderData.products.map((product) => (
                      <li key={ product.id } className="flex py-6">
                        <div
                          className="h-24 w-24 flex-shrink-0
                    overflow-hidden rounded-md border border-gray-200"
                        >
                          <img
                            src={ product.url_image }
                            alt={ product.imageAlt }
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="m-4 flex flex-1 flex-col">
                          <div>
                            <div
                              className="flex justify-between
                        text-base font-medium text-gray-900"
                            >
                              <h3>
                                <a href={ product.href }>{product.name}</a>
                              </h3>
                              <p className="ml-4">
                                {`${product.price.replace('.', ',')}`}
                              </p>
                            </div>
                          </div>
                          <div
                            className="flex flex-1
                      items-end justify-between text-sm"
                          >
                            <p className="text-gray-500">
                              {`Quantity: ${product.product.quantity} ` }
                            </p>

                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
            : <p>Something went wrong</p>
        }

      </main>
    </div>
  );
}
