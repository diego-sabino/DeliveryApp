/* eslint-disable react/jsx-max-depth */
import React, { useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function SuccessModal({ orderId }) {
  const { showModal, setShowModal } = useContext(AppContext);

  const navigate = useNavigate();

  const handleModal = () => {
    setShowModal(false);
    if (orderId) {
      navigate(`/customer/orders/${orderId}`);
    } else {
      navigate('/customer/orders');
    }
  };

  return (
    <div>
      <CSSTransition
        in={ showModal }
        timeout={ 300 }
        classNames="modal"
        unmountOnExit
      >
        <div
          className="
          px-4 pb-4 sm:inset-0 sm:flex sm:items-center
          sm:justify-center"
        >
          <div
            className="rounded-lg
            overflow-hidden shadow-xl transform
            transition-all sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="flex items-start p-4">
              <div className="w-0 flex-1 pt-0.5">
                <div className="wrapper">
                  {' '}
                  <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    {' '}
                    <circle
                      className="checkmark__circle"
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                    />
                    {' '}
                    <path
                      className="checkmark__check"
                      fill="none"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                  </svg>
                  <h1 className="mb-8 text-center text-3xl">
                    Compra realizada com sucesso!
                  </h1>
                  <p className="text-center mb-4">
                    Você pode acompanhar seu pedido na página de Pedidos
                  </p>
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={ () => navigate('/customer/products') }
                      className="w-[221px] h-[43px] text-white
                        bg-green-main
                        focus:ring-4 focus:outline-none
                        drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]uppercase
                        font-thin disabled:bg-[#ced7d3]
                        disabled:text-[#ffffff]
                        disabled:cursor-not-allowed
                        focus:ring-primary-300 rounded-[15px] text-base
                        px-5 py-2.5 text-center"
                    >
                      Continuar Comprando
                    </button>
                  </div>
                  <p className="text-sm mt-3 text-center font-light text-gray-400">
                    <button
                      type="button"
                      onClick={ () => handleModal() }
                    >

                      Ir para a detalhes do pedido
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default SuccessModal;

SuccessModal.propTypes = {
  orderId: PropTypes.number.isRequired,
};
