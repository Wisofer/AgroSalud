import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faUsers, faCalendarAlt, faBullhorn, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

const CommunicationCoordination = () => {
  const communicationFeatures = [
    { icon: faComments, title: 'Mensajería Instantánea', description: 'Comunicación en tiempo real entre miembros del equipo.' },
    { icon: faUsers, title: 'Grupos de Trabajo', description: 'Creación de grupos para proyectos o departamentos específicos.' },
    { icon: faCalendarAlt, title: 'Programación de Eventos', description: 'Organización de reuniones y eventos importantes.' },
    { icon: faBullhorn, title: 'Anuncios', description: 'Difusión de información importante a todo el equipo.' },
    { icon: faExchangeAlt, title: 'Coordinación de Tareas', description: 'Asignación y seguimiento de tareas entre miembros del equipo.' },
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
        Comunicación y Coordinación
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {communicationFeatures.map((feature, index) => (
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
        Una comunicación efectiva y una coordinación eficiente son fundamentales para el éxito de cualquier operación ganadera.
      </motion.p>
    </motion.div>
  );
};

export default CommunicationCoordination;
