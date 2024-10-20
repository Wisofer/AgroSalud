import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import fb from "../../../public/img/fb.png"
import ig from "../../../public/img/ig.jpeg"
import tiktok from "../../../public/img/tiktok.png"

const AcercaDeNosotros = () => {
  const equipo = [
    { nombre: 'Jose David Duarte Amador', rol: 'Comunicador' },
    { nombre: 'Silgya Nasareth Reyes Rodriguez', rol: 'Mercadóloga' },
    { nombre: 'Mauricio Jose Espinales Noguera', rol: 'Marketing' },
    { nombre: 'William Fernando Borge Vanegas', rol: 'Desarrollador de la aplicación' },
    { nombre: 'Douglas Ariel Ordoñez Castellon', rol: 'Mercadólogo' }
  ];

  const redesSociales = [
    { nombre: 'Facebook', icono: fb, url: 'https://www.facebook.com/profile.php?id=61566413550948' },
    { nombre: 'TikTok', icono: tiktok, url: 'https://www.tiktok.com/@agrosalud' },
    { nombre: 'Instagram', icono: ig, url: 'https://www.instagram.com/agr0salud' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-200 p-8">
      <h1 className="text-5xl font-bold text-center mb-8 text-gray-800 animate-fade-in-down">
        Acerca de Nosotros
      </h1>
      <p className="text-center text-xl mb-12 text-gray-700 max-w-3xl mx-auto">
        Somos un equipo apasionado dedicado a mejorar la salud y el bienestar animal a través de soluciones tecnológicas innovadoras.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {equipo.map((miembro, index) => (
          <div key={index} className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center transform transition duration-500 hover:scale-105">
            <div className="bg-blue-500 rounded-full p-4 mb-4">
              <FontAwesomeIcon icon={faUserCircle} className="text-4xl text-white" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{miembro.nombre}</h2>
            <p className="text-gray-600 text-lg">{miembro.rol}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Nuestra Misión</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Nuestra misión es proporcionar herramientas y conocimientos innovadores para mejorar la salud y el bienestar de los animales, apoyando a los ganaderos y veterinarios en su importante labor. Buscamos revolucionar la industria ganadera a través de la tecnología y el cuidado animal.
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Síguenos en Redes Sociales</h2>
        <div className="flex justify-center space-x-8">
          {redesSociales.map((red, index) => (
            <a key={index} href={red.url} target="_blank" rel="noopener noreferrer" className="text-4xl text-gray-700 hover:text-blue-500 transition duration-300">
              <img src={red.icono} alt={red.nombre} className="w-8 h-8" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcercaDeNosotros;
