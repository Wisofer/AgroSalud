import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyringe, faCalendarAlt, faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { supabase } from "../../supabase/supabase";

const Tratamiento = () => {
  const [formData, setFormData] = useState({
    nombreAnimal: "",
    especie: "",
    tratamiento: "",
    fechaInicio: "",
    fechaFin: "",
    notas: "",
  });

  const especies = [
    "Vacas",
    "Cerdos",
    "Cabras",
    "Caballos",
    "Aves",
    "Perros",
    "Gatos",
    "Ovejas",
    "Conejos",
    "Avestruces"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('tratamientos').insert([formData]);
    if (error) {
      console.error('Error adding tratamiento:', error);
      return;
    }
    setFormData({
      nombreAnimal: "",
      especie: "",
      tratamiento: "",
      fechaInicio: "",
      fechaFin: "",
      notas: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-8 font-montserrat">
      <motion.div
        className="tratamiento-container max-w-4xl mx-auto mt-10"
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
            className="card-header bg-blue-200 p-6 rounded-t-lg shadow-md mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">
              Administración de Tratamientos Médicos
            </h2>
            <div className="text-center">
              <FontAwesomeIcon
                icon={faSyringe}
                className="text-5xl text-blue-500"
              />
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group mb-4">
                <label
                  htmlFor="nombreAnimal"
                  className="block text-lg font-semibold mb-2 text-blue-700"
                >
                  Nombre del Animal
                </label>
                <input
                  type="text"
                  id="nombreAnimal"
                  name="nombreAnimal"
                  value={formData.nombreAnimal}
                  onChange={handleChange}
                  placeholder="Nombre del Animal"
                  className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="especie"
                  className="block text-lg font-semibold mb-2 text-blue-700"
                >
                  Especie
                </label>
                <select
                  id="especie"
                  name="especie"
                  value={formData.especie}
                  onChange={handleChange}
                  className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccione la especie</option>
                  {especies.map((especie) => (
                    <option key={especie} value={especie}>
                      {especie}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="tratamiento"
                  className="block text-lg font-semibold mb-2 text-blue-700"
                >
                  Tratamiento
                </label>
                <input
                  type="text"
                  id="tratamiento"
                  name="tratamiento"
                  value={formData.tratamiento}
                  onChange={handleChange}
                  placeholder="Descripción del Tratamiento"
                  className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="fechaInicio"
                  className="block text-lg font-semibold mb-2 text-blue-700"
                >
                  <FontAwesomeIcon icon={faCalendarAlt} /> Fecha de Inicio
                </label>
                <input
                  type="date"
                  id="fechaInicio"
                  name="fechaInicio"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="fechaFin"
                  className="block text-lg font-semibold mb-2 text-blue-700"
                >
                  <FontAwesomeIcon icon={faCalendarAlt} /> Fecha de Fin
                </label>
                <input
                  type="date"
                  id="fechaFin"
                  name="fechaFin"
                  value={formData.fechaFin}
                  onChange={handleChange}
                  className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="notas"
                  className="block text-lg font-semibold mb-2 text-blue-700"
                >
                  <FontAwesomeIcon icon={faNotesMedical} /> Notas
                </label>
                <textarea
                  id="notas"
                  name="notas"
                  value={formData.notas}
                  onChange={handleChange}
                  placeholder="Notas adicionales"
                  className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <motion.button
              type="submit"
              className="w-full py-3 px-6 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-300 mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Agregar Tratamiento
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <a
              href="/ver-tratamientos"
              className="text-blue-500 hover:underline"
            >
              Ver tratamientos
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Tratamiento;
