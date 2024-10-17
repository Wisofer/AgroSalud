import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComments, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { supabase } from '../../supabase/supabase';

const CommunicationCoordination = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [conversacionId, setConversacionId] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const { data, error } = await supabase.from('usuarios').select('*');
      if (error) console.error('Error fetching usuarios:', error);
      else setUsuarios(data);
    };

    const fetchUsuarioActual = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) console.error('Error fetching usuario actual:', error);
      else setUsuarioActual(user);
    };

    fetchUsuarios();
    fetchUsuarioActual();
  }, []);

  useEffect(() => {
    const fetchMensajes = async () => {
      if (conversacionId) {
        const { data, error } = await supabase
          .from('mensajes_conversacion')
          .select('*, mensajes(*)')
          .eq('conversacion_id', conversacionId);
        if (error) console.error('Error fetching mensajes:', error);
        else setMensajes(data.map(mc => mc.mensajes));
      }
    };

    fetchMensajes();
  }, [conversacionId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (mensaje.trim() === '' || !usuarioSeleccionado || !usuarioActual) return;

    // Enviar el mensaje
    const { data: mensajeData, error: mensajeError } = await supabase.from('mensajes').insert([
      { usuario_id: usuarioActual.id, contenido: mensaje, destinatario_id: usuarioSeleccionado.id },
    ]).single();

    if (mensajeError) {
      console.error('Error sending message:', mensajeError);
      return;
    }

    // Crear conversación si no existe
    if (!conversacionId) {
      const { data: conversacionData, error: conversacionError } = await supabase.from('conversaciones').insert([
        { usuario1_id: usuarioActual.id, usuario2_id: usuarioSeleccionado.id },
      ]).single();

      if (conversacionError) {
        console.error('Error creating conversation:', conversacionError);
        return;
      }

      setConversacionId(conversacionData.id);
    }

    // Relacionar mensaje con conversación
    const { error: mensajeConversacionError } = await supabase.from('mensajes_conversacion').insert([
      { mensaje_id: mensajeData.id, conversacion_id: conversacionId },
    ]);

    if (mensajeConversacionError) {
      console.error('Error linking message to conversation:', mensajeConversacionError);
      return;
    }

    // Actualizar mensajes en el estado
    setMensajes(prevMensajes => [...prevMensajes, mensajeData]);
    setMensaje(''); // Limpiar el campo de mensaje
  };

  const handleSelectUsuario = async (usuario) => {
    setUsuarioSeleccionado(usuario);

    const { data, error } = await supabase
      .from('conversaciones')
      .select('*')
      .or(`usuario1_id.eq.${usuarioActual.id},usuario2_id.eq.${usuarioActual.id}`)
      .or(`usuario1_id.eq.${usuario.id},usuario2_id.eq.${usuario.id}`)
      .single();

    if (error) {
      console.error('Error fetching conversation:', error);
      return;
    }

    setConversacionId(data.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-8 font-montserrat">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Caja de Chat */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg col-span-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-800">
            <FontAwesomeIcon icon={faComments} /> Chat {usuarioSeleccionado && `con ${usuarioSeleccionado.nombre}`}
          </h2>
          <div className="chat-box h-96 overflow-y-scroll mb-4 p-4 border border-blue-300 rounded-lg">
            {mensajes.map((msg) => (
              <div key={msg.id} className="mb-4">
                <strong>{msg.usuario_id === usuarioActual.id ? 'Yo' : usuarioSeleccionado.nombre}:</strong> {msg.contenido}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="ml-4 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </motion.div>

        {/* Lista de Usuarios */}
        <motion.div
          className="bg-gray-100 p-6 rounded-lg shadow-lg h-96 overflow-y-scroll"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-800">
            <FontAwesomeIcon icon={faUser} /> Usuarios
          </h2>
          <div className="border border-blue-300 rounded-lg p-4 bg-white">
            <ul className="space-y-4">
              {usuarios.map((usuario) => (
                <li 
                  key={usuario.id} 
                  className="flex items-center cursor-pointer border-b border-gray-300 pb-2 mb-2 transition-colors duration-300 hover:bg-blue-100" 
                  onClick={() => handleSelectUsuario(usuario)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center transition-transform duration-300 hover:scale-110">
                      <FontAwesomeIcon icon={faUser} className="text-xl" />
                    </div>
                    <div>
                      <span className="text-lg font-semibold">{usuario.nombre}</span>
                      <p className="text-sm text-gray-500">{usuario.rol_id}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunicationCoordination;
