
import {BrowserRouter, Routes, Route,  Navigate} from 'react-router-dom';
import { createContext, useState } from 'react'; 
import Home from './components/Home';
import Layout from './components/Layout';
import cookie from 'js-cookie';
import Login from './components/Login';
import Register from './components/Register';
import SoldChart from './components/SoldChart';

export const LoggedContext = createContext();


function App() {
  const token = cookie.get('token');
  const [loginData, setLoginData] = useState({
    email: '',
    password:'',
  });
  const [logged, setLogged] = useState(token ? true: false);
  
  return (
    <>
    <LoggedContext.Provider value={{logged, setLogged, loginData, setLoginData}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={token ? <Home/>: <Navigate to='/login'/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </LoggedContext.Provider>
    
    </>
  );
}

export default App;
