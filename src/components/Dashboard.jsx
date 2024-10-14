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
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Outlet } from "react-router-dom";
import img9 from "../../public/img/img9.jpg";
import { supabase } from "../supabase/supabase"; // Asegúrate de tener configurado supabaseClient

const Dashboard = () => {
  const [animalData, setAnimalData] = useState({
    vacas: 0,
    cerdos: 0,
    cabras: 0,
    otros: 0,
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("usuarios")
          .select("nombre, apellido, rol_id, departamento_id")
          .eq("email", user.email)
          .single();

        if (data) {
          setUserData({
            ...user,
            ...data,
            rol: getRolName(data.rol_id),
            departamento: getDepartamentoName(data.departamento_id),
          });
        }
      } else {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const getRolName = (rolId) => {
    const roles = {
      1: "Granjero",
      2: "Veterinario",
      3: "Administrador",
      4: "Técnico Agrícola",
      5: "Investigador",
    };
    return roles[rolId] || "Desconocido";
  };

  const getDepartamentoName = (departamentoId) => {
    const departamentos = {
      1: "Boaco",
      2: "Carazo",
      3: "Chinandega",
      4: "Chontales",
      5: "Estelí",
      6: "Granada",
      7: "Jinotega",
      8: "León",
      9: "Madriz",
      10: "Managua",
      11: "Masaya",
      12: "Matagalpa",
      13: "Nueva Segovia",
      14: "Río San Juan",
      15: "Rivas",
      16: "RACCN",
      17: "RACCS",
    };
    return departamentos[departamentoId] || "Desconocido";
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setTimeout(async () => {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        window.location.href = "/login";
      }
      setIsLoggingOut(false);
    }, 5000);
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
        <header className="p-4 flex justify-end">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div
              className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center cursor-pointer"
              onClick={toggleUserInfo}
            >
              <FontAwesomeIcon icon={faUser} className="text-xl text-white" />
            </div>
            <AnimatePresence>
              {showUserInfo && userData && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl p-4"
                >
                  <p className="font-bold">{`${userData.nombre} ${userData.apellido}`}</p>
                  <p>{`Rol: ${userData.rol}`}</p>
                  <p>{`Departamento: ${userData.departamento}`}</p>
                  <p>{userData.email}</p>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center w-full"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Desconectar
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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
