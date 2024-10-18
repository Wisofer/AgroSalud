  import React, { useState, useEffect } from "react";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {
    faCow,
    faTrash,
    faPiggyBank,
    faOtter,
    faTag,
    faBirthdayCake,
    faWeight,
    faVenusMars,
    faDna,
    faBullseye,
    faCalendarAlt,
    faFileExcel,
    faEye,
    faTimes,
    faEdit,
  } from "@fortawesome/free-solid-svg-icons";
  import { motion } from "framer-motion";
  import img1 from "../../../public/img/img1.png";
  import { supabase } from "../../supabase/supabase";
  import * as XLSX from "xlsx";
  import deleteSound from "../../../public/audios/audio3.mp3";

  const MAX_LENGTH = 32767;

  const AnimalProfile = () => {
    const [animales, setAnimales] = useState([]);
    const [usuarioId, setUsuarioId] = useState(null);
    const [categoriaActiva, setCategoriaActiva] = useState("vacas");
    const [isLoading, setIsLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedAnimal, setEditedAnimal] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [animalToDelete, setAnimalToDelete] = useState(null);

    useEffect(() => {
      const obtenerUsuarioId = async () => {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) {
          console.error("Error obteniendo el usuario:", error);
        }
        if (user) {
          setUsuarioId(user.id);
          console.log("Usuario ID:", user.id);
        } else {
          console.log("No hay usuario autenticado");
        }
      };
      obtenerUsuarioId();
    }, []);

    useEffect(() => {
      if (usuarioId) {
        fetchAnimales();
      }
    }, [usuarioId, categoriaActiva]);

    const fetchAnimales = async () => {
      if (!usuarioId) return;

      setIsLoading(true);
      const { data, error } = await supabase
        .from(categoriaActiva)
        .select("*")
        .eq("usuario_id", usuarioId);

      if (error) {
        console.error("Error fetching animales:", error);
      } else {
        console.log("Animales obtenidos:", data);
        setAnimales(data);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    const categorias = [
      { valor: "vacas", icono: faCow, texto: "Vacas", color: "bg-blue-500" },
      {
        valor: "cerdos",
        icono: faPiggyBank,
        texto: "Cerdos",
        color: "bg-pink-500",
      },
      { valor: "cabras", icono: faOtter, texto: "Cabras", color: "bg-green-500" },
      {
        valor: "otros_animales",
        icono: faTag,
        texto: "Otros Animales",
        color: "bg-yellow-500",
      },
    ];

    const toggleDetails = (animal) => {
      setSelectedAnimal(animal);
      setShowDetails(!showDetails);
    };

    const handleExport = (animal) => {
      const { usuario_id, created_at, updated_at, imagen, ...animalData } = animal;
      const truncatedAnimalData = {};
      for (const key in animalData) {
        if (typeof animalData[key] === 'string' && animalData[key].length > MAX_LENGTH) {
          truncatedAnimalData[key] = animalData[key].substring(0, MAX_LENGTH);
        } else {
          truncatedAnimalData[key] = animalData[key];
        }
      }
      const worksheet = XLSX.utils.json_to_sheet([truncatedAnimalData]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Animal");
      XLSX.writeFile(workbook, `${animal.nombre}.xlsx`);
    };

    const handleExportAll = async () => {
      const categorias = ["vacas", "cerdos", "cabras", "otros_animales"];
      let allAnimales = [];

      for (const categoria of categorias) {
        const { data, error } = await supabase
          .from(categoria)
          .select("*")
          .eq("usuario_id", usuarioId);

        if (error) {
          console.error(`Error fetching ${categoria}:`, error);
        } else {
          allAnimales = [...allAnimales, ...data];
        }
      }

      const dataToExport = allAnimales.map(({ usuario_id, created_at, updated_at, imagen, ...animalData }) => {
        const truncatedAnimalData = {};
        for (const key in animalData) {
          if (typeof animalData[key] === 'string' && animalData[key].length > MAX_LENGTH) {
            truncatedAnimalData[key] = animalData[key].substring(0, MAX_LENGTH);
          } else {
            truncatedAnimalData[key] = animalData[key];
          }
        }
        return truncatedAnimalData;
      });

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Animales");
      XLSX.writeFile(workbook, `animales_todos.xlsx`);
    };

    const handleEdit = (animal) => {
      setEditedAnimal(animal);
      setIsEditing(true);
    };

    const handleSave = async () => {
      const { error } = await supabase
        .from(categoriaActiva)
        .update(editedAnimal)
        .eq("id", editedAnimal.id);

      if (error) {
        console.error("Error actualizando el animal:", error);
      } else {
        fetchAnimales();
        setIsEditing(false);
      }
    };

    const handleDelete = (animal) => {
      setAnimalToDelete(animal);
      setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
      const { error } = await supabase
        .from(categoriaActiva)
        .delete()
        .eq("id", animalToDelete.id);

      if (error) {
        console.error("Error eliminando el animal:", error);
      } else {
        fetchAnimales();
        setShowDeleteModal(false);
        setAnimalToDelete(null);
        new Audio(deleteSound).play();
      }
    };

    return (
      <div className="container mx-auto p-2 bg-gray-50 min-h-screen">
        {isLoading && (
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
              <img
                src={img1}
                alt="Logo"
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48"
              />
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
        )}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-center text-indigo-800">
            Registro de Animales
          </h1>
          <button
            onClick={handleExportAll}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
            Exportar Todo
          </button>
        </div>
        <div className="flex justify-center mb-4">
          {categorias.map((categoria) => (
            <button
              key={categoria.valor}
              onClick={() => setCategoriaActiva(categoria.valor)}
              className={`px-3 py-1 mx-1 rounded-full text-white ${
                categoriaActiva === categoria.valor
                  ? `${categoria.color} shadow-lg`
                  : "bg-gray-400"
              }`}
            >
              <FontAwesomeIcon icon={categoria.icono} className="mr-1" />
              {categoria.texto}
            </button>
          ))}
        </div>
        {animales.length > 0 ? (
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
            id="animal-table"
          >
            {animales.map((animal) => (
              <li
                key={animal.id}
                className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="p-4 flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden">
                    <img
                      src={animal.imagen || "https://via.placeholder.com/50"}
                      alt={animal.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">{animal.nombre}</h2>
                  <span className="px-2 py-1 bg-gray-200 text-gray-800 text-sm font-semibold rounded-full">
                    Etiqueta: {animal.numero_etiqueta}
                  </span>
                </div>
                <div className="p-4">
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faBirthdayCake}
                        className="w-5 h-5 text-blue-500"
                      />
                      <span className="font-semibold">Edad:</span>
                      <span>{animal.meses} meses</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faWeight}
                        className="w-5 h-5 text-blue-500"
                      />
                      <span className="font-semibold">Peso:</span>
                      <span>{animal.peso} kg</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faVenusMars}
                        className="w-5 h-5 text-blue-500"
                      />
                      <span className="font-semibold">Género:</span>
                      <span>{animal.genero}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faDna}
                        className="w-5 h-5 text-blue-500"
                      />
                      <span className="font-semibold">Raza:</span>
                      <span>{animal.raza}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faBullseye}
                        className="w-5 h-5 text-blue-500"
                      />
                      <span className="font-semibold">Propósito:</span>
                      <span>{animal.proposito}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="w-5 h-5 text-blue-500"
                      />
                      <span className="font-semibold">Fecha de creación:</span>
                      <span>
                        {new Date(animal.created_at).toLocaleDateString()}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 flex flex-wrap justify-between gap-2">
                  <button
                    onClick={() => handleEdit(animal)}
                    className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleExport(animal)}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
                    Exportar Excel
                  </button>
                  <button
                    onClick={() => handleDelete(animal)}
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Eliminar
                  </button>
                  <button
                    onClick={() => toggleDetails(animal)}
                    className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors w-full mt-2"
                  >
                    <FontAwesomeIcon icon={faEye} className="mr-2" />
                    {showDetails && selectedAnimal?.id === animal.id
                      ? "Ocultar detalles"
                      : "Ver más"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">
            No hay animales registrados en esta categoría.
          </p>
        )}

        {showDetails && selectedAnimal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{selectedAnimal.nombre}</h2>
                <button
                  onClick={toggleDetails}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faBirthdayCake}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span className="font-semibold">Edad:</span>
                  <span>{selectedAnimal.meses} meses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faWeight}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span className="font-semibold">Peso:</span>
                  <span>{selectedAnimal.peso} kg</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faVenusMars}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span className="font-semibold">Género:</span>
                  <span>{selectedAnimal.genero}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faDna}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span className="font-semibold">Raza:</span>
                  <span>{selectedAnimal.raza}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faBullseye}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span className="font-semibold">Propósito:</span>
                  <span>{selectedAnimal.proposito}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span className="font-semibold">Fecha de creación:</span>
                  <span>
                    {new Date(selectedAnimal.created_at).toLocaleDateString()}
                  </span>
                </div>
                {selectedAnimal.detalles_adicionales && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-md">
                    <h3 className="font-semibold mb-2">Detalles adicionales:</h3>
                    <p>{selectedAnimal.detalles_adicionales}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {isEditing && editedAnimal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  Editar {editedAnimal.nombre}
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faBirthdayCake}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span className="font-semibold">Edad:</span>
                  <input
                    type="number"
                    value={editedAnimal.meses}
                    onChange={(e) =>
                      setEditedAnimal({ ...editedAnimal, meses: e.target.value })
                    }
                    className="border rounded p-1"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faWeight}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span className="font-semibold">Peso:</span>
                  <input
                    type="number"
                    value={editedAnimal.peso}
                    onChange={(e) =>
                      setEditedAnimal({ ...editedAnimal, peso: e.target.value })
                    }
                    className="border rounded p-1"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faVenusMars}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span className="font-semibold">Género:</span>
                  <select
                    value={editedAnimal.genero}
                    onChange={(e) =>
                      setEditedAnimal({ ...editedAnimal, genero: e.target.value })
                    }
                    className="border rounded p-1"
                  >
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faDna}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span className="font-semibold">Raza:</span>
                  <select
                    value={editedAnimal.raza}
                    onChange={(e) =>
                      setEditedAnimal({ ...editedAnimal, raza: e.target.value })
                    }
                    className="border rounded p-1"
                  >
                    <option value="">Seleccione</option>
                    <option value="holstein">Holstein</option>
                    <option value="jersey">Jersey</option>
                    <option value="angus">Angus</option>
                    <option value="brahman">Brahman</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faBullseye}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span className="font-semibold">Propósito:</span>
                  <select
                    value={editedAnimal.proposito}
                    onChange={(e) =>
                      setEditedAnimal({
                        ...editedAnimal,
                        proposito: e.target.value,
                      })
                    }
                    className="border rounded p-1"
                  >
                    <option value="">Seleccione</option>
                    <option value="carne">Carne</option>
                    <option value="leche">Leche</option>
                    <option value="reproduccion">Reproducción</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span className="font-semibold">Fecha de creación:</span>
                  <input
                    type="date"
                    value={
                      new Date(editedAnimal.created_at)
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) =>
                      setEditedAnimal({
                        ...editedAnimal,
                        created_at: new Date(e.target.value).toISOString(),
                      })
                    }
                    className="border rounded p-1"
                  />
                </div>
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                  <h3 className="font-semibold mb-2">Detalles adicionales:</h3>
                  <textarea
                    value={editedAnimal.detalles_adicionales || ""}
                    onChange={(e) =>
                      setEditedAnimal({
                        ...editedAnimal,
                        detalles_adicionales: e.target.value,
                      })
                    }
                    className="border rounded p-1 w-full"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && animalToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Confirmar Eliminación</h2>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
                </button>
              </div>
              <p>
                ¿Estás seguro de que deseas eliminar a {animalToDelete.nombre}?
              </p>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default AnimalProfile;
