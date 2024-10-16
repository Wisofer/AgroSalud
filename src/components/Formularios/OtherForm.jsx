import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faCalendarAlt,
  faTag,
  faWeight,
  faVenusMars,
  faClipboardList,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { supabase } from "../../supabase/supabase";
import { useAgroSalud } from "../../Context/AgroSaludContext";
import { useNavigate, Link } from "react-router-dom";

const OtherForm = () => {
  const { usuario } = useAgroSalud();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    especie: "",
    fechaNacimiento: "",
    numeroEtiqueta: "",
    peso: "",
    genero: "",
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
    setFormData({
      ...formData,
      imagen: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const {
      nombre,
      especie,
      fechaNacimiento,
      numeroEtiqueta,
      peso,
      genero,
      proposito,
      imagen,
      detalles_adicionales,
    } = formData;
    const imagenBytes = await convertToBytes(imagen);

    try {
      const { data, error } = await supabase.from("otros_animales").insert([
        {
          nombre,
          especie,
          fecha_nacimiento: fechaNacimiento,
          numero_etiqueta: numeroEtiqueta,
          peso: parseInt(peso),
          genero,
          proposito,
          imagen: imagenBytes,
          detalles_adicionales,
          usuario_id: usuario.id,
        },
      ]);

      if (error) throw error;

      console.log("Animal registrado con éxito:", data);
      navigate("/dashboard/perfil-animal");
    } catch (error) {
      console.error("Error al registrar el animal:", error);
      setError(
        "Hubo un error al registrar el animal. Por favor, inténtalo de nuevo."
      );
    }
  };

  const convertToBytes = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-blue-100 font-montserrat relative flex items-center justify-center">
      <motion.div
        className="other-form-container max-w-4xl mx-auto mt-10"
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
            className="card-header bg-purple-200 p-6 rounded-t-lg shadow-md mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-center mb-4 text-purple-800">
              Formulario de Otro Animal
            </h2>
          </motion.div>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group mb-4">
                <label
                  htmlFor="nombre"
                  className="block text-lg font-semibold mb-2 text-purple-700"
                >
                  <FontAwesomeIcon icon={faPaw} /> Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre del animal"
                  className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="especie"
                  className="block text-lg font-semibold mb-2 text-purple-700"
                >
                  <FontAwesomeIcon icon={faClipboardList} /> Especie
                </label>
                <select
                  id="especie"
                  name="especie"
                  value={formData.especie}
                  onChange={handleChange}
                  className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Seleccione la especie</option>
                  <option value="oveja">Oveja</option>
                  <option value="gallina">Gallina</option>
                  <option value="pato">Pato</option>
                  <option value="conejo">Conejo</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="fechaNacimiento"
                  className="block text-lg font-semibold mb-2 text-purple-700"
                >
                  <FontAwesomeIcon icon={faCalendarAlt} /> Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="numeroEtiqueta"
                  className="block text-lg font-semibold mb-2 text-purple-700"
                >
                  <FontAwesomeIcon icon={faTag} /> Número de Etiqueta
              </label>
              <input
                type="text"
                id="numeroEtiqueta"
                name="numeroEtiqueta"
                value={formData.numeroEtiqueta}
                onChange={handleChange}
                placeholder="Número de etiqueta"
                className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="peso"
                className="block text-lg font-semibold mb-2 text-purple-700"
              >
                <FontAwesomeIcon icon={faWeight} /> Peso
              </label>
              <input
                type="number"
                id="peso"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                placeholder="Peso en kg"
                className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="genero"
                className="block text-lg font-semibold mb-2 text-purple-700"
              >
                <FontAwesomeIcon icon={faVenusMars} /> Género
              </label>
              <select
                id="genero"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleccione el género</option>
                <option value="macho">Macho</option>
                <option value="hembra">Hembra</option>
              </select>
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="proposito"
                className="block text-lg font-semibold mb-2 text-purple-700"
              >
                <FontAwesomeIcon icon={faClipboardList} /> Propósito
              </label>
              <select
                id="proposito"
                name="proposito"
                value={formData.proposito}
                onChange={handleChange}
                className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seleccione el propósito</option>
                <option value="carne">Carne</option>
                <option value="leche">Leche</option>
                <option value="huevos">Huevos</option>
                <option value="lana">Lana</option>
                <option value="mascota">Mascota</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="detalles_adicionales"
                className="block text-lg font-semibold mb-2 text-purple-700"
              >
                <FontAwesomeIcon icon={faClipboardList} /> Detalles Adicionales
              </label>
              <textarea
                id="detalles_adicionales"
                name="detalles_adicionales"
                value={formData.detalles_adicionales}
                onChange={handleChange}
                placeholder="Escriba detalles adicionales"
                className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="imagen"
              className="block text-lg font-semibold mb-2 text-purple-700"
            >
              <FontAwesomeIcon icon={faImage} /> Imagen del Animal
            </label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <motion.button
            type="submit"
            className="w-full py-3 px-6 bg-purple-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-colors duration-300 mt-8"
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

export default OtherForm;
