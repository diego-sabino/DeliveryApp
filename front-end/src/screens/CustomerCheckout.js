import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import TableCheckout from '../components/TableCheckout';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';

export default function CustomerCheckout() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const cart = getItemLocalStorage('cart');
    setOrderData(cart);
  }, []);

  return (
    <div>
      <Navbar />

      <main>
        <p>Checkout</p>
        <TableCheckout orderData={ orderData } />

        <p>Details and Delivery address</p>
        <form>
          {/* <label htmlFor="seller-checkout">
            Seller
            <select name="cars" id="seller-checkout">
              <option value="volvo">Amanda Pereira</option>
              <option value="saab">Carlos Maciel</option>
            </select>
          </label> */}

          <label htmlFor="delivery-adress" className="flex flex-col">
            Address
            <input
              type="text"
              id="delivery-adress"
              placeholder="Ex: Travessa Terceira da Castanheira, Bairro Muruci"
            />
          </label>

          <label
            htmlFor="delivery-number"
            className="flex flex-col"
          >
            Number
            <input
              type="text"
              id="delivery-number"
              placeholder="Ex: 193"
            />
          </label>
        </form>
      </main>
    </div>
  );
}
