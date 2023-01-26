import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import salesList from '../mocks/Sales';

export default function CustomerOrders() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/sales')
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  const formatDate = (date) => {
    let formattedDate = new Date(date);
    formattedDate = formattedDate.toLocaleDateString('pt-BR');
    return formattedDate;
  };

  const statusColor = (status) => {
    switch (status) {
    case 'pending':
      return 'bg-[#CCB800]';
    case 'delivered':
      return 'bg-[#00CC9B]';
    case 'preparing':
      return 'bg-[#66CC00]';
    default:
      return 'bg-gray-400';
    }
  };

  return (
    <div>
      <Navbar />

      <main className="flex gap-4 flex-wrap p-6">
        {
          salesList.map((sale, index) => (
            <button
              type="button"
              onClick={ () => navigate(`/customer/orders/${sale.id}}`) }
              className="flex gap-2 bg-[#EAF1EF] p-[5px]"
              data-testid={ `customer_orders__element-order-id-${sale.id}` }
              key={ index }
            >
              <div
                className="flex items-center justify-center flex-col p-6"
                data-testid={ `customer_orders__element-delivery-status-${sale.id}` }
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
                uppercase font-medium"
                >
                  {sale.status}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p
                  className="bg-[#F2FFFC] p-2 rounded"
                  data-testid={ `customer_orders__element-order-date-${sale.id}` }
                >
                  {formatDate(sale.date)}
                </p>
                <p
                  className="bg-[#F2FFFC] p-2 rounded"
                  data-testid={ `customer_orders__element-card-price-${sale.id}` }
                >
                  {`R$ ${sale.total_price.toFixed(2).replace('.', ',')}`}
                </p>
              </div>
            </button>
          ))
        }

      </main>
    </div>
  );
}
