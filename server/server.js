import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import Sold from './models/Sold.js'

const app = express();
const PORT = 5000;

await mongoose.connect("mongodb+srv://tariq:nature@tariq-mern.g995gqd.mongodb.net/?retryWrites=true&w=majority")
console.log("MongoDB Connected")

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Hello from server");
});

app.get('/sold', async (req, res) => {
  const sold = await Sold.find({});
  res.json(sold);
  console.log({data:sold});
 });

app.post('/sold', async (req, res) => {
 const {product, price, quantity, date} = req.body;
 const sold = Sold({
  product,
  price,
  quantity,
  totalPrice: (price*quantity),
  date,
  
 })
 await sold.save();
 console.log(res.json({message: "saved"}));
});

app.listen(PORT, ()=>{
    console.log("Server is running on port 5000");
});