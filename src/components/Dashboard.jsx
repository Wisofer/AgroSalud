import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faUser,
  faChartPie,
  faCog,
  faSignOutAlt,
  faCow,
  faPiggyBank,
  faHorse,
  faPaw,
  faHeartbeat,
  faClipboardCheck,
  faComments,
  faRobot,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link, Outlet } from "react-router-dom";

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
        className={`bg-green-700 text-white p-6 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
        initial={{ x: sidebarOpen ? 0 : -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          {sidebarOpen && <h2 className="text-3xl font-bold">AgroSalud</h2>}
          <button
            className="text-white hover:text-green-200 transition-colors duration-200"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={sidebarOpen ? faSignOutAlt : faBars} />
          </button>
        </div>
        <nav className="space-y-4">
          {[
            { to: "/dashboard/perfil-animal", icon: faPaw, text: "Perfil del Animal" },
            { to: "/dashboard/gestion-salud-animal", icon: faDashboard, text: "Gestión" },
            { to: "/dashboard/monitoreo-bienestar-animal", icon: faHeartbeat, text: "Bienestar Animal" },
            { to: "/dashboard/monitoreo-bienestar-animal", icon: faClipboardCheck, text: "Monitoreo" },
            { to: "/dashboard/comunicacion-coordinacion", icon: faComments, text: "Comunicación" },
            { to: "/dashboard/comunicacion-coordinacion", icon: faChartPie, text: "Coordinación" },
            { to: "/dashboard/analisis-automatizacion-datos", icon: faRobot, text: "Análisis de Datos" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={item.icon} className="text-xl" />
              {sidebarOpen && <span>{item.text}</span>}
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <header className="bg-white shadow p-4 flex justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex space-x-4 items-center">
            <p className="text-gray-600">Hola, Usuario</p>
            <button className="text-red-500">Cerrar sesión</button>
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
