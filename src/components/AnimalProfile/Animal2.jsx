import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabase';

const AnimalProfile = () => {
  const [animales, setAnimales] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null); // Estado para el ID del usuario

  useEffect(() => {
    const obtenerUsuarioId = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error obteniendo el usuario:', error);
      }
      if (user) {
        setUsuarioId(user.id);
        console.log('Usuario ID:', user.id); // Log para verificar el ID
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
  }, [usuarioId]);

  const fetchAnimales = async () => {
    if (!usuarioId) return;

    const { data, error } = await supabase
      .from('vacas')
      .select('*')
      .eq('usuario_id', usuarioId);
    
    if (error) {
      console.error('Error fetching animales:', error);
    } else {
      console.log('Animales obtenidos:', data); // Log para verificar los datos
      setAnimales(data);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">Registro de Animales</h1>
      {animales.length > 0 ? (
        <ul>
          {animales.map((animal) => (
            <li key={animal.id} className="p-4 border-b">
              <h2 className="text-xl font-semibold">{animal.nombre}</h2>
              <p><strong>Raza:</strong> {animal.raza}</p>
              <p><strong>Peso:</strong> {animal.peso} kg</p>
              <p><strong>Género:</strong> {animal.genero}</p>
              <p><strong>Propósito:</strong> {animal.proposito}</p>
              <p><strong>Edad:</strong> {animal.meses} meses</p>
              <p><strong>Número de etiqueta:</strong> {animal.numero_etiqueta}</p>
              <p><strong>Fecha de creación:</strong> {new Date(animal.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No hay animales registrados.</p>
      )}
    </div>
  );
}

export default AnimalProfile;
