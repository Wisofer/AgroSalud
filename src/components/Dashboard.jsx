import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChartLine,
  faCog,
  faSignOutAlt,
  faCow,
  faPiggyBank,
  faHorse,
  faPaw,
  faHeartbeat,
  faClipboardCheck,
  faComments,
  faChartBar,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link, Outlet } from "react-router-dom";
import img9 from "../../public/img/img9.jpg"

const Dashboard = () => {
  const [animalData, setAnimalData] = useState({
    vacas: 0,
    cerdos: 0,
    cabras: 0,
    otros: 0,
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Aquí simularemos la obtención de datos de los formularios
    // En una aplicación real, esto vendría de una API o base de datos
    const fetchData = async () => {
      // Simulación de datos
      const data = {
        vacas: 15,
        cerdos: 8,
        cabras: 12,
        otros: 5,
      };
      setAnimalData(data);
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <motion.aside
        className={`bg-gray-800 text-white transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
        initial={{ x: sidebarOpen ? 0 : -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center py-6">
          {sidebarOpen ? (
            <h2 className="text-2xl font-bold text-white mb-4">AgroSalud</h2>
          ) : (
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
              <span className="text-gray-800 text-xl font-bold">AS</span>
            </div>
          )}
          <button
            className="text-white hover:text-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-2"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon
              icon={sidebarOpen ? faSignOutAlt : faBars}
              className="text-xl"
            />
          </button>
        </div>
        <nav className="mt-8">
          {[
            { to: "/dashboard", icon: faHome, text: "Inicio" },
            {
              to: "/dashboard/perfil-animal",
              icon: faPaw,
              text: "Perfil Animal",
            },
            {
              to: "/dashboard/gestion-salud-animal",
              icon: faHeartbeat,
              text: "Gestión de Salud",
            },
            {
              to: "/dashboard/monitoreo-bienestar-animal",
              icon: faClipboardCheck,
              text: "Monitoreo",
            },
            {
              to: "/dashboard/comunicacion-coordinacion",
              icon: faComments,
              text: "Comunicación",
            },
            {
              to: "/dashboard/analisis-automatizacion-datos",
              icon: faChartBar,
              text: "Análisis de Datos",
            },
            {
              to: "/dashboard/configuracion",
              icon: faCog,
              text: "Configuración",
            },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`flex items-center py-3 px-6 hover:bg-gray-700 transition-colors duration-200 ${
                sidebarOpen ? "justify-start" : "justify-center"
              }`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={`text-xl ${sidebarOpen ? "mr-4" : ""}`}
              />
              {sidebarOpen && <span>{item.text}</span>}
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <header className="bg-gradient-to-r from-green-600 to-indigo-800 shadow-lg p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">
            Panel de Control
          </h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <img src={img9} alt="Avatar del usuario" className="w-10 h-10 rounded-full border-2 border-white" />
              <p className="text-white font-medium">Bienvenido, Sr. William</p>
            </div>
            <button className="bg-white text-indigo-800 hover:bg-indigo-100 font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out shadow-md hover:shadow-lg">
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
