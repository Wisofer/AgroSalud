import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCow,
  faBacon,
  faStethoscope,
  faHospital,
  faHeart,
  faPlus,
  faUser,
  faSignOutAlt,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import img3 from "../public/img/img3.jpg";
import img4 from "../public/img/img4.jpg";
import img5 from "../public/img/img7.jpg";
import img1 from "../public/img/img1.png";
import { supabase } from "./supabase/supabase";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
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
          setUser({
            ...user,
            ...data,
            rol: getRolName(data.rol_id),
            departamento: getDepartamentoName(data.departamento_id),
          });
        }
      }
    };

    fetchUser();
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

  const toggleUserInfo = () => {
    if (user) {
      setShowUserInfo(!showUserInfo);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setTimeout(async () => {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        navigate("/login");
      }
      setIsLoggingOut(false);
    }, 5000);
  };

  const animales = [
    {
      nombre: "Vaca",
      icono: faCow,
      imagen: img3,
      descripcion:
        "¿Quieres darle un chequeo a tu vaca? Nuestros expertos están listos para atenderla.",
      ruta: "/cow",
    },
    {
      nombre: "Cabra",
      imagen: img5,
      descripcion:
        "Mantén a tu cabra en óptimas condiciones con nuestros servicios veterinarios especializados.",
      ruta: "/goat",
    },
    {
      nombre: "Cerdo",
      icono: faBacon,
      imagen: img4,
      descripcion:
        "Cuida la salud de tus cerdos con nuestro equipo de expertos en porcicultura.",
      ruta: "/pig",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 font-montserrat relative">
      {isLoggingOut && (
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
            Cerrando sesión...
          </motion.p>
        </motion.div>
      )}
      <header className="p-4 flex justify-end">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center cursor-pointer" onClick={toggleUserInfo}>
            <FontAwesomeIcon
              icon={faUser}
              className="text-xl text-white"
            />
          </div>
          <AnimatePresence>
            {showUserInfo && user && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl p-4"
              >
                <p className="font-bold">{`${user.nombre} ${user.apellido}`}</p>
                <p>{`Rol: ${user.rol}`}</p>
                <p>{`Departamento: ${user.departamento}`}</p>
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
      <main className="container mx-auto px-4 py-12">
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8 mb-12 transform hover:scale-105 transition-all duration-300"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              className="relative w-32 h-32 mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.img
                src={img1}
                alt="Logo de AgroSalud"
                className="w-full h-full rounded-full object-cover shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 border-4 border-green-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <motion.h1 className="text-7xl font-bold text-center text-green-700 font-montserrat tracking-wide">
              {Array.from("Bienvenido a AgroSalud").map((letra, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  className="inline-block hover:text-green-500 transition-colors duration-300 mx-1"
                >
                  {letra === " " ? "\u00A0" : letra}
                </motion.span>
              ))}
            </motion.h1>
          </div>
        </motion.div>
        <motion.p
          className="text-2xl text-center text-gray-600 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          La plataforma integral para el cuidado y gestión de tus animales de
          granja
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {animales.map((animal, index) => (
            <motion.div
              key={animal.nombre}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2 relative overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <img
                      src={animal.imagen}
                      alt={animal.nombre}
                      className="w-32 h-32 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <motion.div
                      className="absolute inset-0 border-4 border-green-500 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    ></motion.div>
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2 group-hover:text-green-600 transition-colors duration-300">
                  {animal.nombre}
                </h2>
                <p className="text-gray-600 text-center mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  {animal.descripcion}
                </p>
                <div className="flex justify-center space-x-4 mb-4">
                  <FontAwesomeIcon
                    icon={faStethoscope}
                    className="text-3xl text-green-500 transition-transform duration-300 group-hover:scale-110"
                  />
                  <FontAwesomeIcon
                    icon={faHospital}
                    className="text-3xl text-blue-500 transition-transform duration-300 group-hover:scale-110"
                  />
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-3xl text-red-500 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <Link to={animal.ruta}>
                  <button className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-300">
                    Seleccionar
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
          <motion.div
            className="absolute bottom-0 left-0 bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2 overflow-hidden group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * (animales.length + 1), duration: 0.5 }}
          ></motion.div>
        </div>
        <Link to="/other">
          <div className="flex items-center justify-end mt-12 cursor-pointer group">
            <div className="relative overflow-hidden rounded-full bg-green-100 p-4 transition-all duration-300 group-hover:bg-green-200">
              <FontAwesomeIcon
                icon={faPlus}
                className="text-5xl text-green-500 group-hover:text-green-600 transition-colors duration-300 transform group-hover:rotate-90"
              />
            </div>
            <span className="ml-4 text-3xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300 border-b-2 border-transparent group-hover:border-green-500">
              Agregar Otro
            </span>
          </div>
        </Link>
      </main>
    </div>
  );
};

export default HomePage;
