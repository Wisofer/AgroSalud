import { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"
import { supabase } from "../../supabase/supabase"

export default function CommunicationCoordination() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const scrollAreaRef = useRef(null)
  const [usuarioId, setUsuarioId] = useState(null)

  useEffect(() => {
    const obtenerUsuarioId = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.error("Error obteniendo el usuario:", error)
      }
      if (user) {
        setUsuarioId(user.id)
      } else {
        console.log("No hay usuario autenticado")
      }
    }
    obtenerUsuarioId()
  }, [])

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('mensajes')
        .select('*')
        .order('timestamp', { ascending: true })
      
      if (error) {
        console.error("Error al obtener mensajes:", error)
      } else {
        setMessages(data)
      }
    }

    fetchMessages()

    const channel = supabase
      .channel('mensajes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensajes' }, payload => {
        setMessages(prevMessages => [...prevMessages, payload.new])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (newMessage.trim() === "" || !usuarioId) return

    const nuevoMensaje = {
      contenido: newMessage,
      usuario_id: usuarioId,
      timestamp: new Date().toISOString()
    }

    setMessages(prevMessages => [...prevMessages, nuevoMensaje])
    setNewMessage("")

    const { error } = await supabase
      .from('mensajes')
      .insert([nuevoMensaje])

    if (error) {
      console.error("Error al enviar mensaje:", error)
      setMessages(prevMessages => prevMessages.slice(0, -1))
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto h-[600px] flex flex-col bg-white shadow-lg rounded-lg">
      <div className="p-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800">Chat</h2>
      </div>
      <div className="flex-grow overflow-hidden p-6">
        <div className="h-full pr-4 overflow-y-auto" ref={scrollAreaRef}>
          {messages.map((message, index) => (
            <div key={message.id || index} className={`mb-6 flex ${message.usuario_id === usuarioId ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-4 rounded-lg inline-block max-w-3xl ${message.usuario_id === usuarioId ? 'bg-blue-200' : 'bg-gray-200'}`}>
                <p className="text-base">{message.contenido}</p>
              </div>
              <span className={`text-sm text-gray-500 block mt-2 ${message.usuario_id === usuarioId ? 'text-right' : 'text-left'}`}>
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
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
  )
}
