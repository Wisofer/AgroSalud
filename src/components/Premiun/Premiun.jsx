import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faCheck } from '@fortawesome/free-solid-svg-icons';

const Premiun = () => {
  const beneficios = [
    'Acceso ilimitado a todas las funciones',
    'Soporte prioritario 24/7',
    'Análisis avanzados de salud animal',
    'Integración con sistemas de gestión ganadera',
    'Actualizaciones exclusivas',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-400 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        <FontAwesomeIcon icon={faCrown} className="text-yellow-600 mr-2" />
        Plan Premium
      </h1>
      
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Mejora tu experiencia con AgroSalud
        </h2>
        
        <ul className="space-y-4 mb-8">
          {beneficios.map((beneficio, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
              {beneficio}
            </li>
          ))}
        </ul>
        
        <div className="text-center">
          <p className="text-2xl font-bold mb-4 text-gray-800">
            Solo por $9.99/mes
          </p>
          <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full hover:bg-yellow-600 transition duration-300">
            Actualizar a Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premiun;
