import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiggyBank, ChevronDown, ChevronUp } from 'lucide-react';
import cabra from "../../../public/img/cabra.png"
import vaca from "../../../public/img/vaca.png"
import animal from "../../../public/img/animal.png"

export default function Recomendaciones() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    if (openQuestion === index) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(index);
    }
  };

  const faqData = [
    {
      question: "¿Cuál es la importancia del bienestar animal?",
      answer: "El bienestar animal es crucial para asegurar que los animales sean tratados con respeto y cuidado. Un buen manejo del bienestar puede mejorar la salud, la productividad y la calidad de los productos obtenidos."
    },
    {
      question: "¿Cómo puedo manejar el estrés en mis animales?",
      answer: "Proporciona un ambiente adecuado, evita cambios bruscos en la rutina, y asegúrate de que tengan suficiente espacio, agua y comida. La observación regular de los animales también ayuda a identificar signos de estrés."
    },
    {
      question: "¿Cómo puedo capacitarme en el manejo de ganado menor?",
      answer: "Puedes asistir a cursos, talleres y seminarios sobre manejo animal, leer libros y manuales técnicos, así como unirte a grupos o asociaciones de productores que ofrezcan recursos y apoyo en la formación."
    },
    {
      question: "¿Qué medidas de bioseguridad debo implementar en mi granja?",
      answer: "Algunas medidas incluyen limitar el acceso de personas externas, desinfectar equipos y vehículos, controlar el ingreso de nuevos animales y mantener un registro de salud animal para prevenir la propagación de enfermedades."
    },
    {
      question: "¿Qué enfermedades son comunes en el ganado menor?",
      answer: "Entre las enfermedades comunes se encuentran las infecciones respiratorias, enfermedades parasitarias, y problemas reproductivos. Es esencial realizar chequeos regulares y vacunar a los animales según las recomendaciones veterinarias."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Recomendaciones Alimenticias
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Link to="/dashboard/cerdos" className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="p-6 text-center">
            <PiggyBank className="w-16 h-16 mx-auto text-pink-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Cerdos</h2>
            <p className="text-gray-600">Recomendaciones de alimentación para cerdos.</p>
          </div>
        </Link>
        <Link to="/dashboard/cabras" className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="p-6 text-center">
            <img src={cabra} alt="Cabra" className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Cabras</h2>
            <p className="text-gray-600">Recomendaciones de alimentación para cabras.</p>
          </div>
        </Link>
        <Link to="/dashboard/vacas" className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="p-6 text-center">
            <img src={animal} alt="Vaca" className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Vacas</h2>
            <p className="text-gray-600">Recomendaciones de alimentación para vacas.</p>
          </div>
        </Link>
      </div>
      
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Preguntas Frecuentes</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              className="w-full text-left p-4 focus:outline-none flex justify-between items-center"
              onClick={() => toggleQuestion(index)}
            >
              <span className="font-semibold text-gray-800">{faq.question}</span>
              {openQuestion === index ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
            </button>
            {openQuestion === index && (
              <div className="p-4 bg-gray-50">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
