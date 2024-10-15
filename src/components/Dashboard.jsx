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
import { Link, Outlet, useLocation } from "react-router-dom";
import img9 from "../../public/img/img1.png";
import img1 from "../../public/img/img1.png";
import fondo from "../../public/img/fondo3.png";
import banner from "../../public/img/banner.png";
import { supabase } from "../supabase/supabase";

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
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location]);

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
    <div className="min-h-screen flex font-montserrat">
      {/* Sidebar */}
      <aside
        className={`bg-green-900 text-white transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-20"
        } fixed h-full z-10`}
        style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover' }}
      >
        <div className="flex flex-col items-center py-6">
          {sidebarOpen ? (
            <h2 className="text-2xl font-bold text-white mb-4">AgroSalud</h2>
          ) : (
            <div className="w-12 h-12 mb-4">
              <img src={img9} alt="Logo" className="w-full h-full object-cover rounded-full" />
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
              className={`flex items-center py-3 px-6 hover:bg-green-700 transition-colors duration-200 ${
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
      </aside>

      {/* Main Content */}
      <div className={`flex-1 bg-green-100 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        <header className="p-2 flex justify-end fixed-top" style={{ backgroundImage: `url(${banner})`, backgroundSize: '48%' }}>
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div
              className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center cursor-pointer"
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
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50"
            >
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <img src={img1} alt="Logo" className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64" />
                <motion.div
                  className="absolute inset-0 border-t-4 border-green-500 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                ></motion.div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white text-lg sm:text-xl mt-4 font-semibold text-center"
              >
                Cargando...
              </motion.p>
            </motion.div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
