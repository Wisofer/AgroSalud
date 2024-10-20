import { useState, useEffect } from 'react'
import { Heart, Baby, Wheat, Droplet } from 'lucide-react';
import { motion } from 'framer-motion'
import { supabase } from '../../supabase/supabase'; 

const recomendaciones = [
  {
    etapa: 'Cabritos (0-3 meses)',
    icon: <Baby className="w-8 h-8 text-pink-500" />,
    objetivo: 'Promover un crecimiento rápido y saludable.',
    nutrientes: [
      { nombre: 'Proteína Cruda', valor: '18-20%' },
      { nombre: 'Energía Metabolizable', valor: '3,200-3,500 Kcal/kg' },
      { nombre: 'Grasa', valor: '4-6%' },
    ],
    alimento: 'Leche de reemplazo: Fórmulas específicas para cabritos. Fórmulas comerciales: (ej. Nutriave Cabritos).',
  },
  {
    etapa: 'Cabritos en Crecimiento (3-6 meses)',
    objetivo: 'Aumentar el peso de forma eficiente.',
    nutrientes: [
      { nombre: 'Proteína Cruda', valor: '16-18%' },
      { nombre: 'Energía Metabolizable', valor: '3,000-3,200 Kcal/kg' },
      { nombre: 'Grasa', valor: '3-5%' },
    ],
    alimento: 'Concentrado de crecimiento: (ej. Cargill Crecimiento). Maíz: Fuente de energía. Harina de soya: Alta en proteínas.',
  },
  {
    etapa: 'Caprinos en Desarrollo (6-12 meses)',
    icon: <Wheat className="w-8 h-8 text-yellow-500" />,
    objetivo: 'Maximizar la ganancia de peso antes del sacrificio.',
    nutrientes: [
      { nombre: 'Proteína Cruda', valor: '14-16%' },
      { nombre: 'Energía Metabolizable', valor: '2,800-3,000 Kcal/kg' },
      { nombre: 'Grasa', valor: '2-4%' },
    ],
    alimento: 'Concentrado de recría: (ej. Purina Recría). Pasto de alta calidad: Brachiaria o Panicum. Heno de alfalfa: Rico en proteínas y nutrientes.',
  },
  {
    etapa: 'Caprinos Adultos (12 meses en adelante)',
    objetivo: 'Mantener la salud y la producción.',
    nutrientes: [
      { nombre: 'Proteína Cruda', valor: '12-14%' },
      { nombre: 'Energía Metabolizable', valor: '2,500-2,800 Kcal/kg' },
      { nombre: 'Grasa', valor: '2-4%' },
    ],
    alimento: 'Concentrado para caprinos adultos: (ej. Alimentos El Salvador). Forraje seco: Pasto seco o heno. Suplementos minerales: Para asegurar un balance adecuado de nutrientes.',
  },
]

export default function Cabras() {
  const [likes, setLikes] = useState({})
  const [diasRestantes, setDiasRestantes] = useState(7)
  const [comentarios, setComentarios] = useState({})
  const [nuevoComentario, setNuevoComentario] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setDiasRestantes((prev) => (prev > 0 ? prev - 1 : 7))
    }, 86400000) // 24 horas en milisegundos

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    cargarComentarios()
  }, [])

  const cargarComentarios = async () => {
    try {
      const { data, error } = await supabase
        .from('comentarios')
        .select('*')
        .order('fecha_comentario', { ascending: false })

      if (error) throw error

      const comentariosPorEtapa = data.reduce((acc, comentario) => {
        if (!acc[comentario.etapa]) {
          acc[comentario.etapa] = []
        }
        acc[comentario.etapa].push(comentario)
        return acc
      }, {})

      setComentarios(comentariosPorEtapa)
    } catch (error) {
      console.error('Error al cargar los comentarios:', error.message)
    }
  }

  const handleLike = (etapa) => {
    setLikes((prev) => ({ ...prev, [etapa]: !prev[etapa] }))
  }

  const handleComment = async (etapa) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        console.error('Usuario no autenticado')
        return
      }

      const { data, error } = await supabase
        .from('comentarios')
        .insert([
          { usuario_id: user.id, comentario: nuevoComentario, etapa: etapa }
        ])

      if (error) throw error

      // Actualizar el estado local con el nuevo comentario
      setComentarios((prev) => ({
        ...prev,
        [etapa]: [...(prev[etapa] || []), { ...data[0], usuario: user }]
      }))
      setNuevoComentario("")
      
      // Recargar los comentarios para asegurar que tenemos los datos más recientes
      cargarComentarios()
    } catch (error) {
      console.error('Error al enviar el comentario:', error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Recomendaciones de Alimentación para Cabras
      </h1>
      <p className="text-center text-lg mb-8 text-gray-600">
        Estas recomendaciones cambiarán en {diasRestantes} día{diasRestantes !== 1 ? 's' : ''}
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
                  <h3 className="font-semibold mb-2 text-gray-700">Comentarios:</h3>
                  {comentarios[recomendacion.etapa] && comentarios[recomendacion.etapa].map((comentario, index) => (
                    <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                      <p className="text-sm text-gray-600">{comentario.comentario}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(comentario.fecha_comentario).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Escribe un comentario..."
                    value={nuevoComentario}
                    onChange={(e) => setNuevoComentario(e.target.value)}
                  />
                  <button
                    onClick={() => handleComment(recomendacion.etapa)}
                    className="mt-2 bg-blue-500 text-white p-2 rounded"
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
            <span>Asegurarse de que las cabras tengan acceso constante a agua fresca y limpia.</span>
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