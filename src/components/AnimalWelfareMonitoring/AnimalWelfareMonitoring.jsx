import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLeaf, faSun, faWater, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const AnimalWelfareMonitoring = () => {
  const welfareAspects = [
    { icon: faHeart, title: 'Salud Emocional', description: 'Monitoreo del estado emocional y niveles de estrés de los animales.' },
    { icon: faLeaf, title: 'Nutrición Adecuada', description: 'Seguimiento de la calidad y cantidad de alimento proporcionado.' },
    { icon: faSun, title: 'Confort Ambiental', description: 'Control de las condiciones de temperatura y humedad del entorno.' },
    { icon: faWater, title: 'Hidratación', description: 'Supervisión del acceso y consumo de agua limpia y fresca.' },
    { icon: faShieldAlt, title: 'Prevención', description: 'Implementación de medidas preventivas para evitar enfermedades y lesiones.' },
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
        Monitoreo del Bienestar Animal
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {welfareAspects.map((aspect, index) => (
          <motion.div 
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <FontAwesomeIcon icon={aspect.icon} className="text-4xl text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{aspect.title}</h2>
            <p className="text-gray-600">{aspect.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.p 
        className="text-center text-gray-700 mt-8 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        El bienestar animal es fundamental para una producción ganadera ética y sostenible.
      </motion.p>
    </motion.div>
  );
};

export default AnimalWelfareMonitoring;
