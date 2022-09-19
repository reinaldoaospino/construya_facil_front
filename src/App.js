import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/lading/landing_page';
import LoginDialog from './pages/lading/components/login/login_dialog';
import UsuariosPage from './pages/usuarios/usuarios_page';
import Header from './components/header/header';
import AdminContainer from './components/adminContainer/adminContainer';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/admin' element={<AdminContainer />} >
          <Route path="usuarios" element={<UsuariosPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
