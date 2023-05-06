import { Grid, TextField, Button, Box, Alert, Typography } from '@mui/material';
import { useState, useContext } from 'react';
import cookie from 'js-cookie';
import { LoggedContext } from '../App';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const {logged, setLogged, loginData} = useContext(LoggedContext);
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    try{
    if ( actualData.email && actualData.password ) {
        const res = await fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          body: JSON.stringify(actualData),
          headers: {
            'content-type': 'application/json',
          }
        });
        const {token} = await res.json();
        if(res.status===204){
          console.log("not matched");
        }
        /////////////////////////////////////////////////////
        if(res.ok){
         
          cookie.set('token', token);
          navigate('/');
          setLogged(true);
          setError({ status: true, msg: "login success", type: 'success' })
        }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
    }
    catch(e){
      setError({ status: true, msg: "Email/Password didnt matched OR check your Server connection", type: 'error' })
    }
    setTimeout(() => {
      setError({
        status: false,
        msg: "",
        type: ""
      })
    }, 4000);
    
  }

  return <>
  <Grid container sx={{marginTop:'30px'}}>
    <Grid item lg={4} sm={4}></Grid>
    <Grid item lg={4} sm={4}>
      <Typography style={{color:'#7b1fa2', fontSize:'25px', fontFamily:'revert'}}>Login here</Typography>
      <Box component='form' noValidate sx={{ mt: 1}} id='login-form' onSubmit={handleSubmit}>
          <TextField defaultValue={loginData.email} color='secondary' size='small' margin='normal' required fullWidth id='email' name='email' label='Email Address'/>
          <TextField defaultValue={loginData.password} color='secondary' size='small' margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
          <Box textAlign='center'>
          <Button    type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5, ':hover': {bgcolor:'#51146b', color:'#cbcbb3'}, bgcolor:'#7b1fa2', textTransform:'none', paddingLeft:'75px', paddingRight:'75px'}}>Login</Button>
          </Box>
          
      </Box>
      {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
    </Grid>
  </Grid>
    
  </>;
};

export default Login;
