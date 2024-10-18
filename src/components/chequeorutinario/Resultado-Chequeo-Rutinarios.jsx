import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";

const ResultadoChequeoRutinarios = () => {
  const [chequeos, setChequeos] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre_animal: "",
    especie: "",
    fecha_chequeo: "",
    resultados: "",
    notas: ""
  });

  useEffect(() => {
    const obtenerUsuarioId = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error obteniendo el usuario:", error);
      }
      if (user) {
        setUsuarioId(user.id);
        console.log("Usuario ID:", user.id);
      } else {
        console.log("No hay usuario autenticado");
      }
    };
    obtenerUsuarioId();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!usuarioId) return;

      const { data: chequeosData } = await supabase
        .from("chequeos_rutinarios")
        .select("*")
        .eq("usuario_id", usuarioId);

      setChequeos(chequeosData);
      setTimeout(() => setLoading(false), 3000); // Dilatar el loader por 3 segundos
    };

    fetchData();
  }, [usuarioId]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(chequeos.map(item => ({
      nombre_animal: item.nombre_animal,
      especie: item.especie,
      fecha_chequeo: item.fecha_chequeo,
      resultados: item.resultados,
      notas: item.notas
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Chequeos Rutinarios");
    XLSX.writeFile(workbook, "chequeos_rutinarios.xlsx");
  };

  const openModal = (content, editing = false) => {
    setModalContent(content);
    setIsEditing(editing);
    setFormData(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent(null);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const { id, ...updatedData } = formData;
    const { error } = await supabase
      .from("chequeos_rutinarios")
      .update(updatedData)
      .eq("id", id);

    if (error) {
      console.error("Error actualizando el chequeo:", error);
    } else {
      setChequeos(chequeos.map(item => (item.id === id ? { ...item, ...updatedData } : item)));
      closeModal();
    }
  };

  const DotLoader = () => (
    <div className="flex justify-center items-center space-x-2 mt-16">
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-400"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-8 font-montserrat">
      <motion.div
        className="resultado-chequeo-container max-w-6xl mx-auto mt-10"
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
              Resultados de Chequeos Rutinarios
            </h2>
            <div className="text-center">
              <FontAwesomeIcon
                icon={faClipboardList}
                className="text-5xl text-blue-500"
              />
            </div>
          </motion.div>

          <div className="flex justify-end mb-6">
            <button
              onClick={exportToExcel}
              className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-300"
            >
              Exportar todo a Excel
            </button>
          </div>

          {loading ? (
            <DotLoader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chequeos.map((item) => (
                <div key={item.id} className="section mb-4 border border-gray-300 rounded-lg p-4 shadow-md">
                  <h3 className="text-2xl font-bold mb-2 text-blue-700">
                    {item.nombre_animal}
                  </h3>
                  <p>
                    <strong>Especie:</strong> {item.especie}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {item.fecha_chequeo}
                  </p>
                  <p>
                    <strong>Observaciones:</strong> {item.resultados}
                  </p>
                  <p>
                    <strong>Estado de Salud:</strong> {item.notas}
                  </p>
                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      onClick={() => openModal(item)}
                      className="py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faEye} /> Ver
                    </button>
                    <button
                      onClick={() => openModal(item, true)}
                      className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faEdit} /> Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      {modalIsOpen && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal bg-white p-8 rounded-lg shadow-lg relative border border-gray-300">
            {modalContent && (
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  {isEditing ? "Editar Chequeo" : "Detalles del Chequeo"}
                </h2>
                {isEditing ? (
                  <div>
                    <label className="block mb-2">
                      <strong>Nombre del Animal:</strong>
                      <input
                        type="text"
                        name="nombre_animal"
                        value={formData.nombre_animal}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </label>
                    <label className="block mb-2">
                      <strong>Especie:</strong>
                      <select
                        name="especie"
                        value={formData.especie}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        <option value="">Seleccione una especie</option>
                        <option value="Vacas">Vacas</option>
                        <option value="Cerdos">Cerdos</option>
                        <option value="Cabras">Cabras</option>
                        <option value="Caballos">Caballos</option>
                        <option value="Aves">Aves</option>
                        <option value="Perros">Perros</option>
                        <option value="Gatos">Gatos</option>
                        <option value="Ovejas">Ovejas</option>
                        <option value="Conejos">Conejos</option>
                        <option value="Avestruces">Avestruces</option>
                      </select>
                    </label>
                    <label className="block mb-2">
                      <strong>Fecha de Chequeo:</strong>
                      <input
                        type="date"
                        name="fecha_chequeo"
                        value={formData.fecha_chequeo}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </label>
                    <label className="block mb-2">
                      <strong>Observaciones:</strong>
                      <input
                        type="text"
                        name="resultados"
                        value={formData.resultados}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </label>
                    <label className="block mb-2">
                      <strong>Estado de Salud:</strong>
                      <input
                        type="text"
                        name="notas"
                        value={formData.notas}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </label>
                    <div className="flex justify-between">
                      <button
                        onClick={handleSave}
                        className="mt-4 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-300"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={closeModal}
                        className="mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors duration-300"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p><strong>Nombre del Animal:</strong> {modalContent.nombre_animal}</p>
                    <p><strong>Especie:</strong> {modalContent.especie}</p>
                    <p><strong>Fecha de Chequeo:</strong> {modalContent.fecha_chequeo}</p>
                    <p><strong>Observaciones:</strong> {modalContent.resultados}</p>
                    <p><strong>Estado de Salud:</strong> {modalContent.notas}</p>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={closeModal}
                        className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors duration-300"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultadoChequeoRutinarios;
