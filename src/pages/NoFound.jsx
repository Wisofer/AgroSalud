import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowDown } from 'react-icons/fa';
import cowdance from "../../public/img/cowdance.gif";
import audioClip from "../../public/audios/audio.mp3";

const NotFoundPage = () => {
    const navigate = useNavigate();
    const audioRef = useRef(null);

    const handleGoBack = () => {
        navigate('/');
    };

    const handleUserInteraction = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(error => {
                console.error("Error al reproducir el audio:", error);
            });
        }
    };

    useEffect(() => {
        // Añadir un listener para la interacción del usuario
        window.addEventListener('click', handleUserInteraction);
        return () => {
            window.removeEventListener('click', handleUserInteraction);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <img src={cowdance} alt="Cow Dance" className="mb-6 w-80 h-auto" />
            <audio ref={audioRef} className="mb-6" loop>
                <source src={audioClip} type="audio/mpeg" />
                Tu navegador no soporta el elemento de audio.
            </audio>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Página no encontrada</h1>
            <p className="text-lg text-gray-600 mb-6">Lo sentimos, la página que estás buscando no existe.</p>
            <div className="flex flex-col items-center mb-6">
                <FaArrowDown className="text-4xl text-gray-600 mb-2" />
                <p className="text-lg text-gray-600">Haz clic en cualquier lugar para reproducir el audio.</p>
            </div>
            <button
                onClick={handleGoBack}
                className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            >
                Volver al inicio
            </button>
        </div>
    );
};

export default NotFoundPage;