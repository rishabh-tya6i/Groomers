import React, { createContext, useState, useContext } from 'react';

const SalonContext = createContext(null);

export const SalonProvider = ({ children }) => {
  const [salon, setSalon] = useState(null);

  return (
    <SalonContext.Provider value={{ salon, setSalon }}>
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => useContext(SalonContext);