import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 5000;

await mongoose.connect("mongodb+srv://tariq:nature@tariq-mern.g995gqd.mongodb.net/?retryWrites=true&w=majority")
console.log("MongoDB Connected")

app.use(cors());
app.get('/', (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, ()=>{
    console.log("Server is running on port 5000");
});