import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faNotesMedical, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { supabase } from "../../supabase/supabase";
import { Link } from "react-router-dom";

const ChequeoRutinario = () => {
  const [formData, setFormData] = useState({
    nombreAnimal: "",
    especie: "",
    fechaChequeo: "",
    resultados: "",
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
    const { data, error } = await supabase.from('chequeos_rutinarios').insert([formData]);
    if (error) {
      console.error('Error adding chequeo rutinario:', error);
      return;
    }
    setFormData({
      nombreAnimal: "",
      especie: "",
      fechaChequeo: "",
      resultados: "",
      notas: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-8 font-montserrat">
      <motion.div
        className="chequeo-rutinario-container max-w-4xl mx-auto mt-10"
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
              Planificación y Registro de Chequeos Rutinarios
            </h2>
            <div className="text-center">
              <FontAwesomeIcon
                icon={faClipboardList}
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
                  htmlFor="fechaChequeo"
                  className="block text-lg font-semibold mb-2 text-blue-700"
                >
                  Fecha del Chequeo
                </label>
                <input
                  type="date"
                  id="fechaChequeo"
                  name="fechaChequeo"
                  value={formData.fechaChequeo}
                  onChange={handleChange}
                  className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="resultados"
                  className="block text-lg font-semibold mb-2 text-blue-700"
                >
                  Resultados
                </label>
                <textarea
                  id="resultados"
                  name="resultados"
                  value={formData.resultados}
                  onChange={handleChange}
                  placeholder="Resultados del Chequeo"
                  className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="notas"
                  className="block text-lg font-semibold mb-2 text-blue-700"
                >
                  Notas Adicionales
                </label>
                <textarea
                  id="notas"
                  name="notas"
                  value={formData.notas}
                  onChange={handleChange}
                  placeholder="Notas adicionales"
                  className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <motion.button
              type="submit"
              className="w-full py-3 px-6 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-300 mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Agregar Chequeo
            </motion.button>
          </form>
          <div className="text-center mt-6">
            <Link to="/chequeos-rutinarios" className="text-blue-500 hover:underline">
              Ir a Chequeos Rutinarios
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ChequeoRutinario;
