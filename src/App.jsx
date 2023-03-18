import { Router } from './routes/Router';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Global.css';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AuthContext, AuthProvider } from './contexts/Auth';


function App() {

  // const suachave = ""

  return (
    <BrowserRouter>
    <AuthProvider>
    <div className='container'> 
    <ToastContainer autoClose={5000} theme="colored" /> 
    <Router />

    </div>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
