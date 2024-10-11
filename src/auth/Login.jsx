import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../public/img/img1.png';
import { supabase } from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setShowLoader(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      console.log('Usuario autenticado:', data);
      setTimeout(() => {
        setShowLoader(false);
        navigate('/');
      }, 5000);
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
      setShowLoader(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-200 p-4 font-montserrat">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md relative"
      >
        <AnimatePresence>
          {showLoader && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10 rounded-lg"
            >
              <motion.img
                src={logo}
                alt="AgroSalud Logo"
                className="w-32 h-32 object-cover"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          className="relative w-32 h-32 mx-auto mb-4"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img 
            src={logo} 
            alt="AgroSalud Logo" 
            className="w-full h-full object-cover rounded-full shadow-lg border-4 border-green-500"
          />
        </motion.div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-center text-green-800">Iniciar Sesión en AgroSalud</h2>
          
          {error && <div className="text-red-500 text-center">{error}</div>}
          
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-green-500" />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500 transition duration-300"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-green-500" />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500 transition duration-300"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 text-base"
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </motion.button>
        </form>
        
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-green-600 hover:text-green-800 transition duration-300">¿Olvidaste tu contraseña?</a>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">¿No tienes una cuenta?</p>
          <a href="/registro" className="text-sm text-green-600 hover:text-green-800 font-bold transition duration-300">Regístrate aquí</a>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
