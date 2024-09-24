import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faRobot, faDatabase, faLightbulb, faCog } from '@fortawesome/free-solid-svg-icons';

const DataAutomationAnalysis = () => {
  const features = [
    { icon: faChartLine, title: 'Análisis Avanzado', description: 'Herramientas de análisis estadístico y predictivo para datos ganaderos.' },
    { icon: faRobot, title: 'Automatización', description: 'Procesos automatizados para la recopilación y procesamiento de datos.' },
    { icon: faDatabase, title: 'Gestión de Datos', description: 'Almacenamiento seguro y eficiente de grandes volúmenes de datos.' },
    { icon: faLightbulb, title: 'Insights Inteligentes', description: 'Generación automática de insights y recomendaciones.' },
    { icon: faCog, title: 'Integración', description: 'Integración con sistemas y dispositivos existentes en la granja.' },
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl font-bold text-center text-blue-800 mb-8"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
      >
        Análisis y Automatización de Datos
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <FontAwesomeIcon icon={feature.icon} className="text-4xl text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.p 
        className="text-center text-gray-700 mt-8 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Optimiza tu operación ganadera con análisis de datos avanzados y procesos automatizados.
      </motion.p>
    </motion.div>
  );
};

export default DataAutomationAnalysis;
