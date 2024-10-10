import React, { createContext, useState, useContext } from 'react';

const AgroSaludContext = createContext();

export const useAgroSalud = () => useContext(AgroSaludContext);

export const AgroSaludProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [animales, setAnimales] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);

  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  const agregarAnimal = (animal) => {
    setAnimales([...animales, animal]);
  };

  const agregarNotificacion = (notificacion) => {
    setNotificaciones([...notificaciones, notificacion]);
  };

  return (
    <AgroSaludContext.Provider
      value={{
        usuario,
        animales,
        notificaciones,
        iniciarSesion,
        cerrarSesion,
        agregarAnimal,
        agregarNotificacion,
      }}
    >
      {children}
    </AgroSaludContext.Provider>
  );
};
