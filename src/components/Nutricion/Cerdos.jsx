import { useState, useEffect } from 'react'
import { Heart, Baby, Wheat, Droplet } from 'lucide-react';

const recomendaciones = [
  {
    etapa: 'Lechones (0-8 semanas)',
    icon: <Baby className="w-8 h-8 text-pink-500" />,
    objetivo: 'Promover un crecimiento rápido y saludable.',
    nutrientes: [
      { nombre: 'Proteína Cruda', valor: '18-20%' },
      { nombre: 'Energía Metabolizable', valor: '3.200-3.400 Kcal/kg' },
      { nombre: 'Grasa', valor: '5-7%' },
      { nombre: 'Fibra', valor: '2-4%' },
    ],
    alimento: 'Leche de reemplazo o fórmulas específicas para lechones. Alimento seco con alto contenido proteico y digestible.',
  },
  {
    etapa: 'Cerdos en Crecimiento (8-16 semanas)',
    objetivo: 'Aumentar el peso de forma eficiente.',
    nutrientes: [
      { nombre: 'Proteína Cruda', valor: '16-18%' },
      { nombre: 'Energía Metabolizable', valor: '3.200 Kcal/kg' },
      { nombre: 'Grasa', valor: '5-6%' },
      { nombre: 'Fibra', valor: '3-4%' },
    ],
    alimento: 'Mezclas de maíz, soya y otros granos. Suplementos vitamínicos y minerales.',
  },
  {
    etapa: 'Cerdos en Engorde (16-24 semanas)',
    icon: <Wheat className="w-8 h-8 text-yellow-500" />,
    objetivo: 'Maximizar la ganancia de peso antes del sacrificio.',
    nutrientes: [
      { nombre: 'Proteína Cruda', valor: '14-16%' },
      { nombre: 'Energía Metabolizable', valor: '3.300-3.500 Kcal/kg' },
      { nombre: 'Grasa', valor: '6-8%' },
      { nombre: 'Fibra', valor: '3-5%' },
    ],
    alimento: 'Dieta alta en energía con granos como maíz, sorgo y subproductos agrícolas. Proteínas de origen animal o vegetal.',
  },
  {
    etapa: 'Cerdos Adultos (Reproductores)',
    objetivo: 'Mantener la salud y la producción.',
    nutrientes: [
      { nombre: 'Proteína Cruda', valor: '12-14% (para cerdas en gestación)' },
      { nombre: 'Energía Metabolizable', valor: '3.000-3.200 Kcal/kg' },
      { nombre: 'Grasa', valor: '4-6%' },
      { nombre: 'Fibra', valor: '4-6%' },
    ],
    alimento: 'Dietas formuladas específicamente para cerdas en gestación y lactancia. Inclusión de forrajes y alimentos frescos.',
  },
]
export default function Cerdos() {
  const [likes, setLikes] = useState({})
  const [diasRestantes, setDiasRestantes] = useState(7)
  const [horasRestantes, setHorasRestantes] = useState(0)
  const [minutosRestantes, setMinutosRestantes] = useState(0)
  const [segundosRestantes, setSegundosRestantes] = useState(0)
  const [comentarios, setComentarios] = useState({})
  const [nuevoComentario, setNuevoComentario] = useState("")

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date().getTime()
      const targetDate = new Date().setDate(new Date().getDate() + diasRestantes)
      const distance = targetDate - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setDiasRestantes(days)
      setHorasRestantes(hours)
      setMinutosRestantes(minutes)
      setSegundosRestantes(seconds)
    }, 1000)

    return () => {
      clearInterval(countdown)
    }
  }, [diasRestantes])

  const handleLike = (etapa) => {
    setLikes((prev) => ({ ...prev, [etapa]: !prev[etapa] }))
  }

  const handleComment = (etapa) => {
    setComentarios((prev) => ({ ...prev, [etapa]: nuevoComentario }))
    setNuevoComentario("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Recomendaciones de Alimentación para Cerdos
      </h1>
      <p className="text-center text-lg mb-8 text-gray-600">
        Estas recomendaciones cambiarán en {diasRestantes} día{diasRestantes !== 1 ? 's' : ''}, {horasRestantes} horas, {minutosRestantes} minutos y {segundosRestantes} segundos.
      </p>
      <div className="space-y-8">
        {recomendaciones.map((recomendacion) => (
          <div
            key={recomendacion.etapa}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex p-6">
              <div className="flex-shrink-0 mr-6">
                {recomendacion.icon}
                <button
                  onClick={() => handleLike(recomendacion.etapa)}
                  className="mt-4 text-red-500 hover:text-red-600 transition-colors duration-300"
                >
                  <Heart className={`w-6 h-6 ${likes[recomendacion.etapa] ? 'fill-current' : ''}`} />
                </button>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{recomendacion.etapa}</h2>
                <p className="text-gray-600 mb-4">{recomendacion.objetivo}</p>
                <div className="flex">
                  <div className="w-1/2 pr-4">
                    <h3 className="font-semibold mb-2 text-gray-700">Requerimientos Nutricionales:</h3>
                    <ul className="list-disc list-inside mb-4 text-gray-600">
                      {recomendacion.nutrientes.map((nutriente) => (
                        <li key={nutriente.nombre}>
                          {nutriente.nombre}: {nutriente.valor}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-1/2 pl-4">
                    <h3 className="font-semibold mb-2 text-gray-700">Alimento Ideal:</h3>
                    <p className="text-gray-600">{recomendacion.alimento}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Escribe un comentario..."
                    value={nuevoComentario}
                    onChange={(e) => setNuevoComentario(e.target.value)}
                  />
                  <button
                    onClick={() => handleComment(recomendacion.etapa)}
                    className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                  >
                    Enviar Comentario
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Consideraciones Adicionales</h2>
        <ul className="space-y-4">
          <li className="flex items-center text-gray-700">
            <Droplet className="w-6 h-6 mr-2 text-blue-500" />
            <span>Asegurarse de que los cerdos tengan acceso constante a agua fresca y limpia.</span>
          </li>
          <li className="flex items-center text-gray-700">
            <Wheat className="w-6 h-6 mr-2 text-yellow-500" />
            <span>Incluir aditivos como probióticos y prebióticos para mejorar la salud intestinal.</span>
          </li>
          <li className="flex items-center text-gray-700">
            <span>Cambiar la dieta gradualmente al introducir nuevos alimentos.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}