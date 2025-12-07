import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import AdminContents from './pages/Admin/AdminContents';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminSettings from './pages/Admin/AdminSettings';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import VideoPlayer from "./pages/Player/VideoPlayer";
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
   const navigate = useNavigate();
   const location = useLocation();



  useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
      if(user){
        console.log("Logged In");
        // Só redireciona para home se estiver na página de login
        if(location.pathname === '/login'){
          navigate('/')
        }
      }else {
        console.log("Logged Out");
        navigate('/login');
      }
    })
  }, [location.pathname])
  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/admin' element={<Admin />}/>
        <Route path='/admin/conteudos' element={<AdminContents />}/>
        <Route path='/admin/usuarios' element={<AdminUsers />}/>
        <Route path='/admin/configuracoes' element={<AdminSettings />}/>
        <Route path="/player/:id" element={<VideoPlayer />} />
        
      </Routes>
    </div>
  )
}

export default App