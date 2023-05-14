import dayjs from 'dayjs';
import {Typography} from '@mui/material'
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default function SoldChart({data}) {
  
  const chartData = data.map((item)=>{
    item.month = dayjs().month(item._id-1).format("MMMM");
    return item;
  })
 
    return (
      <>
      <Typography variant='h6' sx={{marginLeft: '20px', marginBottom:'20px', textAlign:'center'}} style={{color:'#7b1fa2', fontSize:'25px', fontFamily:'revert'}}>Monthly-Wise Amount</Typography>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis dataKey="totalAmount" />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalAmount" fill="#800080" />
          
        </BarChart>
      </ResponsiveContainer>
      </>
    );
  
}
