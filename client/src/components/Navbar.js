import * as React from 'react';
import { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import cookie from 'js-cookie';
import { LoggedContext } from '../App';
import {useNavigate} from 'react-router-dom';

export default function Navbar() {
 const [loginLogout, setLoginLogout] = useState('Login');
 const {logged, setLogged} = useContext(LoggedContext);
 
  const navigate = useNavigate();

  const  btnLoginLogout=()=>{
    if(logged===true){
      cookie.remove('token');
      setLogged(false);
    }
    console.log(logged);
    navigate('/login');
  }
  return (
    <>
     
        <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" color='secondary'  sx={{marginBottom:'20px'}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Daily Soldouts
            </Typography>
           <Button onClick={btnLoginLogout} color="inherit">{logged===true ? 'Logout': 'Login'}</Button>
            <Button onClick={()=>navigate('/register')}  color="inherit">{logged ? '': 'Register'}</Button>
          </Toolbar>
        </AppBar>
      </Box>
       
    </>
  );
}