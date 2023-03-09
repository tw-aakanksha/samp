import Shop from './components/Product/products-container';
import { Routes, Route } from 'react-router-dom';
import React from 'react';

import SignupBuyer from './components/signup-buyer/signup-buyer-component';
import SignupSeller from './components/signup-seller/signup-seller-component';
import Toolbar from './routes/navigation/toolbar';

import LoginBuyer from './components/Login-buyer/login-buyer';
import LoginSeller from './components/Login-Seller/login-seller';
import { useState, createContext } from 'react';
export const UserContext = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Routes>
          <Route path="/" element={<Toolbar />}>
            <Route index element={<Shop />} />
            <Route path="signupbuyer" element={<SignupBuyer />} />
            <Route path="signupseller" element={<SignupSeller />} />
            <Route path="loginbuyer" element={<LoginBuyer />} />
            <Route path="loginseller" element={<LoginSeller />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
