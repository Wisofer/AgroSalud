import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCow,
  faCalendarAlt,
  faTag,
  faWeight,
  faGenderless,
  faClipboardList,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabase/supabase";
import { useAgroSalud } from "../../Context/AgroSaludContext";
import cowImage from "../../../public/img/img6.jpg";
import audio2 from "../../../public/audios/audio2.mp3";

const CowForm = () => {
  const navigate = useNavigate();
  const { usuario } = useAgroSalud();
  const [formData, setFormData] = useState({
    nombre: "",
    meses: "",
    numero_etiqueta: "",
    peso: "",
    genero: "",
    raza: "",
    proposito: "",
    imagen: null,
    detalles_adicionales: "",
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
      console.error(
        "El archivo es demasiado grande. Elige uno de menos de 5 MB."
      );
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
      const { data, error } = await supabase.from("vacas").insert([
        {
          nombre: formData.nombre,
          meses: parseInt(formData.meses),
          numero_etiqueta: formData.numero_etiqueta,
          peso: parseFloat(formData.peso),
          genero: formData.genero,
          raza: formData.raza,
          proposito: formData.proposito,
          imagen: formData.imagen,
          usuario_id: usuario.id,
          detalles_adicionales: formData.detalles_adicionales,
        },
      ]);

      if (error) throw error;

      console.log("Vaca registrada con éxito:", data);

      const audio = new Audio(audio2);
      audio.play().catch(error => {
        console.error("Error al reproducir el audio:", error);
      });

      navigate("/dashboard/perfil-animal");
    } catch (error) {
      console.error("Error al registrar la vaca:", error);
      setError(
        "Hubo un error al registrar la vaca. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-blue-100 font-montserrat relative flex items-center justify-center">
      <motion.div
        className="cow-form-container max-w-4xl mx-auto mt-10"
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
            className="card-header bg-green-200 p-6 rounded-t-lg shadow-md mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-center mb-4 text-green-800">
              Formulario de Vacas
            </h2>
            <div className="text-center">
              <motion.img
                src={cowImage}
                alt="Vaca"
                className="w-40 h-40 mx-auto rounded-full transition-transform duration-300 hover:scale-110 border-4 border-white"
                whileHover={{ rotate: 10 }}
              />
            </div>
          </motion.div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group mb-4">
                <label
                  htmlFor="nombre"
                  className="block text-lg font-semibold mb-2 text-green-700"
                >
                  <FontAwesomeIcon icon={faCow} /> Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre"
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="meses"
                  className="block text-lg font-semibold mb-2 text-green-700"
                >
                  <FontAwesomeIcon icon={faCalendarAlt} /> Edad (meses)
                </label>
                <input
                  type="number"
                  id="meses"
                  name="meses"
                  value={formData.meses}
                  onChange={handleChange}
                  placeholder="Edad en meses"
                  min="0"
                  max="360"
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="numero_etiqueta"
                  className="block text-lg font-semibold mb-2 text-green-700"
                >
                  <FontAwesomeIcon icon={faTag} /> Etiqueta
                </label>
                <input
                  type="text"
                  id="numero_etiqueta"
                  name="numero_etiqueta"
                  value={formData.numero_etiqueta}
                  onChange={handleChange}
                  placeholder="Etiqueta"
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="peso"
                  className="block text-lg font-semibold mb-2 text-green-700"
                >
                  <FontAwesomeIcon icon={faWeight} /> Peso kg
                </label>
                <input
                  type="number"
                  id="peso"
                  name="peso"
                  value={formData.peso}
                  onChange={handleChange}
                  placeholder="Peso"
                  step="0.01"
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="raza"
                  className="block text-lg font-semibold mb-2 text-green-700"
                >
                  <FontAwesomeIcon icon={faClipboardList} /> Raza
                </label>
                <select
                  id="raza"
                  name="raza"
                  value={formData.raza}
                  onChange={handleChange}
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Seleccione</option>
                  <option value="holstein">Holstein</option>
                  <option value="jersey">Jersey</option>
                  <option value="angus">Angus</option>
                  <option value="brahman">Brahman</option>
                </select>
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="genero"
                  className="block text-lg font-semibold mb-2 text-green-700"
                >
                  <FontAwesomeIcon icon={faGenderless} /> Género
                </label>
                <select
                  id="genero"
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="macho">Macho</option>
                  <option value="hembra">Hembra</option>
                </select>
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="proposito"
                  className="block text-lg font-semibold mb-2 text-green-700"
                >
                  <FontAwesomeIcon icon={faClipboardList} /> Propósito
                </label>
                <select
                  id="proposito"
                  name="proposito"
                  value={formData.proposito}
                  onChange={handleChange}
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="carne">Carne</option>
                  <option value="leche">Leche</option>
                  <option value="reproduccion">Reproducción</option>
                </select>
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="imagen"
                  className="block text-lg font-semibold mb-2 text-green-700"
                >
                  <FontAwesomeIcon icon={faImage} /> Imagen
                </label>
                <input
                  type="file"
                  id="imagen"
                  name="imagen"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="detalles_adicionales"
                  className="block text-lg font-semibold mb-2 text-green-700"
                >
                  <FontAwesomeIcon icon={faClipboardList} /> Detalles Adicionales
                </label>
                <textarea
                  id="detalles_adicionales"
                  name="detalles_adicionales"
                  value={formData.detalles_adicionales}
                  onChange={handleChange}
                  placeholder="Escriba detalles adicionales aquí"
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <motion.button
              type="submit"
              className="w-full py-3 px-6 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-300 mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Registrar Animal
            </motion.button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/" className="text-yellow-700 hover:underline">
              &larr; Volver a la Inicio
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CowForm;
