import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHorse,
  faCalendarAlt,
  faTag,
  faWeight,
  faVenusMars,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import horseImage from "../../../public/img/img7.jpg";
import { supabase } from "../../supabase/supabase";
import { useAgroSalud } from "../../Context/AgroSaludContext";
import { useNavigate } from "react-router-dom";

const GoatForm = () => {
  const { usuario } = useAgroSalud();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    fechaNacimiento: "",
    numeroEtiqueta: "",
    peso: "",
    genero: "",
    raza: "",
    proposito: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      nombre,
      fechaNacimiento,
      numeroEtiqueta,
      peso,
      genero,
      raza,
      proposito,
    } = formData;
    const meses = calcularMeses(fechaNacimiento);

    const { data, error } = await supabase
      .from("cabras")
      .insert([
        {
          nombre,
          meses,
          numero_etiqueta: numeroEtiqueta,
          peso,
          genero,
          raza,
          proposito,
          usuario_id: usuario.id
        },
      ]);

    if (error) {
      console.error("Error al insertar la cabra:", error);
    } else {
      console.log("Cabra insertada con éxito:", data);
      navigate('/dashboard/perfil-animal');
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
      className="horse-form-container max-w-4xl mx-auto mt-10 bg-gradient-to-br from-yellow-100 to-white"
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
                htmlFor="fechaNacimiento"
                className="block text-lg font-semibold mb-2 text-yellow-700"
              >
                <FontAwesomeIcon icon={faCalendarAlt} /> Nacimiento
              </label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
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
                <FontAwesomeIcon icon={faWeight} /> Peso
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
                <option value="arabe">Árabe</option>
                <option value="pura_sangre">Pura Sangre</option>
                <option value="cuarto_de_milla">Cuarto de Milla</option>
                <option value="andaluz">Andaluz</option>
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
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Enviar
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default GoatForm;
