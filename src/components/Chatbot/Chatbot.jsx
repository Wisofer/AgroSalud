import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabase';
import { Send } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const obtenerUsuarioId = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error obteniendo el usuario:", error);
      }
      if (user) {
        setUsuarioId(user.id);
      } else {
        console.log("No hay usuario autenticado");
      }
    };
    obtenerUsuarioId();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('mensajes_chatbot')
        .select('*')
        .order('timestamp', { ascending: true });

      if (error) {
        console.error("Error al obtener mensajes:", error);
      } else {
        setMessages(data);
      }
      setLoading(false);
    };

    fetchMessages();

    const channel = supabase
      .channel('mensajes_chatbot')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensajes_chatbot' }, payload => {
        setMessages(prevMessages => [...prevMessages, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !usuarioId) return;

    const nuevoMensaje = {
      contenido: newMessage,
      usuario_id: usuarioId,
      timestamp: new Date().toISOString()
    };

    setMessages(prevMessages => [...prevMessages, nuevoMensaje]);
    setNewMessage("");

    const { error } = await supabase
      .from('mensajes_chatbot')
      .insert([nuevoMensaje]);

    if (error) {
      console.error("Error al enviar mensaje:", error);
      setMessages(prevMessages => prevMessages.slice(0, -1));
    } else {
      // Llamar a la IA para obtener una respuesta
      obtenerRespuestaIA(newMessage);
    }
  };

  const obtenerRespuestaIA = async (mensaje) => {
    try {
      const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer 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`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: mensaje,
        })
      });

      const data = await response.json();
      const respuestaIA = data.generated_text.trim();
      const nuevoMensajeIA = {
        contenido: respuestaIA,
        usuario_id: 'IA',
        timestamp: new Date().toISOString()
      };

      setMessages(prevMessages => [...prevMessages, nuevoMensajeIA]);

      const { error } = await supabase
        .from('mensajes_chatbot')
        .insert([nuevoMensajeIA]);

      if (error) {
        console.error("Error al guardar el mensaje de la IA:", error);
      }
    } catch (error) {
      console.error("Error al obtener respuesta de la IA:", error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[600px] flex flex-col bg-white shadow-lg rounded-lg">
      <div className="p-6 bg-gray-100 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-center text-gray-800">Chatbot AgroSalud</h2>
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-grow overflow-hidden p-6">
        <div className="h-full pr-4 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-400"></div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={message.id || index} className={`mb-6 flex ${message.usuario_id === usuarioId ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 rounded-lg inline-block max-w-3xl ${message.usuario_id === usuarioId ? 'bg-blue-200' : 'bg-gray-200'}`}>
                  <p className="text-base">{message.contenido}</p>
                </div>
                <span className={`text-sm text-gray-500 block mt-2 ${message.usuario_id === usuarioId ? 'text-right' : 'text-left'}`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="p-6 border-t">
        <form onSubmit={handleSendMessage} className="w-full">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow border border-gray-300 rounded-lg px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg"
            >
              <Send className="h-5 w-5 mr-2" />
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
