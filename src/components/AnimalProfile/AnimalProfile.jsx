import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCow, faPiggyBank, faOtter } from '@fortawesome/free-solid-svg-icons'



// Componente para mostrar un animal individual
const AnimalCard = ({ animal }) => (
  <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm">
    <h2 className="text-xl font-bold">{animal.nombre}</h2>
    <p className="text-gray-600">Etiqueta: {animal.numeroEtiqueta}</p>
    <div className="grid grid-cols-2 gap-2 mt-4">
      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">{animal.meses} meses</span>
      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">{animal.peso} kg</span>
      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">{animal.genero}</span>
      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">{animal.raza}</span>
    </div>
    <p className="mt-4 text-sm text-gray-600">Propósito: {animal.proposito}</p>
  </div>
)

const AnimalProfile = () => {
  const [animales, setAnimales] = useState({
    vacas: [
      { nombre: 'Lola', meses: '24', numeroEtiqueta: 'V001', peso: '450', genero: 'Hembra', raza: 'Holstein', proposito: 'Leche' },
      { nombre: 'Torito', meses: '18', numeroEtiqueta: 'V002', peso: '500', genero: 'Macho', raza: 'Angus', proposito: 'Carne' },
    ],
    cabras: [
      { nombre: 'Blanquita', meses: '12', numeroEtiqueta: 'C001', peso: '30', genero: 'Hembra', raza: 'Saanen', proposito: 'Leche' },
    ],
    cerdos: [
      { nombre: 'Porky', meses: '8', numeroEtiqueta: 'P001', peso: '100', genero: 'Macho', raza: 'Duroc', proposito: 'Carne' },
    ],
    otros: [
      { nombre: 'Gallina', meses: '6', numeroEtiqueta: 'O001', peso: '2', genero: 'Hembra', raza: 'Rhode Island', proposito: 'Huevos' },
    ],
  })

  const [categoriaActiva, setCategoriaActiva] = useState('vacas')

  const categorias = [
    { valor: 'vacas', icono: faCow, texto: 'Vacas' },
    { valor: 'cabras', icono: "🐐", texto: 'Cabras' },
    { valor: 'cerdos', icono: faPiggyBank, texto: 'Cerdos' },
    { valor: 'otros', icono: faOtter, texto: 'Otros' },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Registro de Animales</h1>
      <div className="mb-6">
        <div className="flex justify-center space-x-4">
          {categorias.map(categoria => (
            <button
              key={categoria.valor}
              onClick={() => setCategoriaActiva(categoria.valor)}
              className={`flex items-center justify-center px-4 py-2 rounded-lg ${
                categoriaActiva === categoria.valor ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <FontAwesomeIcon icon={categoria.icono} className="mr-2" />
              {categoria.texto}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {animales[categoriaActiva].map((animal, index) => (
          <AnimalCard key={index} animal={animal} />
        ))}
      </div>
    </div>
  )
}

export default AnimalProfile