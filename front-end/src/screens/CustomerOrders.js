import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';

// const minArray = 9;

export default function CustomerOrders() {
  const [ordersList, setOrdersList] = useState([]);
  const [updatedOrders, setUpdatedOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/sales')
      .then((response) => {
        setOrdersList(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const userData = getItemLocalStorage('user');
    const filteredOrders = ordersList.filter((order) => order.userId === userData.id);
    setUpdatedOrders(filteredOrders);
  }, [ordersList]);

  const formatDate = (date) => {
    let formattedDate = new Date(date);
    formattedDate = formattedDate.toLocaleDateString('pt-BR');
    return formattedDate;
  };

  const statusColor = (status) => {
    switch (status) {
    case 'Pendente':
      return 'bg-[#CCB800]';
    case 'Entregue':
      return 'bg-[#00CC9B]';
    case 'Preparando':
      return 'bg-[#66CC00]';
    default:
      return 'bg-gray-400';
    }
  };

  return (
    <div>
      <Navbar />

      <main className="flex gap-4 flex-wrap p-6">
        { (updatedOrders.length > 0)
          ? updatedOrders.map((sale, index) => (
            <button
              type="button"
              onClick={ () => navigate(`/customer/orders/${sale.id}`) }
              className="flex gap-2 bg-[#EAF1EF] p-[5px]"
              key={ index }
            >
              <div
                className="flex items-center justify-center flex-col p-6"
                data-testid={ `customer_orders__element-order-id-${sale.id}` }
              >
                <p className="text-sm">order</p>
                <p>{sale.id}</p>
              </div>

              <div
                className={ `rounded flex 
                justify-center w-[120px] h-full ${statusColor(sale.status)}` }
              >
                <p
                  className="inline-block self-center
                font-medium"
                  data-testid={ `customer_orders__element-delivery-status-${sale.id}` }
                >
                  {sale.status}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p
                  className="bg-[#F2FFFC] p-2 rounded"
                  data-testid={ `customer_orders__element-order-date-${sale.id}` }
                >
                  {formatDate(sale.saleDate)}
                </p>
                <p
                  className="bg-[#F2FFFC] p-2 rounded"
                  data-testid={ `customer_orders__element-card-price-${sale.id}` }
                >
                  {`R$ ${Number(sale.totalPrice).toFixed(2).replace('.', ',')}`}
                </p>
              </div>
            </button>
          ))
          : <p>Orders not founded</p>}

      </main>
    </div>
  );
}
