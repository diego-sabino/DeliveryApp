import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../components/Navbar.jsx';
import TableCheckout from '../components/TableCheckout';
import AppContext from '../context/AppContext';
import { formatDate, statusColor } from '../utils/OrdersUtil';

const satatusOnWay = 'Em Trânsito';

export default function SaleDetails() {
  const { changeStatus, setChangeStatus } = useContext(AppContext);
  const [orderData, setOrderData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    // get order data by id
    axios.get(`http://localhost:3001/salesProducts/${id}`)
      .then((response) => {
        setOrderData(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [changeStatus]);

  const handleChangeStatus = (status) => {
    axios.put(
      `http://localhost:3001/sales/${id}`,
      { status },
    )
      .then((response) => {
        console.log(response);
        setChangeStatus(!changeStatus);
      }).catch((error) => {
        console.log(error);
      });
  };

  console.log(orderData.status);

  return (
    <div>
      <Navbar />

      <main className="flex flex-col w-full p-5">
        <p className="font-bold text-xl my-2">Order Details</p>
        <div
          className="flex justify-between
        bg-[#EAF1EF] p-2 uppercase font-bold"
        >
          <div className="flex items-center gap-4">
            <p
              data-testid="seller_order_details__element-order-details-label-order-id"
              className="text-sm"
            >
              {`Order ${orderData.id}` }

            </p>

            <p
              data-testid="seller_order_details__element-order-details-label-order-date"
            >
              {formatDate(orderData.saleDate)}
            </p>

            <p
              className={ `${statusColor(orderData.status)} p-2 rounded capitalize` }
              data-testid={
                `seller_order_details__element-order-details-label-delivery-status${1}`
              }
            >
              {`${orderData.status}` }
            </p>
          </div>

          <div className="flex gap-4">
            <button
              className="bg-[#2FC18C]
            hover:bg-[#04362b] p-2 rounded
             text-white self-end uppercase disabled:opacity-60"
              type="button"
              data-testid="seller_order_details__button-preparing-check"
              onClick={ () => handleChangeStatus('Preparando') }
              disabled={
                orderData.status === 'Preparando'
                || orderData.status === satatusOnWay
                || orderData.status === 'Entregue'
              }
            >
              Prepare order
            </button>

            <button
              className="bg-[#036B52]
             hover:bg-[#04362b] p-2 rounded
              text-white self-end uppercase disabled:opacity-60"
              type="button"
              data-testid="seller_order_details__button-dispatch-check"
              onClick={ () => handleChangeStatus(satatusOnWay) }
              disabled={
                orderData.status === 'Pendente'
                || orderData.status === satatusOnWay
                || orderData.status === 'Entregue'
              }
            >
              Out for delivery
            </button>
          </div>

        </div>
        {
          orderData.length !== 0
            ? <TableCheckout orderData={ orderData.products } />
            : <p>Something went wrong</p>
        }

      </main>
    </div>
  );
}
