import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faCalendarAlt,
  faNotesMedical,
  faPaw,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabase";
import { useAgroSalud } from "../../Context/AgroSaludContext";

const MonitoreoMedico = () => {
  const { usuario } = useAgroSalud();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreAnimal: "",
    especie: "",
    fechaConsulta: "",
    diagnostico: "",
    nivelActividad: "",
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
      const { data, error } = await supabase.from("monitoreo_medico").insert([
        {
          usuario_id: usuario.id,
          nombre_animal: formData.nombreAnimal,
          especie: formData.especie,
          fecha_consulta: formData.fechaConsulta,
          diagnostico: formData.diagnostico,
          nivel_actividad: formData.nivelActividad,
        },
      ]);

      if (error) throw error;

      console.log("Registro médico agregado con éxito:", data);

      navigate("/registros-medicos");
    } catch (error) {
      console.error("Error al agregar el registro médico:", error);
      setError(
        "Hubo un error al agregar el registro médico. Por favor, inténtalo de nuevo."
      );
    }
  };

  const enfermedadesPorEspecie = {
    Vacas: [],
    Cerdos: [],
    Cabras: [],
    Caballos: [],
    Aves: [],
    Perros: [],
    Gatos: [],
    Ovejas: [],
    Conejos: [],
    Avestruces: [],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-green-100 font-montserrat relative flex items-center justify-center">
      <motion.div
        className="registro-medico-container max-w-4xl mx-auto mt-10"
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
              Monitoreo Médico
            </h2>
            <div className="text-center">
              <FontAwesomeIcon
                icon={faStethoscope}
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
                  <FontAwesomeIcon icon={faPaw} /> Nombre del Animal
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
                  <FontAwesomeIcon icon={faClipboardList} /> Especie
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
                  {Object.keys(enfermedadesPorEspecie).map((especie) => (
                    <option key={especie} value={especie}>
                      {especie}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="fechaConsulta"
                  className="block text-lg font-semibold mb-2 text-blue-700"
                >
                  <FontAwesomeIcon icon={faCalendarAlt} /> Fecha de Monitoreo
                </label>
                <input
                  type="date"
                  id="fechaConsulta"
                  name="fechaConsulta"
                  value={formData.fechaConsulta}
                  onChange={handleChange}
                  className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="diagnostico"
                  className="block text-lg font-semibold mb-2 text-blue-700"
                >
                  <FontAwesomeIcon icon={faNotesMedical} /> Estado de Salud
                </label>
                <textarea
                  id="diagnostico"
                  name="diagnostico"
                  value={formData.diagnostico}
                  onChange={handleChange}
                  placeholder="Escriba el estado de salud"
                  className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="nivelActividad"
                  className="block text-lg font-semibold mb-2 text-blue-700"
                >
                  Nivel de Actividad
                </label>
                <textarea
                  id="nivelActividad"
                  name="nivelActividad"
                  value={formData.nivelActividad}
                  onChange={handleChange}
                  placeholder="Escriba el nivel de actividad"
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
              Agregar Registro
            </motion.button>
          </form>

          {error && (
            <div className="mt-4 text-red-500 text-center">
              {error}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              to="/dashboard/resultado-monitoreo-medico"
              className="text-blue-500 hover:underline"
            >
              Ir a los resultados de monitoreo médico
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MonitoreoMedico;
