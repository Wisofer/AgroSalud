import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank, faCalendarAlt, faTag, faWeight, faVenusMars, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import pigImage from '../../../public/img/img4.jpg';
import { supabase } from '../../supabase/supabase';
import { useAgroSalud } from '../../Context/AgroSaludContext';
import { useNavigate } from 'react-router-dom';

const PigForm = () => {
  const navigate = useNavigate();
  const { usuario } = useAgroSalud();
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    tagNumber: '',
    weight: '',
    gender: '',
    breed: '',
    purpose: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data, error } = await supabase
        .from('cerdos')
        .insert([
          {
            nombre: formData.name,
            meses: calcularMeses(formData.birthDate),
            numero_etiqueta: formData.tagNumber,
            peso: parseFloat(formData.weight),
            genero: formData.gender,
            raza: formData.breed,
            proposito: formData.purpose,
            usuario_id: usuario.id,
          },
        ]);

      if (error) throw error;

      console.log('Cerdo registrado con éxito:', data);
      navigate('/dashboard/perfil-animal');
    } catch (error) {
      console.error('Error al registrar el cerdo:', error);
      setError('Hubo un error al registrar el cerdo. Por favor, inténtalo de nuevo.');
    }
  };

  const calcularMeses = (fechaNacimiento) => {
    const fechaActual = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let meses = (fechaActual.getFullYear() - fechaNac.getFullYear()) * 12;
    meses -= fechaNac.getMonth();
    meses += fechaActual.getMonth();
    return meses <= 0 ? 0 : meses;
  };

  return (
    <motion.div 
      className="pig-form-container max-w-4xl mx-auto mt-10 bg-gradient-to-br from-pink-100 to-white"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="card bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className="card-header bg-pink-200 p-6 rounded-t-lg shadow-md mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-4 text-pink-800">Formulario de Cerdos</h2>
          <div className="text-center">
            <motion.img 
              src={pigImage} 
              alt="Cerdo" 
              className="w-40 h-40 mx-auto rounded-full transition-transform duration-300 hover:scale-110 border-4 border-white" 
              whileHover={{ rotate: 10 }}
            />
          </div>
        </motion.div>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
          <div className="grid grid-cols-2 gap-6">
            <div className="form-group mb-4">
              <label htmlFor="name" className="block text-lg font-semibold mb-2 text-pink-700">
                <FontAwesomeIcon icon={faPiggyBank} /> Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre"
                className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="birthDate" className="block text-lg font-semibold mb-2 text-pink-700">
                <FontAwesomeIcon icon={faCalendarAlt} /> Nacimiento
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="tagNumber" className="block text-lg font-semibold mb-2 text-pink-700">
                <FontAwesomeIcon icon={faTag} /> Etiqueta
              </label>
              <input
                type="text"
                id="tagNumber"
                name="tagNumber"
                value={formData.tagNumber}
                onChange={handleChange}
                placeholder="Etiqueta"
                className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="weight" className="block text-lg font-semibold mb-2 text-pink-700">
                <FontAwesomeIcon icon={faWeight} /> Peso
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Peso"
                className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="breed" className="block text-lg font-semibold mb-2 text-pink-700">
                <FontAwesomeIcon icon={faClipboardList} /> Raza
              </label>
              <select
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Seleccione</option>
                <option value="duroc">Duroc</option>
                <option value="landrace">Landrace</option>
                <option value="yorkshire">Yorkshire</option>
                <option value="pietrain">Pietrain</option>
              </select>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="gender" className="block text-lg font-semibold mb-2 text-pink-700">
                <FontAwesomeIcon icon={faVenusMars} /> Género
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Seleccione</option>
                <option value="male">Macho</option>
                <option value="female">Hembra</option>
              </select>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="purpose" className="block text-lg font-semibold mb-2 text-pink-700">
                <FontAwesomeIcon icon={faClipboardList} /> Propósito
              </label>
              <select
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Seleccione</option>
                <option value="meat">Carne</option>
                <option value="breeding">Reproducción</option>
                <option value="show">Exhibición</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <button type="submit" className="w-full bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 transition duration-300">
              Registrar Cerdo
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PigForm;
