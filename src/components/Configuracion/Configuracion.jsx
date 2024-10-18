import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabase';

export default function Configuracion() {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    departamento: '',
    sexo: '',
    imagen: '',
    password: '',
    newPassword: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error obteniendo el usuario:', error);
        setIsLoading(false);
        return;
      }
      if (user) {
        const { data: userInfo, error: userInfoError } = await supabase
          .from('usuarios')
          .select('nombre, apellido, email, rol_id, departamento_id, sexo, imagen')
          .eq('id', user.id)
          .single();
        if (userInfoError) {
          console.error('Error obteniendo la información del usuario:', userInfoError);
        } else {
          setUserData(userInfo);
        }
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error obteniendo el usuario:', error);
      return;
    }
    if (user) {
      const { error: updateError } = await supabase
        .from('usuarios')
        .update(userData)
        .eq('id', user.id);
      if (updateError) {
        console.error('Error actualizando la información del usuario:', updateError);
      } else {
        if (userData.password && userData.newPassword) {
          const { error: passwordError } = await supabase.auth.updateUser({
            password: userData.newPassword,
            currentPassword: userData.password
          });
          if (passwordError) {
            console.error('Error actualizando la contraseña:', passwordError);
          }
        }
        setIsModalOpen(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData((prevData) => ({
        ...prevData,
        imagen: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center space-x-2 mt-16 mb-16">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-400"></div>
          </div>
        ) : (
          <>
            <div className="flex p-6">
              {/* Sección de Avatar */}
              <div className="w-1/3 pr-6">
                <div className="w-48 h-48 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
                  <img 
                    src={userData.imagen || "/placeholder.svg?height=192&width=192"} 
                    alt="Foto de perfil" 
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
              
              {/* Sección de Información del Usuario */}
              <div className="w-2/3">
                <h2 className="text-3xl font-bold mb-6">Perfil de Usuario</h2>
                <div className="grid grid-cols-2 gap-6">
                  <InfoItem icon={<UserIcon />} label="Nombre" value={userData.nombre} />
                  <InfoItem icon={<UserIcon />} label="Apellido" value={userData.apellido} />
                  <InfoItem icon={<MailIcon />} label="Correo Electrónico" value={userData.email} />
                  <InfoItem icon={<LockIcon />} label="Contraseña" value="••••••••" />
                  <InfoItem icon={<UserCircleIcon />} label="Rol" value={userData.rol_id} />
                  <InfoItem icon={<MapPinIcon />} label="Departamento" value={userData.departamento_id} />
                  <InfoItem icon={<UserIcon />} label="Sexo" value={userData.sexo} />
                </div>
              </div>
            </div>
            <div className="flex justify-start p-6">
              <button 
                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-300"
                onClick={handleEdit}
              >
                Editar
              </button>
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input 
                  type="text" 
                  name="nombre" 
                  value={userData.nombre} 
                  onChange={handleChange} 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Apellido</label>
                <input 
                  type="text" 
                  name="apellido" 
                  value={userData.apellido} 
                  onChange={handleChange} 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input 
                  type="email" 
                  name="email" 
                  value={userData.email} 
                  onChange={handleChange} 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rol</label>
                <select 
                  name="rol" 
                  value={userData.rol_id} 
                  onChange={handleChange} 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="Granjero">Granjero</option>
                  <option value="Veterinario">Veterinario</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Técnico Agrícola">Técnico Agrícola</option>
                  <option value="Investigador">Investigador</option>
                  <option value="Estudiante">Estudiante</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Departamento</label>
                <select 
                  name="departamento" 
                  value={userData.departamento_id} 
                  onChange={handleChange} 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="Boaco">Boaco</option>
                  <option value="Carazo">Carazo</option>
                  <option value="Chinandega">Chinandega</option>
                  <option value="Chontales">Chontales</option>
                  <option value="Estelí">Estelí</option>
                  <option value="Granada">Granada</option>
                  <option value="Jinotega">Jinotega</option>
                  <option value="León">León</option>
                  <option value="Madriz">Madriz</option>
                  <option value="Managua">Managua</option>
                  <option value="Masaya">Masaya</option>
                  <option value="Matagalpa">Matagalpa</option>
                  <option value="Nueva Segovia">Nueva Segovia</option>
                  <option value="Río San Juan">Río San Juan</option>
                  <option value="Rivas">Rivas</option>
                  <option value="RACCN">RACCN</option>
                  <option value="RACCS">RACCS</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sexo</label>
                <select 
                  name="sexo" 
                  value={userData.sexo} 
                  onChange={handleChange} 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Imagen</label>
                <input 
                  type="file" 
                  name="imagen" 
                  onChange={handleImageChange} 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contraseña Actual</label>
                <input 
                  type="password" 
                  name="password" 
                  value={userData.password} 
                  onChange={handleChange} 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
                <input 
                  type="password" 
                  name="newPassword" 
                  value={userData.newPassword} 
                  onChange={handleChange} 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button 
                className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors duration-300 mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button 
                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duración-300"
                onClick={handleSave}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componentes de Iconos usando SVG básico (sin bibliotecas externas)
function MailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m-6 8V8a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11V7a4 4 0 00-8 0v4M20 12a2 2 0 01-2 2H6a2 2 0 01-2-2v-1m4-6V7a4 4 0 014-4v4" />
    </svg>
  );
}

function UserCircleIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4a9 9 0 00-9 9h0v2a9 9 0 0018 0v-2a9 9 0 00-9-9zm0 0v4" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.5C8.5 4.5 5.5 7.5 5.5 11c0 4.42 6.5 8.5 6.5 8.5s6.5-4.08 6.5-8.5C18.5 7.5 15.5 4.5 12 4.5zM12 7.5a3 3 0 100 6 3 3 0 000-6z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5a7 7 0 11-7 7 7 7 0 017-7zm0 0v4" />
    </svg>
  );
}

// Componente InfoItem
function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="text-gray-500">{icon}</div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-gray-500">{value}</p>
      </div>
    </div>
  );
}
