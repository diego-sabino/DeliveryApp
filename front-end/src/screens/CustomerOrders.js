import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from '../components/Navbar';
import SaleCard from '../components/SaleCard';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';
import getLocation from '../utils/OrdersUtil';

export default function CustomerOrders() {
  const [ordersList, setOrdersList] = useState([]);
  const [updatedOrders, setUpdatedOrders] = useState([]);
  const [url, setUrl] = useState('');

  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    axios.get('http://localhost:3001/sales')
      .then((response) => {
        setOrdersList(response.data);
      }).catch((error) => {
        console.log(error);
      });

    setUrl(getLocation(location.pathname));
  }, []);

  useEffect(() => {
    const userData = getItemLocalStorage('user');
    const filteredOrders = ordersList.filter((order) => order.userId === userData.id);
    setUpdatedOrders(filteredOrders);
  }, [ordersList]);

  return (
    <div>
      <Navbar />

      <main className="flex gap-4 flex-wrap p-6">
        { (updatedOrders.length > 0)
          ? updatedOrders.map((sale, index) => (
            <SaleCard
              key={ index }
              sale={ sale }
              url={ url }
            />
          ))
          : <p>Orders not founded</p>}

      </main>
    </div>
  );
}
