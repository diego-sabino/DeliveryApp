import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { statusColor } from '../utils/OrdersUtil';

export default function SaleCard({ sale, url }) {
  const navigate = useNavigate();

  const formatDate = (date) => {
    let formattedDate = new Date(date);
    formattedDate = formattedDate.toLocaleDateString('pt-BR');
    return formattedDate;
  };

  const handleNavigate = () => {
    if (url === 'seller') {
      navigate(`/seller/orders/${sale.id}`);
    } else {
      navigate(`/customer/orders/${sale.id}`);
    }
  };

  return (
    <button
      type="button"
      onClick={ handleNavigate }
      className="flex gap-2 bg-[#EAF1EF] p-2 rounded-xl"
      data-testid={ (url === 'customer')
        ? `customer_orders__element-order-id-${sale.id}`
        : `seller_orders__element-order-id-${sale.id}` }
    >
      <div
        className="flex flex-col justify-center items-center h-full px-5 bg-[#F2FFFC]"
      >
        <p className="text-xs uppercase font-medium">order</p>
        <p>{sale.id}</p>
      </div>

      <div>
        <div className="flex gap-2">

          <div
            className={ `rounded flex 
          justify-center w-[120px] items-stretch ${statusColor(sale.status)}` }
          >
            <p
              className="inline-block self-center
            font-medium"
              data-testid={ (url === 'customer')
                ? `customer_orders__element-delivery-status-${sale.id}`
                : `seller_orders__element-delivery-status-${sale.id}` }
            >
              {sale.status}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p
              className="bg-[#F2FFFC] p-2 rounded"
              data-testid={ (url === 'customer')
                ? `customer_orders__element-order-date-${sale.id}`
                : `seller_orders__element-order-date-${sale.id}` }
            >
              {formatDate(sale.saleDate)}
            </p>
            <p
              className="bg-[#F2FFFC] p-2 rounded"
              data-testid={ (url === 'customer')
                ? `customer_orders__element-card-price-${sale.id}`
                : `seller_orders__element-card-price-${sale.id}` }
            >
              {`R$ ${Number(sale.totalPrice).toFixed(2).replace('.', ',')}`}
            </p>
          </div>

        </div>

        <p
          className={ `text-sm text-right mt-2 ${(url === 'seller')
            ? 'block' : 'hidden'}` }
          data-testid={ `seller_orders__element-card-address-${sale.id}` }
        >
          {`${sale.deliveryAddress}, ${sale.deliveryNumber}`}

        </p>
      </div>
    </button>
  );
}

SaleCard.propTypes = {
  sale: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    totalPrice: PropTypes.string,
    status: PropTypes.number,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
  })).isRequired,
  url: PropTypes.string.isRequired,
};
