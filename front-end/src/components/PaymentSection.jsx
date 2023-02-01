import QRCode from 'qrcode.react';
import { useContext } from 'react';

import CreditCard from './CreditCard';

import AppContext from '../context/AppContext';

export default function PaymentSection() {
  const { payment } = useContext(AppContext);

  const renderPaymentOption = () => {
    switch (payment) {
    case 'cash-option':
      return (
        <div>
          <p>Payment on delivery</p>
        </div>
      );
    case 'pix-option':
      return (
        <div className="flex justify-center h-screen">
          <div className="text-center">
            <p>Pix</p>
            <QRCode
              className="border-solid border-2 border-gray rounded-md"
              value="https://www.linkedin.com/in/miyukishii"
            />
          </div>
        </div>
      );
    case 'credit-card':
      return (
        <div>
          <CreditCard />
        </div>
      );
    case 'debit-card':
      return (
        <div>
          <p>Debit card</p>
        </div>
      );
    default:
      return null;
    }
  };

  return (
    <div>
      { renderPaymentOption()}
    </div>
  );
}
