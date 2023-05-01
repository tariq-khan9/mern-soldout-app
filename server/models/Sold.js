
import mongoose from 'mongoose';
const {Schema}  = mongoose;

const soldSchema = new Schema({
  product: String,
  price: Number,
  quantity: Number,
  totalPrice: Number,
  date: Date, 
  
  
})

export default new mongoose.model('Sold', soldSchema);