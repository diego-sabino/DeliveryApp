import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [userData, setUserData] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [orderCheckout, setOrderCheckout] = useState(null);
  const [payment, setPayment] = useState('');
  const [cardNumber, setCardNumber] = useState();
  const [showModal, setShowModal] = useState(false);

  const value = React.useMemo(() => ({
    userData,
    cart,
    toggle,
    setToggle,
    setUserData,
    changeStatus,
    orderCheckout,
    payment,
    cardNumber,
    setCardNumber,
    setPayment,
    setOrderCheckout,
    setChangeStatus,
    setCart,
    totalPrice,
    setTotalPrice,
    open,
    setOpen,
    orderData,
    setOrderData,
    showModal,
    setShowModal,
  }), [userData,
    cart,
    toggle,
    changeStatus,
    orderCheckout,
    payment,
    totalPrice,
    cardNumber,
    open,
    showModal,
    orderData]);

  return (
    <AppContext.Provider
      value={ value }

    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
