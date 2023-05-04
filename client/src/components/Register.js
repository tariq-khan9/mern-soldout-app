import { TextField, Grid, Button, Box, Alert, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      password_confirmation: data.get('password_confirmation'),
    }
    if (actualData.name && actualData.email && actualData.password && actualData.password_confirmation) {
      if (actualData.password === actualData.password_confirmation) {
        const res = fetch('http://localhost:5000/auth/register', {
          method: 'POST',
          body: JSON.stringify(actualData),
          headers: {
            'content-type': 'application/json',
            
          }
        }).then(res => res.json()).then(data => {
          console.log(data); // this will log the resolved value of the promise
          if(data.message==='success'){
            setError({ status: true, msg: "success", type: 'success' })
            navigate('/login');
            console.log('created success');
           // document.getElementById('registration-form').reset()
          }
        })
        .catch(error => {
          console.error(error); // handle any errors that occurred during the promise chain
        });
        /////////////////////////////////////////////////////
        
        
        //else
        // {
        //   setError({ status: true, msg: "error", type: 'error' })
        // }
      } 
      else { 
        setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' })
      
        
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
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
        <Typography>Register here</Typography>
        <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit} >
        <TextField color='secondary' size='small' margin='normal' required fullWidth id='name' name='name' label='Name' />
        <TextField color='secondary' size='small' margin='normal' required fullWidth id='email' name='email' label='Email Address' />
        <TextField color='secondary' size='small' margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
        <TextField color='secondary' size='small' margin='normal' required fullWidth id='password_confirmation' name='password_confirmation' label='Confirm Password' type='password' />
        <Box textAlign='center'>
        <Button  type='submit' variant='contained' sx={{ mt: 3, mb: 2,  ':hover': {bgcolor:'#51146b', color:'#cbcbb3'}, bgcolor:'#7b1fa2', textTransform:'none', paddingLeft:'80px', paddingRight:'80px'}}>Register</Button>
        </Box>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
        </Box>
    </Grid>

  </Grid>
    
  </>;
};

export default Register;
