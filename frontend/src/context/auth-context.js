import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  deso: null
});

export default AuthContext;
