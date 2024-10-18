import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCow,
  faPiggyBank,
  faChartLine,
  faCalendarAlt,
  faBell,
  faThermometerHalf,
  faSyringe,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../supabase/supabase";
import cabra from "../../../public/img/cabra.png";
import añadir from "../../../public/img/anadir.png";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Inicio = () => {
  const [animalCounts, setAnimalCounts] = useState({
    vacas: 0,
    cerdos: 0,
    cabras: 0,
    otros: 0,
  });
  const [usuarioId, setUsuarioId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [estadisticas, setEstadisticas] = useState({
    monitoreo: 0,
    vacunacion: 0,
    tratamientos: 0,
    chequeos: 0,
  });

  useEffect(() => {
    const obtenerUsuarioId = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error obteniendo el usuario:", error);
      }
      if (user) {
        setUsuarioId(user.id);
      } else {
        console.log("No hay usuario autenticado");
      }
    };
    obtenerUsuarioId();
  }, []);

  useEffect(() => {
    const fetchAnimalCounts = async () => {
      if (!usuarioId) return;

      try {
        const { data: vacas, error: vacasError } = await supabase
          .from("vacas")
          .select("*")
          .eq("usuario_id", usuarioId);
        const { data: cerdos, error: cerdosError } = await supabase
          .from("cerdos")
          .select("*")
          .eq("usuario_id", usuarioId);
        const { data: cabras, error: cabrasError } = await supabase
          .from("cabras")
          .select("*")
          .eq("usuario_id", usuarioId);
        const { data: otros, error: otrosError } = await supabase
          .from("otros_animales")
          .select("*")
          .eq("usuario_id", usuarioId);

        if (vacasError) throw vacasError;
        if (cerdosError) throw cerdosError;
        if (cabrasError) throw cabrasError;
        if (otrosError) throw otrosError;

        setAnimalCounts({
          vacas: vacas.length,
          cerdos: cerdos.length,
          cabras: cabras.length,
          otros: otros.length,
        });
      } catch (error) {
        console.error("Error fetching animal counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalCounts();
  }, [usuarioId]);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      if (!usuarioId) return;

      try {
        const { data: monitoreoData, error: monitoreoError } = await supabase
          .from("monitoreo_medico")
          .select("*")
          .eq("usuario_id", usuarioId);
        const { data: vacunacionData, error: vacunacionError } = await supabase
          .from("vacunaciones")
          .select("*")
          .eq("usuario_id", usuarioId);
        const { data: tratamientosData, error: tratamientosError } = await supabase
          .from("tratamientos")
          .select("*")
          .eq("usuario_id", usuarioId);
        const { data: chequeosData, error: chequeosError } = await supabase
          .from("chequeos_rutinarios")
          .select("*")
          .eq("usuario_id", usuarioId);

        if (monitoreoError) throw monitoreoError;
        if (vacunacionError) throw vacunacionError;
        if (tratamientosError) throw tratamientosError;
        if (chequeosError) throw chequeosError;

        setEstadisticas({
          monitoreo: monitoreoData.length,
          vacunacion: vacunacionData.length,
          tratamientos: tratamientosData.length,
          chequeos: chequeosData.length,
        });
      } catch (error) {
        console.error("Error fetching estadisticas:", error);
      }
    };

    fetchEstadisticas();
  }, [usuarioId]);

  const DotLoader = () => (
    <div className="flex justify-center items-center space-x-2 mt-16">
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-400"></div>
    </div>
  );

  const totalAnimales = 20;
  const animalesRegistrados = animalCounts.vacas + animalCounts.cerdos + animalCounts.cabras + animalCounts.otros;
  const porcentajeRegistrados = (animalesRegistrados / totalAnimales) * 100;
  const porcentajeBuenasPracticas = ((estadisticas.vacunacion + estadisticas.tratamientos) / animalesRegistrados) * 100;

  const data = {
    labels: ['Vacas', 'Cerdos', 'Cabras', 'Otros'],
    datasets: [
      {
        label: 'Distribución de Animales',
        data: [animalCounts.vacas, animalCounts.cerdos, animalCounts.cabras, animalCounts.otros],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-montserrat">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">
        Bienvenido al Panel de Control
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Resumen de Animales */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Resumen de Animales
          </h2>
          {loading ? (
            <DotLoader />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faCow}
                  className="text-3xl text-blue-500 mr-3"
                />
                <span className="text-lg">Vacas: {animalCounts.vacas}</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faPiggyBank}
                  className="text-3xl text-pink-500 mr-3"
                />
                <span className="text-lg">Cerdos: {animalCounts.cerdos}</span>
              </div>
              <div className="flex items-center">
                <img
                  src={cabra}
                  alt="Cabra"
                  className="w-8 h-8 mr-3"
                />
                <span className="text-lg">Cabras: {animalCounts.cabras}</span>
              </div>
              <div className="flex items-center">
                <img
                  src={añadir}
                  alt="Añadir"
                  className="w-8 h-8 mr-3"
                />
                <span className="text-lg">Otros: {animalCounts.otros}</span>
              </div>
            </div>
          )}
        </div>

        {/* Estadísticas Rápidas */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Estadísticas Rápidas
          </h2>
          {loading ? (
            <DotLoader />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg">Monitoreo de Salud:</span>
                <span className="text-lg font-bold text-green-600">{estadisticas.monitoreo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg">Vacunación:</span>
                <span className="text-lg font-bold text-yellow-600">{estadisticas.vacunacion}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg">Tratamientos:</span>
                <span className="text-lg font-bold text-blue-600">{estadisticas.tratamientos}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg">Chequeos Rutinarios:</span>
                <span className="text-lg font-bold text-red-600">{estadisticas.chequeos}</span>
              </div>
            </div>
          )}
        </div>

        {/* Indicadores de Buenas Prácticas */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Indicadores de Buenas Prácticas
          </h2>
          {loading ? (
            <DotLoader />
          ) : (
            <div className="flex items-center justify-center h-48">
              <span className="text-6xl font-bold text-green-600">{porcentajeBuenasPracticas.toFixed(2)}%</span>
            </div>
          )}
        </div>

        {/* Progreso de Registro de Animales */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Progreso de Registro de Animales
          </h2>
          {loading ? (
            <DotLoader />
          ) : (
            <div className="flex items-center justify-center h-48">
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div className="bg-blue-600 h-6 rounded-full" style={{ width: `${porcentajeRegistrados}%` }}></div>
              </div>
              <span className="ml-4 text-xl font-bold text-blue-600">{porcentajeRegistrados.toFixed(2)}%</span>
            </div>
          )}
          <p className="mt-4 text-gray-600">
            ¡Sigue registrando más animales para alcanzar la meta de 20!
          </p>
        </div>

        {/* Distribución de Animales */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Distribución de Animales
          </h2>
          {loading ? (
            <DotLoader />
          ) : (
            <div className="h-64">
              <Pie data={data} />
            </div>
          )}
        </div>
      </div>

      {/* Notificaciones */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Notificaciones Recientes
        </h2>
        <ul className="space-y-4">
          <li className="flex items-center">
            <FontAwesomeIcon
              icon={faBell}
              className="text-2xl text-yellow-500 mr-3"
            />
            <span>Recordatorio: Vacunación programada para mañana.</span>
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon
              icon={faBell}
              className="text-2xl text-green-500 mr-3"
            />
            <span>Nueva actualización del sistema disponible.</span>
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon
              icon={faBell}
              className="text-2xl text-red-500 mr-3"
            />
            <span>Alerta: Temperatura elevada detectada en el establo 2.</span>
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon
              icon={faThermometerHalf}
              className="text-2xl text-blue-500 mr-3"
            />
            <span>Revisión de temperatura del establo completada.</span>
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon
              icon={faSyringe}
              className="text-2xl text-purple-500 mr-3"
            />
            <span>Vacunación de animales completada.</span>
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon
              icon={faSeedling}
              className="text-2xl text-green-500 mr-3"
            />
            <span>Nuevo lote de alimento orgánico recibido.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Inicio;
