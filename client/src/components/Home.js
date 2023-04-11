
import React from 'react';
import FormCard from './FormCard.js'
import { useState, useEffect} from 'react';

const Home = () => {
  
    const [soldData, setSoldData] = useState([]);

    useEffect(()=> {
      fetchSold()
    }, []);

    async function fetchSold(){
      const res = await fetch("http://localhost:5000/sold");
      const data = await res.json();
      setSoldData(data);
    }

   return (   
    <div>
      <FormCard/>
        <section style={{marginTop:'50px'}}>
          <table>
            <thead>
              <td>Product</td>
              <td>Unit Price</td>
              <td>Quantity</td>
              <td>Total Price</td>
              <td>Date</td>
            </thead>
            <tbody>
              {soldData.map((item)=>(
                <tr>
                  <td>{item.product}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.totalPrice}</td>
                  <td>{item.date}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </section>
    </div>
  )
}

export default Home
