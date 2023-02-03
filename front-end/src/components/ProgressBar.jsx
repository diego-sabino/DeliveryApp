import React from 'react';
import PropTypes from 'prop-types';

export default function ProgressBar({ orderStatus }) {
  const orderInPreparation = orderStatus === 'Preparando';
  const orderOnTheWay = orderStatus === 'Em Trânsito';
  const orderDelivered = orderStatus === 'Entregue';

  return (
    <div className="max-w-xl mx-auto my-4 border-b-2 pb-4">
      <div className="flex pb-3">
        <div className="flex-1" />

        <div className="flex-1">
          <div
            className="w-10 h-10 bg-white border-2
           border-grey-light mx-auto rounded-full text-lg text-white flex items-center"
          >
            <span className="text-black text-center w-full">1</span>
          </div>
        </div>

        <div className="w-1/6 align-center items-center align-middle content-center flex">
          <div
            className="w-full bg-grey-light
           rounded items-center align-middle align-center flex-1"
          >
            <div
              className="bg-green-500 text-xs
               leading-none py-1 text-center text-grey-darkest rounded"
              style={ { width: '100%' } }
            />
          </div>
        </div>

        <div className="flex-1">
          <div
            className="w-10 h-10 bg-white border-2
           border-grey-light mx-auto rounded-full text-lg text-white flex items-center"
          >
            <span className="text-black text-center w-full">2</span>
          </div>
        </div>

        <div className="w-1/6 align-center items-center align-middle content-center flex">
          <div
            className="w-full bg-grey-light rounded
          items-center align-middle align-center flex-1"
          >
            <div
              className="bg-green-500 text-xs
            leading-none py-1 text-center text-grey-darkest rounded "
              style={ (orderInPreparation || orderDelivered || orderOnTheWay)
                ? { width: '100%' } : { width: '0%' } }
            />
          </div>
        </div>

        <div className="flex-1">
          <div
            className="w-10 h-10 bg-white border-2
           border-grey-light mx-auto rounded-full text-lg text-white flex items-center"
          >
            <span className="text-black text-center w-full">3</span>
          </div>
        </div>

        <div className="w-1/6 align-center items-center align-middle content-center flex">
          <div
            className="w-full bg-grey-light rounded
          items-center align-middle align-center flex-1"
          >
            <div
              className="bg-green-500 text-xs leading-none
             py-1 text-center text-grey-darkest rounded "
              style={ (orderDelivered)
                ? { width: '100%' } : { width: '0%' } }
            />
          </div>
        </div>

        <div className="flex-1">
          <div
            className="w-10 h-10 bg-white
           border-2 border-grey-light mx-auto rounded-full
           text-lg text-white flex items-center"
          >
            <span className="text-black text-center w-full">4</span>
          </div>
        </div>

        <div className="flex-1" />
      </div>

      <div className="flex text-xs content-center text-center">
        <div className="w-1/4">
          Pedido realizado
        </div>

        <div className="w-1/4">
          Pedido em preparo
        </div>

        <div className="w-1/4">
          Pedido a caminho
        </div>

        <div className="w-1/4">
          Pedido entregue
        </div>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  orderStatus: PropTypes.string.isRequired,
};
