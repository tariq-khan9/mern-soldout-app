import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {Typography, TextField} from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {

    function handleInput(){

    }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <form >
           
            <TextField id="outlined-basic" label="Outlined" variant="outlined" type='text' name='product' onChange={handleInput} placeholder='Enter Product' />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" type="number" name='price' onChange={handleInput} placeholder='Enter Price' />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" type='number' name='quantity' onChange={handleInput} placeholder='Quantity' />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" placeholder='Enter Product' />
            <input  type='date' name='date' onChange={handleInput} />
            <button type='submit'>Submit</button>

        </form>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
