import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope, faEdit, faEye, faTimes  } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";

const ResultadoMonitoreoMedico = () => {
  const [monitoreo, setMonitoreo] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre_animal: "",
    especie: "",
    fecha_consulta: "",
    diagnostico: "",
    nivel_actividad: ""
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

      const { data: monitoreoData } = await supabase
        .from("monitoreo_medico")
        .select("*")
        .eq("usuario_id", usuarioId);

      setMonitoreo(monitoreoData);
      setTimeout(() => setLoading(false), 3000); // Dilatar el loader por 3 segundos
    };

    fetchData();
  }, [usuarioId]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(monitoreo.map(item => ({
      nombre_animal: item.nombre_animal,
      especie: item.especie,
      fecha_consulta: item.fecha_consulta,
      diagnostico: item.diagnostico,
      nivel_actividad: item.nivel_actividad
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Monitoreo Médico");
    XLSX.writeFile(workbook, "monitoreo_medico.xlsx");
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
      .from("monitoreo_medico")
      .update(updatedData)
      .eq("id", id);

    if (error) {
      console.error("Error actualizando el monitoreo:", error);
    } else {
      setMonitoreo(monitoreo.map(item => (item.id === id ? { ...item, ...updatedData } : item)));
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
        className="resultado-monitoreo-container max-w-6xl mx-auto mt-10"
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
            className="card-header bg-blue-200 p-6 rounded-t-lg shadow-md mb-6 flex justify-between items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">
              Resultados de Monitoreo Médico
            </h2>

            <div className="text-center">
              <FontAwesomeIcon
                icon={faStethoscope}
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
              {monitoreo.map((item) => (
                <div key={item.id} className="section mb-4 border border-gray-300 rounded-lg p-4 shadow-md">
                  <h3 className="text-2xl font-bold mb-2 text-blue-700">
                    {item.nombre_animal}
                  </h3>
                  <p>
                    <strong>Especie:</strong> {item.especie}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {item.fecha_consulta}
                  </p>
                  <p>
                    <strong>Diagnóstico:</strong> {item.diagnostico}
                  </p>
                  <p>
                    <strong>Nivel de Actividad:</strong> {item.nivel_actividad}
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
                  {isEditing ? "Editar Monitoreo" : "Detalles del Monitoreo"}
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
                      <strong>Fecha de Consulta:</strong>
                      <input
                        type="date"
                        name="fecha_consulta"
                        value={formData.fecha_consulta}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </label>
                    <label className="block mb-2">
                      <strong>Diagnóstico:</strong>
                      <input
                        type="text"
                        name="diagnostico"
                        value={formData.diagnostico}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </label>
                    <label className="block mb-2">
                      <strong>Nivel de Actividad:</strong>
                      <input
                        type="text"
                        name="nivel_actividad"
                        value={formData.nivel_actividad}
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
                        className="mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors duración-300"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div >
                    <p><strong>Nombre del Animal:</strong> {modalContent.nombre_animal}</p>
                    <p><strong>Especie:</strong> {modalContent.especie}</p>
                    <p><strong>Fecha de Consulta:</strong> {modalContent.fecha_consulta}</p>
                    <p><strong>Diagnóstico:</strong> {modalContent.diagnostico}</p>
                    <p><strong>Nivel de Actividad:</strong> {modalContent.nivel_actividad}</p>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={closeModal}
                        className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors duración-300"
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

export default ResultadoMonitoreoMedico;
