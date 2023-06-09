
import React from 'react';
import FormCard from './FormCard.js'
import { useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import dayjs from 'dayjs';
import { LoggedContext } from '../App.js';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import cookie from 'js-cookie';
import { Grid } from '@mui/material';
import SoldChart from './SoldChart.js';




const Home = () => {
  
  const [soldData, setSoldData] = useState([]);
  const [editData, setEditData] = useState({});

  useEffect(()=> {
    fetchSold()
  }, []); 

  function formateDate(date){
    return dayjs(date).format("MM-DD-YYYY");
  }

  async function fetchSold(){
    const token = cookie.get('token');
    const res = await fetch("http://localhost:5000/sold", {
      headers:{
        Authorization: `Bearer ${token}`,
      },
    });
    const {sold} = await res.json();
    setSoldData(sold);
    console.log(sold);
  }

  async function remove(id){
    if (!window.confirm("Are you really want to delete?")) return;
    const res = await fetch(`http://localhost:5000/sold/${id}`,{
    method: "DELETE",
    });
    if(res.ok){
    window.alert("Deleted Successfully");
    fetchSold();
    }
  }

  return (   
  
  <div>
    <Grid sx={{mx:'20px'}}>
    <Grid container>
      <Grid item lg={5} sm={5} sx={{height:'500px', width:'200px', px:'20px'}}>
         <SoldChart data={soldData}/>
      </Grid>
      <Grid item  lg={7} sm={7}>
        <Grid>
         <FormCard fetchSold={fetchSold} editData={editData} setEditData={setEditData} formateDate={formateDate}/>
        </Grid>
      <hr/>
        <Grid style={{overflow:'auto', height:'250px'}}>
        <TableContainer component={Paper}>
          <Table  aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{fontWeight:'bolder'}} align="center">Product</TableCell>
                <TableCell style={{fontWeight:'bolder'}} align="center">Price</TableCell>
                <TableCell style={{fontWeight:'bolder'}} align="center">Quantity</TableCell>
                <TableCell style={{fontWeight:'bolder'}} align="center">Date</TableCell>
                <TableCell style={{fontWeight:'bolder'}} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {soldData.map(month=>(
                month.data.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='center' component="th" scope="row">
                      {row.product}
                    </TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">{formateDate(row.date)}</TableCell>
                    <TableCell align='center' >
                    <Button onClick={()=> setEditData(row)}  sx={{paddingLeft:'25px', paddingRight:'25px'}} color='secondary' variant="outlined">Edit</Button>
                    <Button color='error' onClick={()=> remove(row._id)} sx={{marginLeft:'10px'}}  variant="outlined">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))
              ))}
              
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
      </Grid>
  </Grid>
  </Grid>
  </div>

  )
}

export default Home
