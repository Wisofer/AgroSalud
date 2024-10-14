import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCow, faPiggyBank, faOtter, faTag, faBirthdayCake, faWeight, faVenusMars, faDna, faBullseye, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../../supabase/supabase';

const AnimalProfile = () => {
  const [animales, setAnimales] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);
  const [categoriaActiva, setCategoriaActiva] = useState('vacas');

  useEffect(() => {
    const obtenerUsuarioId = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error obteniendo el usuario:', error);
      }
      if (user) {
        setUsuarioId(user.id);
        console.log('Usuario ID:', user.id);
      } else {
        console.log('No hay usuario autenticado');
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

    const { data, error } = await supabase
      .from(categoriaActiva)
      .select('*')
      .eq('usuario_id', usuarioId);
    
    if (error) {
      console.error('Error fetching animales:', error);
    } else {
      console.log('Animales obtenidos:', data);
      setAnimales(data);
    }
  };

  const categorias = [
    { valor: 'vacas', icono: faCow, texto: 'Vacas', color: 'bg-blue-500' },
    { valor: 'cerdos', icono: faPiggyBank, texto: 'Cerdos', color: 'bg-pink-500' },
    { valor: 'cabras', icono: faOtter, texto: 'Cabras', color: 'bg-green-500' },
    { valor: 'otros_animales', icono: faTag, texto: 'Otros Animales', color: 'bg-yellow-500' }
  ];

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">Registro de Animales</h1>
      <div className="flex justify-center mb-8">
        {categorias.map(categoria => (
          <button
            key={categoria.valor}
            onClick={() => setCategoriaActiva(categoria.valor)}
            className={`px-4 py-2 mx-2 rounded-full text-white ${categoriaActiva === categoria.valor ? `${categoria.color} shadow-lg` : 'bg-gray-400'}`}
          >
            <FontAwesomeIcon icon={categoria.icono} className="mr-2" />
            {categoria.texto}
          </button>
        ))}
      </div>
      {animales.length > 0 ? (
        <ul className="space-y-4">
          {animales.map((animal) => (
            <li key={animal.id} className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-2">
                <img src={animal.foto || 'https://via.placeholder.com/50'} alt={animal.nombre} className="w-12 h-12 rounded-full mr-4 object-cover" />
                <h3 className="text-xl font-semibold text-indigo-700">{animal.nombre}</h3>
              </div>
              <p className="text-gray-600 mb-2">
                <FontAwesomeIcon icon={faTag} className="mr-2 text-indigo-500" />
                Etiqueta: <span className="font-semibold">{animal.numero_etiqueta}</span>
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
                <li>
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-yellow-500" />
                  Fecha de creación: {new Date(animal.created_at).toLocaleDateString()}
                </li>
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No hay animales registrados en esta categoría.</p>
      )}
    </div>
  );
}

export default AnimalProfile;
