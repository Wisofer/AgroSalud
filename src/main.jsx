import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './HomePage.jsx'
import Dashboard from './components/Dashboard.jsx'
import CowForm from './components/Formularios/CowForm.jsx'
import PigForm from './components/Formularios/PigForm.jsx'
import GoatForm from './components/Formularios/GoatForm.jsx'
import OtherForm from './components/Formularios/OtherForm.jsx'
import AnimalHealthManagement from './components/AnimalHealthManagement/AnimalHealthManagement.jsx'
import AnimalWelfareMonitoring from './components/AnimalWelfareMonitoring/AnimalWelfareMonitoring.jsx'
import CommunicationCoordination from './components/CommunicationCoordination/CommunicationCoordination.jsx'
import DataAutomationAnalysis from './components/DataAutomationAnalysis/DataAutomationAnalysis.jsx'
import AnimalProfile from './components/AnimalProfile/AnimalProfile.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },

  {
    path: '/cow',
    element: <CowForm />
  },
  {
    path: '/pig',
    element: <PigForm />
  },
  {
    path: '/goat',
    element: <GoatForm />
  },
  {
    path: '/other',
    element: <OtherForm />
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'gestion-salud-animal',
        element: <AnimalHealthManagement />
      },
      {
        path: 'monitoreo-bienestar-animal',
        element: <AnimalWelfareMonitoring />
      },
      {
        path: 'comunicacion-coordinacion',
        element: <CommunicationCoordination />
      },
      {
        path: 'analisis-automatizacion-datos',
        element: <DataAutomationAnalysis />
      },
      {
        path: 'perfil-animal',
        element: <AnimalProfile />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
