import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AgroSaludProvider } from "./Context/AgroSaludContext.jsx";
import HomePage from "./HomePage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CowForm from "./components/Formularios/CowForm.jsx";
import PigForm from "./components/Formularios/PigForm.jsx";
import GoatForm from "./components/Formularios/GoatForm.jsx";
import OtherForm from "./components/Formularios/OtherForm.jsx";
import AnimalHealthManagement from "./components/AnimalHealthManagement/AnimalHealthManagement.jsx";
import CommunicationCoordination from "./components/CommunicationCoordination/CommunicationCoordination.jsx";
import DataAutomationAnalysis from "./components/DataAutomationAnalysis/DataAutomationAnalysis.jsx";
import AnimalProfile from "./components/AnimalProfile/AnimalProfile.jsx";
import MonitoreoMedico from "./components/MonitoreoMedico/MonitoreoMedico.jsx";
import Vacunacion from "./components/Vacunacion/Vacunacion.jsx";
import Inicio from "./components/Home/Inicio.jsx";
import RegisterForm from "./auth/RegisterForm.jsx";
import Login from "./auth/Login.jsx";
import NoFound from "./pages/NoFound.jsx";
import Tratamiento from "./components/tratamiento medico/Tratamiento.jsx"; 
import Chequeo from "./components/chequeorutinario/chequeo.jsx"; 
import HistorialMedico from "./components/Historial Medico/HisotorialMedico.jsx"; 
import ResultadoMonitoreoMedico from "./components/MonitoreoMedico/Resultado-Monitoreo-Medico.jsx"; 
import ResultadoVacunacion from "./components/Vacunacion/Resultado-Vacunacion.jsx"; 
import ResultadoTratamientoMedico from "./components/tratamiento medico/Resultado-Tratamiento-Medico.jsx"; 
import ResultadoChequeoRutinarios from "./components/chequeorutinario/Resultado-Chequeo-Rutinarios.jsx"; 
import Configuracion from "./components/Configuracion/Configuracion.jsx"; 
import Recomendaciones from "./components/Recomendaciones/Recomendaciones.jsx";
import Cerdos from "./components/Nutricion/Cerdos.jsx";
import Vacas from "./components/Nutricion/Vacas.jsx";
import Cabras from "./components/Nutricion/Cabras.jsx";
import AcercaDeNosotros from "./components/Acerca/Acerca-de-Nosotros.jsx";
import { ProtectedRoute, AuthRoute } from "./Context/AuthRoutes.jsx"; 

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/registro",
    element: (
      <AuthRoute>
        <RegisterForm />
      </AuthRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: "/cow",
    element: (
      <ProtectedRoute>
        <CowForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pig",
    element: (
      <ProtectedRoute>
        <PigForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/goat",
    element: (
      <ProtectedRoute>
        <GoatForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/other_animals",
    element: (
      <ProtectedRoute>
        <OtherForm />
      </ProtectedRoute>
    ),
  },

  {
    path: "*",
    element: (
      <ProtectedRoute>
        <NoFound />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Inicio />,
      },
      {
        path: "cow",
        element: <CowForm />,
      },
      {
        path: "pig",
        element: <PigForm />,
      },
      {
        path: "goat",
        element: <GoatForm />,
      },
      {
        path: "other_animals",
        element: <OtherForm />,
      },
      {
        path: "gestion-salud-animal",
        element: <AnimalHealthManagement />,
      },
      {
        path: "comunicacion-coordinacion",
        element: <CommunicationCoordination />,
      },
      {
        path: "analisis-automatizacion-datos",
        element: <DataAutomationAnalysis />,
      },
      {
        path: "perfil-animal",
        element: <AnimalProfile />,
      },
      {
        path: "monitoreo-medico",
        element: <MonitoreoMedico />,
      },
      {
        path: "vacunacion",
        element: <Vacunacion />,
      },
      {
        path: "tratamiento", 
        element: <Tratamiento />,
      },
      {
        path: "chequeos-rutinarios",
        element: <Chequeo />,
      },
      {
        path: "historial-medico",
        element: <HistorialMedico />,
      },
      {
        path: "resultado-monitoreo-medico",
        element: <ResultadoMonitoreoMedico />,
      },
      {
        path: "resultado-vacunacion",
        element: <ResultadoVacunacion />,
      },
      {
        path: "resultado-tratamiento-medico",
        element: <ResultadoTratamientoMedico />,
      },
      {
        path: "resultado-chequeos-rutinarios",
        element: <ResultadoChequeoRutinarios />,
      },
      {
        path: "configuracion",
        element: <Configuracion />,
      },
      {
        path: "recomendaciones",
        element: <Recomendaciones />,
      },
      {
        path: "cerdos",
        element: <Cerdos />,
      },
      {
        path: "vacas",
        element: <Vacas />,
      },
      {
        path: "cabras",
        element: <Cabras />,
      },
      {
        path: "acerca-de-nosotros",
        element: <AcercaDeNosotros />,
      },
      {
        path: "*",
        element: <NoFound />,
      },
    ],
  },
  {
    path: "*",
    element: <NoFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AgroSaludProvider>
      <RouterProvider router={router} />
    </AgroSaludProvider>
  </React.StrictMode>
);
