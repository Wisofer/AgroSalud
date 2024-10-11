// AgroSaludContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabase/supabase'; // Asegúrate de que la ruta es correcta

const AgroSaludContext = createContext();

export const useAgroSalud = () => useContext(AgroSaludContext);

export const AgroSaludProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [animales, setAnimales] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  // Función para manejar el inicio de sesión
  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  // Función para manejar el cierre de sesión
  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error);
    } else {
      setUsuario(null);
    }
  };

  // Función para agregar un animal
  const agregarAnimal = (animal) => {
    setAnimales([...animales, animal]);
  };

  // Función para agregar una notificación
  const agregarNotificacion = (notificacion) => {
    setNotificaciones([...notificaciones, notificacion]);
  };

  useEffect(() => {
    // Función para obtener la sesión y el usuario actual
    const obtenerUsuario = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error obteniendo la sesión:', error);
          setUsuario(null);
        } else {
          setUsuario(data.session?.user ?? null);
        }
      } catch (err) {
        console.error('Error obteniendo la sesión:', err);
        setUsuario(null);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuario();

    // Suscribirse a los cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUsuario(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUsuario(null);
      }
    });

    // Limpiar la suscripción al desmontar
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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
        loading, // Añadir el estado de carga al contexto
      }}
    >
      {children}
    </AgroSaludContext.Provider>
  );
};
