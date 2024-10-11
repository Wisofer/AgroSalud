import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../public/img/img1.png'; 
import { supabase } from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [rolId, setRolId] = useState('');
  const [departamentoId, setDepartamentoId] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Registrar el usuario en la autenticación de Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: contraseña,
      });

      if (authError) throw authError;

      if (authData && authData.user) {
        // Insertar los datos del usuario en la tabla 'usuarios'
        const { data, error } = await supabase
          .from('usuarios')
          .insert([
            {
              id: authData.user.id, // Usar el UID de auth como id en la tabla usuarios
              nombre,
              apellido,
              email,
              contraseña,
              rol_id: rolId,
              departamento_id: departamentoId
            }
          ]);

        if (error) throw error;

        console.log('Usuario registrado:', data);
        setShowModal(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const departamentos = [
    { id: 1, nombre: 'Boaco' },
    { id: 2, nombre: 'Carazo' },
    { id: 3, nombre: 'Chinandega' },
    { id: 4, nombre: 'Chontales' },
    { id: 5, nombre: 'Estelí' },
    { id: 6, nombre: 'Granada' },
    { id: 7, nombre: 'Jinotega' },
    { id: 8, nombre: 'León' },
    { id: 9, nombre: 'Madriz' },
    { id: 10, nombre: 'Managua' },
    { id: 11, nombre: 'Masaya' },
    { id: 12, nombre: 'Matagalpa' },
    { id: 13, nombre: 'Nueva Segovia' },
    { id: 14, nombre: 'Río San Juan' },
    { id: 15, nombre: 'Rivas' },
    { id: 16, nombre: 'RACCN' },
    { id: 17, nombre: 'RACCS' }
  ];

  const roles = [
    { id: 1, nombre: 'Granjero' },
    { id: 2, nombre: 'Veterinario' },
    { id: 3, nombre: 'Administrador' },
    { id: 4, nombre: 'Técnico Agrícola' },
    { id: 5, nombre: 'Investigador' }
  ];

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
          <h2 className="text-2xl font-bold mb-4 text-center text-green-800">Registro AgroSalud</h2>
          
          {error && <div className="text-red-500 text-center">{error}</div>}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-green-500" />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500 transition duration-300"
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-green-500" />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500 transition duration-300"
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
          </div>
          
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
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-green-500" />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500 transition duration-300"
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirmarContraseña}
              onChange={(e) => setConfirmarContraseña(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500 transition duration-300"
              value={rolId}
              onChange={(e) => setRolId(e.target.value)}
              required
            >
              <option value="">Selecciona rol</option>
              {roles.map((rol) => (
                <option key={rol.id} value={rol.id}>{rol.nombre}</option>
              ))}
            </select>

            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500 transition duration-300"
              value={departamentoId}
              onChange={(e) => setDepartamentoId(e.target.value)}
              required
            >
              <option value="">Selecciona departamento</option>
              {departamentos.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.nombre}</option>
              ))}
            </select>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 text-base"
          >
            Registrarse
          </motion.button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">¿Ya tienes una cuenta?</p>
          <a href="/login" className="text-sm text-green-600 hover:text-green-800 font-bold transition duration-300">Inicia sesión aquí</a>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-xl"
            >
              <h3 className="text-xl font-bold mb-4">Registro Exitoso</h3>
              <p className="mb-4">Por favor, revisa tu correo electrónico para confirmar tu cuenta.</p>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate('/login');
                }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              >
                Entendido
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegisterForm;
