import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [userData, setUserData] = useState();
  const memoizedData = useMemo(
    () => computeData(userData, setUserData),
    [userData, setUserData],
  );

  return (
    <AppContext.Provider
      value={ memoizedData }

    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
