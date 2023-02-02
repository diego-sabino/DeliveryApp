import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Navbar from '../components/Navbar.jsx';
import TableCheckout from '../components/TableCheckout';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';
import { formatDate } from '../utils/OrdersUtil';
import AppContext from '../context/AppContext';

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

      <main className="p-4">
        <p className="text-lg font-bold ">Order details</p>
        <p
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          {`Pedido ${orderData.id}` }

        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {`Vendedor ${sallerData.name}` }
        </p>
        <p
          data-testid={
            `customer_order_details__element-order-details-label-delivery-status${1}`
          }
        >
          {`Status ${orderData.status}` }
        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {formatDate(orderData.saleDate)}
        </p>

        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          onClick={ () => handleDelivered() }
          disabled={ orderData.status !== 'Em Trânsito' }
        >
          Marcar como entregue
        </button>

        {
          (orderData.length !== 0)
            ? <TableCheckout orderData={ orderData.products } />
            : <p>Something went wrong</p>
        }

      </main>
    </div>
  );
}
