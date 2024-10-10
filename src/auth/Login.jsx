import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from '../../public/img/img1.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de inicio de sesión aquí
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-200 p-4 font-montserrat">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        <motion.div
          className="relative w-24 h-24 mx-auto mb-4"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img 
            src={logo} 
            alt="AgroSalud Logo" 
            className="w-full h-full object-cover rounded-full shadow-lg border-4 border-green-500"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-green-300"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-center text-green-800">Iniciar Sesión en AgroSalud</h2>
          
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
          >
            Iniciar Sesión
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
