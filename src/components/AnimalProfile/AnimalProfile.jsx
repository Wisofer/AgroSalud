import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCow, faPiggyBank, faOtter, faTag, faBirthdayCake, faWeight, faVenusMars, faDna, faBullseye, faFileExcel } from '@fortawesome/free-solid-svg-icons'
import img8 from "../../../public/img/img8.jpg"
import * as XLSX from 'xlsx'

// Componente para mostrar un animal individual
const AnimalListItem = ({ animal, onEdit, onView }) => {
  const exportToExcel = () => {
    const dataToExport = {
      Nombre: animal.nombre,
      Etiqueta: animal.numeroEtiqueta,
      Edad: `${animal.meses} meses`,
      Peso: `${animal.peso} kg`,
      Género: animal.genero,
      Raza: animal.raza,
      Propósito: animal.proposito
    }

    const ws = XLSX.utils.json_to_sheet([dataToExport])
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Animal")
    XLSX.writeFile(wb, `${animal.nombre}_datos.xlsx`)
  }

  return (
    <li className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-2">
        <img src={animal.foto || 'https://via.placeholder.com/50'} alt={animal.nombre} className="w-12 h-12 rounded-full mr-4 object-cover" />
        <h3 className="text-xl font-semibold text-indigo-700">{animal.nombre}</h3>
      </div>
      <p className="text-gray-600 mb-2">
        <FontAwesomeIcon icon={faTag} className="mr-2 text-indigo-500" />
        Etiqueta: <span className="font-semibold">{animal.numeroEtiqueta}</span>
      </p>
      <ul className="list-none mb-2 text-sm text-gray-700">
        <li>
          <FontAwesomeIcon icon={faBirthdayCake} className="mr-2 text-pink-500" />
          Edad: {animal.meses} meses
        </li>
        <li>
          <FontAwesomeIcon icon={faWeight} className="mr-2 text-green-500" />
          Peso: {animal.peso} kg
        </li>
        <li>
          <FontAwesomeIcon icon={faVenusMars} className="mr-2 text-purple-500" />
          Género: {animal.genero}
        </li>
        <li>
          <FontAwesomeIcon icon={faDna} className="mr-2 text-blue-500" />
          Raza: {animal.raza}
        </li>
        <li>
          <FontAwesomeIcon icon={faBullseye} className="mr-2 text-red-500" />
          Propósito: {animal.proposito}
        </li>
      </ul>
      <div className="flex justify-end space-x-2 mt-2">
        <button
          onClick={() => onEdit(animal)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm"
        >
          Editar
        </button>
        <button
          onClick={() => onView(animal)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm"
        >
          Ver Detalles
        </button>
        <button
          onClick={exportToExcel}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm"
        >
          <FontAwesomeIcon icon={faFileExcel} className="mr-1" />
          Exportar a Excel
        </button>
      </div>
    </li>
  )
}

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <button onClick={onClose} className="float-right text-gray-600 hover:text-gray-800">&times;</button>
        {children}
      </div>
    </div>
  );
};

const AnimalProfile = () => {
  const [animales, setAnimales] = useState({
    vacas: [
      { nombre: 'Lola', meses: '24', numeroEtiqueta: 'V001', peso: '450', genero: 'Hembra', raza: 'Holstein', proposito: 'Leche', foto: 'https://taxonomiaanimal.wordpress.com/wp-content/uploads/2018/03/vaca.png' },
      { nombre: 'Torito', meses: '18', numeroEtiqueta: 'V002', peso: '500', genero: 'Macho', raza: 'Angus', proposito: 'Carne', foto: img8 },
    ],
    cabras: [
      { nombre: 'Blanquita', meses: '12', numeroEtiqueta: 'C001', peso: '30', genero: 'Hembra', raza: 'Saanen', proposito: 'Leche', foto: 'https://ejemplo.com/foto-blanquita.jpg' },
    ],
    cerdos: [
      { nombre: 'Porky', meses: '8', numeroEtiqueta: 'P001', peso: '100', genero: 'Macho', raza: 'Duroc', proposito: 'Carne', foto: 'https://ejemplo.com/foto-porky.jpg' },
    ],
    otros: [
      { nombre: 'Gallina', meses: '6', numeroEtiqueta: 'O001', peso: '2', genero: 'Hembra', raza: 'Rhode Island', proposito: 'Huevos', foto: 'https://ejemplo.com/foto-gallina.jpg' },
    ],
  })

  const [categoriaActiva, setCategoriaActiva] = useState('vacas')
  const [animalSeleccionado, setAnimalSeleccionado] = useState(null)
  const [modalAbierto, setModalAbierto] = useState(false)

  const categorias = [
    { valor: 'vacas', icono: faCow, texto: 'Vacas', color: 'bg-blue-500' },
    { valor: 'cabras', icono: "🐐", texto: 'Cabras', color: 'bg-green-500' },
    { valor: 'cerdos', icono: faPiggyBank, texto: 'Cerdos', color: 'bg-pink-500' },
    { valor: 'otros', icono: faOtter, texto: 'Otros', color: 'bg-purple-500' },
  ]

  const handleEditAnimal = (animal) => {
    setAnimalSeleccionado(animal)
    setModalAbierto(true)
  }

  const handleViewAnimal = (animal) => {
    setAnimalSeleccionado(animal)
    setModalAbierto(true)
  }

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">Registro de Animales</h1>
      <div className="mb-8">
        <div className="flex justify-center space-x-6">
          {categorias.map(categoria => (
            <button
              key={categoria.valor}
              onClick={() => setCategoriaActiva(categoria.valor)}
              className={`flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
                categoriaActiva === categoria.valor ? `${categoria.color} shadow-lg` : 'bg-gray-400'
              }`}
            >
              <FontAwesomeIcon icon={categoria.icono} className="mr-3 text-xl" />
              {categoria.texto}
            </button>
          ))}
        </div>
      </div>
      <div className="container mx-auto">
        <ul className="space-y-4">
          {animales[categoriaActiva].map((animal, index) => (
            <AnimalListItem 
              key={index}
              animal={animal} 
              onEdit={handleEditAnimal} 
              onView={handleViewAnimal}
            />
          ))}
        </ul>
      </div>
      {animalSeleccionado && (
        <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)}>
          <h2 className="text-2xl font-bold mb-4">Detalles del Animal</h2>
          <img src={animalSeleccionado.foto || 'https://via.placeholder.com/200'} alt={animalSeleccionado.nombre} className="w-40 h-40 rounded-full mx-auto mb-4 object-cover" />
          <ul className="space-y-2">
            {Object.entries(animalSeleccionado).map(([clave, valor]) => (
              clave !== 'foto' && (
                <li key={clave} className="flex items-center">
                  <FontAwesomeIcon icon={
                    clave === 'nombre' ? faTag :
                    clave === 'meses' ? faBirthdayCake :
                    clave === 'numeroEtiqueta' ? faTag :
                    clave === 'peso' ? faWeight :
                    clave === 'genero' ? faVenusMars :
                    clave === 'raza' ? faDna :
                    clave === 'proposito' ? faBullseye :
                    faTag
                  } className="mr-2 text-indigo-500" />
                  <span className="font-semibold">{clave}:</span> {valor}
                </li>
              )
            ))}
          </ul>
        </Modal>
      )}
    </div>
  )
}

export default AnimalProfile