import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {Typography, TextField} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {

  const formDataInitial = {
    product: '',
    price: 0,
    quantity: 0,
    date: '',

  }

  const [formData , setFormData] = useState(formDataInitial)

  function handleInput(e){
    setFormData({...formData, [e.target.name]: e.target.value});
  
  }

  async function handleSubmit(e){
    e.preventDefault();
    const res = await fetch("http://localhost:5000/sold", {
      method: 'post',
      body: JSON.stringify(formData),
      headers: {
        'content-type': 'application/json',
      }
      
    })
    if(res.ok){
      setFormData(formDataInitial);
      
      
    }
    
    
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <form onSubmit={handleSubmit} >
           
            <TextField id="outlined-basic" style={{margin: '20px'}} size='small' label="Product" variant="outlined" type='text' name='product' onChange={handleInput} placeholder='Enter Product' />
            <TextField id="outlined-basic" style={{margin: '20px'}} size='small' label="Price" variant="outlined" type="number" name='price' onChange={handleInput} placeholder='Enter Price' />
            <TextField id="outlined-basic" style={{margin: '20px'}} size='small' label="Quantity" variant="outlined" type='number' name='quantity' onChange={handleInput} placeholder='Quantity' />
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Controlled picker"
                  
                  onChange={(newValue) => setValue(newValue)}
                />
            </LocalizationProvider>

            <input  type='date' name='date' onChange={handleInput} />
            <button type='submit'>Submit</button>

        </form>
      </CardContent>
    </Card>
  );
}
