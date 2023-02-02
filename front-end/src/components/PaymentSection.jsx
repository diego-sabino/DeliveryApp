import QRCode from 'qrcode.react';
import { useContext } from 'react';

import CreditCard from './CreditCard';

import AppContext from '../context/AppContext';
import { getItemLocalStorage } from '../utils/LocalStorageUtil';
import deliveryman from '../images/moto.png';

export default function PaymentSection() {
  const { payment } = useContext(AppContext);

  const totalPrice = getItemLocalStorage('totalPrice');

  const renderPaymentOption = () => {
    switch (payment) {
    case 'cash-option':
      return (
        <div className="flex flex-col items-center m-2">
          <p
            className="m-2 text-lg font-semibold text-green-main"
          >
            Pagamento na entrega

          </p>
          <img src={ deliveryman } alt="deliveryman" className="w-[200px]" />

          <ol className="list-decimal leading-8 mx-4 text-xs">
            <li>
              Verifique se o valor total da compra
              está correto antes de finalizar o pedido.
            </li>
            <li>Tenha o dinheiro em mãos ao receber a entrega.</li>
            <li>Verifique se a quantidade e o estado dos produtos antes de pagar.</li>
            <li>Entregue o dinheiro ao entregador.</li>
            <li>
              Confirme o recebimento e a quantidade dos
              produtos antes de fechar a transação.
            </li>
          </ol>
        </div>
      );
    case 'pix-option':
      return (
        <div className="flex flex-col items-center">
          <div className="text-center">
            <p
              className="m-2 text-xl font-semibold text-green-main"
            >
              {`R$ ${totalPrice.toFixed(2).replace('.', ',')}`}

            </p>
            <QRCode
              size={ 230 }
              className="border-solid border-2 border-gray rounded-md"
              value="https://www.linkedin.com/in/miyukishii"
            />
            <p className="m-4 font-bold">Escaneie o QR code</p>
          </div>

          <ol className="list-decimal leading-8">
            <li>Abra a câmera do seu celular.</li>
            <li>Aponte sua câmera para capurar o código.</li>
            <li>Abra a página web e clique pagar.</li>
          </ol>
        </div>
      );
    case 'debit-card':
      return (
        <div>
          <CreditCard />
        </div>
      );
    // eslint-disable-next-line sonarjs/no-duplicated-branches
    case 'credit-card':
      return (
        <div>
          <CreditCard />
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
