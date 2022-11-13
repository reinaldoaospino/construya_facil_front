import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/lading/landing_page';
import LoginDialog from './pages/lading/components/login/login_dialog';
import UsuariosPage from './pages/usuarios/usuarios_page';
import Header from './components/header/header';
import AdminContainer from './components/adminContainer/adminContainer';
import ProyectoPage from './pages/proyecto/proyecto_page';
import TareaPage from './pages/tarea/tarea_page';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import ReportPage from './pages/report/report';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/admin' element={<AdminContainer />} >
          <Route path="usuarios" element={<ProtectedRoute>
            <UsuariosPage />
          </ProtectedRoute>} />

          <Route path="proyectos" element={<ProtectedRoute>
            <ProyectoPage />
          </ProtectedRoute>} />
          <Route path="tareas" element={<ProtectedRoute>
            <TareaPage />
          </ProtectedRoute>} />

          <Route path="reporte" element={<ProtectedRoute>
            <ReportPage />
          </ProtectedRoute>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
