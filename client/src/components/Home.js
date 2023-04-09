import React from 'react';
import { useState } from 'react';

const Home = () => {

  const [formData , setFormData] = useState({
    product: '',
    price: 0,
    quantity: 0,
    date: ''

  })

  function handleInput(e){
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  async function handleSubmit(e){
      e.preventDefault();
      const res = await fetch("http://localhost:5000/soldout", {
        method: 'post',
        body: formData,
      })
      console.log(res);
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
