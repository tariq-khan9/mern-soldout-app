import * as React from 'react';
import { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {Typography, TextField} from '@mui/material';
import {  LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function FormCard({fetchSold, editData, setEditData, formateDate}) {
  const token = cookie.get('token');
  const formDataInitial = {
    product: '',
    price: '',
    quantity: '',
    date: dayjs(Date.now()),
  }

  const [formData , setFormData] = useState(formDataInitial)

  useEffect(() => {
    if(editData!=={}){
      const oldDate = formateDate(editData.date);
      setFormData({
        product: editData.product,
        price: editData.price, 
        quantity: editData.quantity,
        date: dayjs(oldDate)})
    }
  }, [editData])

  function handleInput(e){
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  function handleDate(newValue){
    setFormData({...formData, date:newValue})
  }

  async function handleSubmit(e){
    e.preventDefault();
    const res = await fetch("http://localhost:5000/sold", {
      method: 'post',
      body: JSON.stringify(formData),
      headers: {
        'content-type': 'application/json',
        'Authorization' : `Bearer ${token}`,
      }
    })
    if(res.ok){
      setFormData(formDataInitial);
      fetchSold();
    } 
  }

  async function handleEdit(){
    const res = await fetch(`http://localhost:5000/sold/${editData._id}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        'content-type': 'application/json',
      }
    })
   if(res.ok){
    setFormData(formDataInitial);
    setEditData({});
    fetchSold();
   }
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {Object.keys(editData).length===0 && (
             <Typography variant='h6' sx={{marginLeft: '20px', marginBottom:'20px'}}>Add New Record</Typography>
        )}
        {Object.keys(editData).length!==0 && (
             <Typography variant='h6' sx={{marginLeft: '20px', marginBottom:'20px'}}>Update Record</Typography>
        )}
        <form onSubmit={handleSubmit} >
          <TextField id="outlined-basic" color='secondary' style={{marginLeft: '20px', marginTop: '10px'}} size='small' label="Product" variant="outlined" type='text' name='product' value={formData.product} onChange={handleInput} placeholder='Enter Product' />
          <TextField id="outlined-basic" color='secondary' style={{marginLeft: '20px', marginTop: '10px'}} size='small' label="Price" variant="outlined" type="number" name='price' value={formData.price} onChange={handleInput} placeholder='Enter Price' />
          <TextField id="outlined-basic" color='secondary' style={{marginLeft: '20px', marginTop: '10px'}} size='small' label="Quantity" variant="outlined" type='number' name='quantity' value={formData.quantity} onChange={handleInput} placeholder='Quantity' />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Sold Date"
                name='date'
                color='secondary'
                sx={{marginLeft: '20px', marginTop:'0px', marginTop: '10px'}}
                value={formData.date}
                onChange={handleDate}
                  slotProps={{
                        textField: { size: "small", margin: "dense" },
                      }}
              />
          </LocalizationProvider>
          {Object.keys(editData).length===0 && (
            <Button onClick={handleSubmit} color='secondary' style={{fontWeight:'bold'}} type='submit' sx={{marginLeft:'20px', marginTop: '10px'}} variant="outlined">Submit</Button>
          )}

          {Object.keys(editData).length!==0 && (
            <Button onClick={handleEdit} color='secondary' style={{fontWeight:'bold'}}  sx={{marginLeft:'20px', marginTop: '10px'}} variant="outlined">Update</Button>
          )}
         
         
          
        </form>
      </CardContent>
    </Card>
  );
}
