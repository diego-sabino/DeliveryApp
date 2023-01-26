import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AppContext from '../context/AppContext';
import Navbar from '../components/Navbar';
import TableCheckout from '../components/TableCheckout';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';

export default function OrderDetails() {
  const { cart } = useContext(AppContext);

  const [orderData, setOrderData] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const cartList = getItemLocalStorage('cart');
    setOrderData(cartList);

    const fetchSallers = () => {
      axios.get('http://localhost:3001/seller')
        .then((response) => {
          setSellers(response.data);
          setSelectedSeller(response.data[0].name);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchSallers();
  }, [cart]);

  const handleSubmit = () => {
    axios.post('http://localhost:3001/orders', {
      seller: selectedSeller,
      address,
      number,
      orderData,
    }).then((response) => {
      console.log(response);
      navigate(`/customer/orders/${response.data.id}}`);
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/salesProducts/1')
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <main className="p-4">
        <p className="text-lg font-bold ">Order details</p>
        <p> </p>
        <TableCheckout orderData={ orderData } />

      </main>
    </div>
  );
}
