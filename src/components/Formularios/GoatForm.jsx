import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHorse,
  faCalendarAlt,
  faTag,
  faWeight,
  faVenusMars,
  faClipboardList,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import horseImage from "../../../public/img/img7.jpg";
import audio2 from "../../../public/audios/audio2.mp3";
import { supabase } from "../../supabase/supabase";
import { useAgroSalud } from "../../Context/AgroSaludContext";
import { useNavigate, Link } from "react-router-dom";

const GoatForm = () => {
  const { usuario } = useAgroSalud();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    meses: "",
    numeroEtiqueta: "",
    peso: "",
    genero: "",
    raza: "",
    proposito: "",
    imagen: null,
    detalles_adicionales: "",
  });

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
    const {
      nombre,
      meses,
      numeroEtiqueta,
      peso,
      genero,
      raza,
      proposito,
      imagen,
      detalles_adicionales,
    } = formData;

    const { data, error } = await supabase
      .from("cabras")
      .insert([
        {
          nombre,
          meses: parseInt(meses),
          numero_etiqueta: numeroEtiqueta,
          peso,
          genero,
          raza,
          proposito,
          imagen,
          detalles_adicionales,
          usuario_id: usuario.id
        },
      ]);

    if (error) {
      console.error("Error al insertar la cabra:", error);
    } else {
      console.log("Cabra insertada con éxito:", data);
      
      const audio = new Audio(audio2);
      audio.play().catch(error => {
        console.error("Error al reproducir el audio:", error);
      });

      navigate('/dashboard/perfil-animal');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-blue-100 font-montserrat relative flex items-center justify-center">
      <motion.div
        className="goat-form-container max-w-4xl mx-auto mt-10"
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
              Formulario de Cabra
            </h2>
            <div className="text-center">
              <motion.img
                src={horseImage}
                alt="Caballo"
                className="w-40 h-40 mx-auto rounded-full transition-transform duration-300 hover:scale-110 border-4 border-white"
                whileHover={{ rotate: 10 }}
              />
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group mb-4">
                <label
                  htmlFor="nombre"
                  className="block text-lg font-semibold mb-2 text-yellow-700"
                >
                  <FontAwesomeIcon icon={faHorse} /> Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre"
                  className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="meses"
                  className="block text-lg font-semibold mb-2 text-yellow-700"
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
                  className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="numeroEtiqueta"
                  className="block text-lg font-semibold mb-2 text-yellow-700"
                >
                  <FontAwesomeIcon icon={faTag} /> Etiqueta
              </label>
              <input
                type="text"
                id="numeroEtiqueta"
                name="numeroEtiqueta"
                value={formData.numeroEtiqueta}
                onChange={handleChange}
                placeholder="Etiqueta"
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="peso"
                className="block text-lg font-semibold mb-2 text-yellow-700"
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
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="raza"
                className="block text-lg font-semibold mb-2 text-yellow-700"
              >
                <FontAwesomeIcon icon={faClipboardList} /> Raza
              </label>
              <select
                id="raza"
                name="raza"
                value={formData.raza}
                onChange={handleChange}
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Seleccione</option>
                <option value="saanen">Saanen</option>
                <option value="alpina">Alpina</option>
                <option value="nubia">Nubia</option>
                <option value="boer">Boer</option>
                <option value="criolla">Criolla</option>
                <option value="lamancha">LaMancha</option>
              </select>
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="genero"
                className="block text-lg font-semibold mb-2 text-yellow-700"
              >
                <FontAwesomeIcon icon={faVenusMars} /> Género
              </label>
              <select
                id="genero"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Seleccione</option>
                <option value="macho">Macho</option>
                <option value="hembra">Hembra</option>
              </select>
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="proposito"
                className="block text-lg font-semibold mb-2 text-yellow-700"
              >
                <FontAwesomeIcon icon={faClipboardList} /> Propósito
              </label>
              <select
                id="proposito"
                name="proposito"
                value={formData.proposito}
                onChange={handleChange}
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Seleccione</option>
                <option value="carreras">Carreras</option>
                <option value="salto">Salto</option>
                <option value="doma">Doma</option>
                <option value="recreacion">Recreación</option>
              </select>
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="imagen"
                className="block text-lg font-semibold mb-2 text-yellow-700"
              >
                <FontAwesomeIcon icon={faImage} /> Imagen
              </label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
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
                placeholder="Detalles adicionales"
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Registrar Animal
            </button>
          </div>
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

export default GoatForm;
