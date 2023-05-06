import * as React from 'react';
import { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import cookie from 'js-cookie';
import { LoggedContext } from '../App';
import {useNavigate} from 'react-router-dom';

export default function Navbar() {
 
 const {logged, setLogged, setLoginData} = useContext(LoggedContext);
 
  const navigate = useNavigate();

  const  btnLoginLogout=()=>{
    if(logged===true){
      cookie.remove('token');
      setLogged(false);
      setLoginData({
        email:'',
        password:'',
      });
    }
    navigate('/login');
  }
  return (
    <>
     
        <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" color='secondary'  sx={{marginBottom:'20px'}}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily:'revert',color:'#33001a',fontSize:'25px', textShadow: '0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6'}}>
              Daily Soldouts
            </Typography>
           <Button sx={{textTransform:'none'}} onClick={btnLoginLogout} color="inherit">{logged===true ? 'Logout': 'Login'}</Button>
            <Button sx={{textTransform:'none'}} onClick={()=>navigate('/register')}  color="inherit">{logged ? '': 'Register'}</Button>
          </Toolbar>
        </AppBar>
      </Box>
       
    </>
  );
}