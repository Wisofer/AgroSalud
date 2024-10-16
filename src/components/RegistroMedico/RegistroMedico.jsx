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
import { Link } from "react-router-dom";

const RegistroMedico = () => {
  const [formData, setFormData] = useState({
    nombreAnimal: "",
    especie: "",
    fechaConsulta: "",
    diagnostico: "",
    enfermedad: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se manejará el envío del formulario
    setFormData({
      nombreAnimal: "",
      especie: "",
      fechaConsulta: "",
      diagnostico: "",
      enfermedad: "",
    });
  };

  const enfermedadesPorEspecie = {
    Vacas: ["Fiebre Aftosa", "Brucelosis", "Carbunco Bacteridiano (Ántrax)", "Clostridiosis", "Leptospirosis", "Rabia"],
    Cerdos: ["Peste Porcina Clásica", "Leptospirosis", "Erisipela Porcina", "Circovirus"],
    Cabras: ["Carbunco Bacteridiano (Ántrax)", "Clostridiosis", "Brucelosis", "Rabia"],
    Caballos: ["Encefalomielitis Equina Venezolana (EEV)", "Rabia", "Tétanos"],
    Aves: ["Newcastle", "Bronquitis Infecciosa Aviar", "Gumboro (Enfermedad de la Bolsa de Fabricio)", "Viruela Aviar", "Cólera Aviar", "Marek"],
    Perros: ["Parvovirus Canino", "Moquillo Canino", "Hepatitis Infecciosa Canina", "Rabia", "Leptospirosis", "Coronavirus Canino"],
    Gatos: ["Panleucopenia Felina", "Rinotraqueítis Viral Felina", "Calicivirus Felino", "Rabia", "Leucemia Felina"],
    Ovejas: ["Carbunco Bacteridiano (Ántrax)", "Enterotoxemia", "Clostridiosis", "Rabia"],
    Conejos: ["Mixomatosis", "Enfermedad Hemorrágica Viral", "Pasteurelosis", "Coccidiosis"],
    Avestruces: ["Viruela Aviar", "Newcastle", "Colibacilosis", "Salmonelosis"],
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
              Historial Médico
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
                  <FontAwesomeIcon icon={faCalendarAlt} /> Fecha de Consulta
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
                  <FontAwesomeIcon icon={faNotesMedical} /> Diagnóstico
                </label>
                <textarea
                  id="diagnostico"
                  name="diagnostico"
                  value={formData.diagnostico}
                  onChange={handleChange}
                  placeholder="Escriba el diagnóstico"
                  className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="enfermedad"
                  className="block text-lg font-semibold mb-2 text-blue-700"
                >
                  Enfermedad
                </label>
                <select
                  id="enfermedad"
                  name="enfermedad"
                  value={formData.enfermedad}
                  onChange={handleChange}
                  className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccione la enfermedad</option>
                  {formData.especie &&
                    enfermedadesPorEspecie[formData.especie].map((enfermedad) => (
                      <option key={enfermedad} value={enfermedad}>
                        {enfermedad}
                      </option>
                    ))}
                </select>
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

          <div className="mt-8 text-center">
            <Link
              to="/registros-medicos"
              className="text-blue-500 hover:underline"
            >
              Ir a los registros médicos
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegistroMedico;
