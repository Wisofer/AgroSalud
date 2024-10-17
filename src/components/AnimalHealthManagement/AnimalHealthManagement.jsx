import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faSyringe, faPills, faStethoscope, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AnimalHealthManagement = () => {
    const navigate = useNavigate();

    // Prefijo de la ruta padre
    const baseRoute = '/dashboard'; // Cambia aquí si el prefijo de la ruta cambia

    const items = [
        { icon: faHeartbeat, title: 'Monitoreo de Salud', description: 'Seguimiento continuo del estado de salud de los animales.', route: `${baseRoute}/monitoreo-medico` },
        { icon: faSyringe, title: 'Vacunación', description: 'Programación y registro de vacunas para prevenir enfermedades.', route: `${baseRoute}/vacunacion` },
        { icon: faPills, title: 'Tratamientos', description: 'Administración y seguimiento de tratamientos médicos.', route: `${baseRoute}/tratamiento` },
        { icon: faStethoscope, title: 'Chequeos Rutinarios', description: 'Planificación y registro de exámenes de salud periódicos.', route: `${baseRoute}/chequeos-rutinarios` },
        { icon: faClipboardList, title: 'Historial Médico', description: 'Mantenimiento de registros médicos detallados para cada animal.', route: `${baseRoute}/historial-medico` },
    ];

    const handleNavigation = (route) => {
        // Navega a la nueva ruta y reemplaza la entrada en el historial
        navigate(route, { replace: true });
    };

    return (
        <motion.div 
            className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1 
                className="text-4xl font-bold text-center text-green-800 mb-8"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            >
                Gestión de Salud Animal
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, index) => (
                    <motion.div 
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        onClick={() => handleNavigation(item.route)} // Llama a la función de navegación
                    >
                        <FontAwesomeIcon icon={item.icon} className="text-4xl text-green-500 mb-4" />
                        <h2 className="text-xl font-semibold text-green-700 mb-2">{item.title}</h2>
                        <p className="text-gray-600">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default AnimalHealthManagement;
