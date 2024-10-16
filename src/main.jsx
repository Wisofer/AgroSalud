// main.jsx o index.jsx (según tu configuración)
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AgroSaludProvider } from "./Context/AgroSaludContext.jsx"; // Asegúrate de que la ruta es correcta
import HomePage from "./HomePage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CowForm from "./components/Formularios/CowForm.jsx";
import PigForm from "./components/Formularios/PigForm.jsx";
import GoatForm from "./components/Formularios/GoatForm.jsx";
import OtherForm from "./components/Formularios/OtherForm.jsx";
import AnimalHealthManagement from "./components/AnimalHealthManagement/AnimalHealthManagement.jsx";
import AnimalWelfareMonitoring from "./components/AnimalWelfareMonitoring/AnimalWelfareMonitoring.jsx";
import CommunicationCoordination from "./components/CommunicationCoordination/CommunicationCoordination.jsx";
import DataAutomationAnalysis from "./components/DataAutomationAnalysis/DataAutomationAnalysis.jsx";
import AnimalProfile from "./components/AnimalProfile/AnimalProfile.jsx";
import RegistroMedico from "./components/RegistroMedico/RegistroMedico.jsx";
import Vacunacion from "./components/Vacunacion/Vacunacion.jsx";
import Inicio from "./components/Home/Inicio.jsx";
import RegisterForm from "./auth/RegisterForm.jsx";
import Login from "./auth/Login.jsx";
import NoFound from "./pages/NoFound.jsx";
import { ProtectedRoute, AuthRoute } from "./Context/AuthRoutes.jsx"; // Asegúrate de que la ruta es correcta
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
        children: [
          {
            path: "monitoreo-medico",
            element: <RegistroMedico />,
          },
          {
            path: "vacunacion",
            element: <Vacunacion />,
          },
        ],
      },
      {
        path: "monitoreo-bienestar-animal",
        element: <AnimalWelfareMonitoring />,
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
