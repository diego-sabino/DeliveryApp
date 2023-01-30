import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [userData, setUserData] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);
  const value = React.useMemo(() => ({
    userData,
    cart,
    toggle,
    setToggle,
    setUserData,
    changeStatus,
    setChangeStatus,
    setCart,
    totalPrice,
    setTotalPrice,
  }), [userData, cart, toggle, changeStatus, totalPrice]);

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
