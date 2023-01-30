import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from '../components/Navbar';
import SaleCard from '../components/SaleCard';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';
import { getLocation } from '../utils/OrdersUtil';

export default function SellerOrders() {
  const [ordersList, setOrdersList] = useState([]);
  const [url, setUrl] = useState('');

  const location = useLocation();

  useEffect(() => {
    const sellerData = getItemLocalStorage('user');
    axios.get(`http://localhost:3001/seller/${sellerData.id}`)
      .then((response) => {
        setOrdersList(response.data);
      }).catch((error) => {
        console.log(error);
      });

    setUrl(getLocation(location.pathname));
  }, []);

  return (
    <div>
      <Navbar />

      <main className="flex gap-4 flex-wrap p-6">
        { (ordersList.length > 0)
          ? ordersList.map((sale, index) => (
            <SaleCard
              key={ index }
              sale={ sale }
              url={ url }
            />
          ))
          : <p>Sales not founded</p>}
      </main>
    </div>
  );
}
