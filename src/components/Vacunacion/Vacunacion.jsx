import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSyringe,
  faCalendarAlt,
  faTag,
  faClipboardList,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabase/supabase";
import { useAgroSalud } from "../../Context/AgroSaludContext";

const Vacunación = () => {
  const navigate = useNavigate();
  const { usuario } = useAgroSalud();
  const [formData, setFormData] = useState({
    nombreAnimal: "",
    especie: "",
    fechaVacunacion: "",
    vacuna: "",
    detalles_adicionales: "",
    imagen: null,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    // Validar tamaño máximo del archivo (5 MB en este caso)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file && file.size > MAX_FILE_SIZE) {
      console.error("El archivo es demasiado grande. Elige uno de menos de 5 MB.");
      return;
    }

    // Validar que sea un archivo de imagen
    if (file && file.type.startsWith("image/")) {
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imagen: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Por favor, selecciona un archivo de imagen válido.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data, error } = await supabase.from("vacunaciones").insert([
        {
          nombreAnimal: formData.nombreAnimal,
          especie: formData.especie,
          fechaVacunacion: formData.fechaVacunacion,
          vacuna: formData.vacuna,
          detalles_adicionales: formData.detalles_adicionales,
          imagen: formData.imagen,
          usuario_id: usuario.id,
        },
      ]);

      if (error) throw error;

      console.log("Vacunación registrada con éxito:", data);
      navigate("/dashboard/vacunaciones");
    } catch (error) {
      console.error("Error al registrar la vacunación:", error);
      setError("Hubo un error al registrar la vacunación. Por favor, inténtalo de nuevo.");
    }
  };

  const getVacunasPorEspecie = (especie) => {
    const vacunas = {
      Vacas: ["Fiebre Aftosa", "Brucelosis", "Carbunco Bacteridiano (Ántrax)", "Clostridiosis", "Leptospirosis", "Rabia", "Pasteurelosis", "IBR (Rinotraqueitis Infecciosa Bovina)", "BVD (Diarrea Viral Bovina)"],
      Cabras: ["Carbunco Bacteridiano (Ántrax)", "Clostridiosis", "Brucelosis", "Rabia"],
      Caballos: ["Encefalomielitis Equina Venezolana (EEV)", "Rabia", "Tétanos"],
      Cerdos: ["Peste Porcina Clásica", "Leptospirosis", "Erisipela Porcina", "Circovirus"],
      Perros: ["Parvovirus Canino", "Moquillo Canino", "Hepatitis Infecciosa Canina", "Rabia", "Leptospirosis", "Coronavirus Canino"],
      Gatos: ["Panleucopenia Felina", "Rinotraqueítis Viral Felina", "Calicivirus Felino", "Rabia", "Leucemia Felina"],
      Conejos: ["Mixomatosis", "Enfermedad Hemorrágica Viral", "Pasteurelosis", "Coccidiosis"],
    };
    return vacunas[especie] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-green-100 font-montserrat relative flex items-center justify-center">
      <motion.div
        className="vacunacion-form-container max-w-4xl mx-auto mt-10"
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
            className="card-header bg-yellow-200 p-6 rounded-t-lg shadow-md mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-center mb-4 text-yellow-800">
              Programación y registro de vacunas para prevenir enfermedades
            </h2>
            <div className="text-center">
              <FontAwesomeIcon icon={faSyringe} className="text-5xl text-yellow-500" />
            </div>
          </motion.div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group mb-4">
                <label
                  htmlFor="nombreAnimal"
                  className="block text-lg font-semibold mb-2 text-yellow-700"
                >
                  <FontAwesomeIcon icon={faTag} /> Nombre del Animal
                </label>
                <input
                  type="text"
                  id="nombreAnimal"
                  name="nombreAnimal"
                  value={formData.nombreAnimal}
                  onChange={handleChange}
                  placeholder="Nombre del Animal"
                  className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="especie"
                  className="block text-lg font-semibold mb-2 text-yellow-700"
                >
                  <FontAwesomeIcon icon={faClipboardList} /> Especie
                </label>
                <select
                  id="especie"
                  name="especie"
                  value={formData.especie}
                  onChange={handleChange}
                  className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                >
                  <option value="">Seleccione la especie</option>
                  <option value="Vacas">Vacas</option>
                  <option value="Cabras">Cabras</option>
                  <option value="Caballos">Caballos</option>
                  <option value="Cerdos">Cerdos</option>
                  <option value="Perros">Perros</option>
                  <option value="Gatos">Gatos</option>
                  <option value="Conejos">Conejos</option>
                </select>
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="fechaVacunacion"
                  className="block text-lg font-semibold mb-2 text-yellow-700"
                >
                  <FontAwesomeIcon icon={faCalendarAlt} /> Fecha de Vacunación
                </label>
                <input
                  type="date"
                  id="fechaVacunacion"
                  name="fechaVacunacion"
                  value={formData.fechaVacunacion}
                  onChange={handleChange}
                  className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="vacuna"
                  className="block text-lg font-semibold mb-2 text-yellow-700"
                >
                  <FontAwesomeIcon icon={faSyringe} /> Vacuna
                </label>
                <select
                  id="vacuna"
                  name="vacuna"
                  value={formData.vacuna}
                  onChange={handleChange}
                  className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                >
                  <option value="">Seleccione la vacuna</option>
                  {getVacunasPorEspecie(formData.especie).map((vacuna) => (
                    <option key={vacuna} value={vacuna}>
                      {vacuna}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="detalles_adicionales"
                  className="block text-lg font-semibold mb-2 text-yellow-700"
                >
                  <FontAwesomeIcon icon={faClipboardList} /> Detalles Adicionales
                </label>
                <textarea
                  id="detalles_adicionales"
                  name="detalles_adicionales"
                  value={formData.detalles_adicionales}
                  onChange={handleChange}
                  placeholder="Escriba detalles adicionales"
                  className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="imagen"
                  className="block text-lg font-semibold mb-2 text-yellow-700"
                >
                  <FontAwesomeIcon icon={faImage} /> Imagen del Animal
                </label>
                <input
                  type="file"
                  id="imagen"
                  name="imagen"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
            <motion.button
              type="submit"
              className="w-full py-3 px-6 bg-yellow-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition-colors duration-300 mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Registrar Vacunación
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/dashboard/vacunaciones" className="text-yellow-500 hover:underline">
              Ir a las vacunaciones
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Vacunación;
