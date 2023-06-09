import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import passportConfig from './auth/passport.js';
import bodyParser from 'body-parser';
import SoldRoutes from './routes/sold.js';
import AuthRoutes from './routes/AuthRoutes.js';

const app = express();
const PORT = 5000;
try{
await mongoose.connect("mongodb+srv://tariq:nature@tariq-mern.g995gqd.mongodb.net/?retryWrites=true&w=majority")
console.log("MongoDB Connected")

}
catch(error){
  console.log(error)
 
 
}

app.use(cors());
app.use(bodyParser.json());
app.use("/sold", SoldRoutes);
app.use("/auth", AuthRoutes);
app.use(passport.initialize());
passportConfig(passport);

app.get('/', (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, ()=>{
    console.log("Server is running on port 5000");
});
