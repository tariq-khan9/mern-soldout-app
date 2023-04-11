
import React from 'react';
import { useState, useEffect} from 'react';
import FormCard from './FormCard.js';

const Home = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    const formDataInitial = {
      product: '',
      price: 0,
      quantity: 0,
      date: `${year}-${month+1}-${day}`

    }

    const [formData , setFormData] = useState(formDataInitial)

    const [soldData, setSoldData] = useState([]);

    useEffect(()=> {
      fetchSold()
    }, []);

    function handleInput(e){
      setFormData({...formData, [e.target.name]: e.target.value});
    
    }

    async function fetchSold(){
      const res = await fetch("http://localhost:5000/sold");
      const data = await res.json();
      setSoldData(data);
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
          fetchSold();
          
        }
        
        
    }
    console.log(soldData);
  return (   
    <div>
      <FormCard/>
        <form onSubmit={handleSubmit}>
            <input  type='text' name='product' onChange={handleInput} placeholder='Enter Product' />
            <input type="number" name='price' onChange={handleInput} placeholder='Enter Price'  />
            <input type='number' name='quantity' onChange={handleInput} placeholder='Quantity' />
            <input  type='date' name='date' onChange={handleInput} />
            <button type='submit'>Submit</button>
        </form>
        <hr/>
        <section>
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
