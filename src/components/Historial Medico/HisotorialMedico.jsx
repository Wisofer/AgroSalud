import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faSyringe,
  faClipboardList,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { supabase } from "../../supabase/supabase";
import { Link } from "react-router-dom";

const HistorialMedico = () => {
  const [monitoreo, setMonitoreo] = useState([]);
  const [vacunacion, setVacunacion] = useState([]);
  const [tratamientos, setTratamientos] = useState([]);
  const [chequeos, setChequeos] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);
  const [loading, setLoading] = useState(true);

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
      const { data: vacunacionData } = await supabase
        .from("vacunaciones")
        .select("*")
        .eq("usuario_id", usuarioId);
      const { data: tratamientosData } = await supabase
        .from("tratamientos")
        .select("*")
        .eq("usuario_id", usuarioId);
      const { data: chequeosData } = await supabase
        .from("chequeos_rutinarios")
        .select("*")
        .eq("usuario_id", usuarioId);

      setMonitoreo(monitoreoData);
      setVacunacion(vacunacionData);
      setTratamientos(tratamientosData);
      setChequeos(chequeosData);
      setTimeout(() => setLoading(false), 3000); // Dilatar el loader por 3 segundos
    };

    fetchData();
  }, [usuarioId]);

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
        className="historial-medico-container max-w-6xl mx-auto mt-10"
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
                icon={faNotesMedical}
                className="text-5xl text-blue-500"
              />
            </div>
          </motion.div>

          {loading ? (
            <DotLoader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="section">
                <h3 className="text-2xl font-bold mb-4 text-blue-700">
                  <FontAwesomeIcon icon={faStethoscope} /> Monitoreo de Salud
                </h3>
                <ul>
                  {monitoreo.map((item) => (
                    <li key={item.id} className="mb-2">
                      <strong>Animal:</strong> {item.nombre_animal} <br />
                      <strong>Especie:</strong> {item.especie} <br />
                      <strong>Fecha:</strong> {item.fecha_consulta} <br />
                      <strong>Diagnóstico:</strong> {item.diagnostico} <br />
                      <strong>Nivel de Actividad:</strong> {item.nivel_actividad}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="section">
                <h3 className="text-2xl font-bold mb-4 text-blue-700">
                  <FontAwesomeIcon icon={faSyringe} /> Vacunación
                </h3>
                <ul>
                  {vacunacion.map((item) => (
                    <li key={item.id} className="mb-2">
                      <strong>Animal:</strong> {item.nombre_animal} <br />
                      <strong>Especie:</strong> {item.especie} <br />
                      <strong>Vacuna:</strong> {item.vacuna} <br />
                      <strong>Fecha:</strong> {item.fecha_vacunacion}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="section">
                <h3 className="text-2xl font-bold mb-4 text-blue-700">
                  <FontAwesomeIcon icon={faClipboardList} /> Tratamientos
                </h3>
                <ul>
                  {tratamientos.map((item) => (
                    <li key={item.id} className="mb-2">
                      <strong>Animal:</strong> {item.nombre_animal} <br />
                      <strong>Especie:</strong> {item.especie} <br />
                      <strong>Tratamiento:</strong> {item.tratamiento} <br />
                      <strong>Fecha de Inicio:</strong> {item.fecha_inicio} <br />
                      <strong>Fecha de Fin:</strong> {item.fecha_fin} <br />
                      <strong>Notas:</strong> {item.notas}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="section">
                <h3 className="text-2xl font-bold mb-4 text-blue-700">
                  <FontAwesomeIcon icon={faClipboardList} /> Chequeos Rutinarios
                </h3>
                <ul>
                  {chequeos.map((item) => (
                    <li key={item.id} className="mb-2">
                      <strong>Animal:</strong> {item.nombre_animal} <br />
                      <strong>Especie:</strong> {item.especie} <br />
                      <strong>Fecha del Chequeo:</strong> {item.fecha_chequeo}{" "}
                      <br />
                      <strong>Resultados:</strong> {item.resultados} <br />
                      <strong>Notas:</strong> {item.notas}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link to="/dashboard" className="text-blue-500 hover:underline">
              Volver al Dashboard
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HistorialMedico;
