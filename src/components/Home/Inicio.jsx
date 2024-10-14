import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCow, faPiggyBank, faHorse, faPaw, faChartLine, faCalendarAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import img10 from '../../../public/img/1.jpg'

const Inicio = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">Bienvenido al Panel de Control</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Resumen de Animales */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resumen de Animales</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCow} className="text-3xl text-blue-500 mr-3" />
              <span className="text-lg">Vacas: 15</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPiggyBank} className="text-3xl text-pink-500 mr-3" />
              <span className="text-lg">Cerdos: 8</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faHorse} className="text-3xl text-green-500 mr-3" />
              <span className="text-lg">Cabras: 12</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPaw} className="text-3xl text-purple-500 mr-3" />
              <span className="text-lg">Otros: 5</span>
            </div>
          </div>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Estadísticas Rápidas</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg">Producción de leche hoy:</span>
              <span className="text-lg font-bold text-green-600">250 L</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg">Animales en tratamiento:</span>
              <span className="text-lg font-bold text-yellow-600">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg">Nacimientos este mes:</span>
              <span className="text-lg font-bold text-blue-600">5</span>
            </div>
          </div>
        </div>

        {/* Imagen Destacada */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Imagen del Día</h2>
          <img src={img10} alt="Imagen del día" className="w-full h-48 object-cover rounded-lg" />
          <p className="mt-4 text-gray-600">Nuestro nuevo ternero, nacido ayer.</p>
        </div>
      </div>

      {/* Gráfico y Calendario */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rendimiento Semanal</h2>
          <div className="h-64 flex items-center justify-center">
            <FontAwesomeIcon icon={faChartLine} className="text-6xl text-indigo-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Calendario de Eventos</h2>
          <div className="h-64 flex items-center justify-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-6xl text-indigo-500" />
          </div>
        </div>
      </div>

      {/* Notificaciones */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notificaciones Recientes</h2>
        <ul className="space-y-4">
          <li className="flex items-center">
            <FontAwesomeIcon icon={faBell} className="text-2xl text-yellow-500 mr-3" />
            <span>Recordatorio: Vacunación programada para mañana.</span>
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon icon={faBell} className="text-2xl text-green-500 mr-3" />
            <span>Nueva actualización del sistema disponible.</span>
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon icon={faBell} className="text-2xl text-red-500 mr-3" />
            <span>Alerta: Temperatura elevada detectada en el establo 2.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Inicio;
