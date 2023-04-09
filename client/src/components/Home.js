
import React from 'react';
import { useState, useEffect} from 'react';

const Home = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    const [formData , setFormData] = useState({
      product: '',
      price: 0,
      quantity: 0,
      date: `${year}-${month+1}-${day}`

    })

    useEffect(()=> {
      fetchSold()
    }, []);

    function handleInput(e){
      setFormData({...formData, [e.target.name]: e.target.value});
    
    }

    async function fetchSold(){
      const res = await fetch("http://localhost:5000/sold");
      const data = await res.json();
      console.log(data);
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
        const data = await res.json();
        console.log(data)
    }
    
  return (   
    <div>
        <form onSubmit={handleSubmit}>
            <input  type='text' name='product' onChange={handleInput} placeholder='Enter Product' />
            <input type="number" name='price' onChange={handleInput} placeholder='Enter Price'  />
            <input type='number' name='quantity' onChange={handleInput} placeholder='Quantity' />
            <input  type='date' name='date' onChange={handleInput} />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Home
