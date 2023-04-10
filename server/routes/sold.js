import {Router} from 'express';
import Sold from '../models/Sold.js'

const router = Router();

  
router.get('/', async (req, res) => {
    const sold = await Sold.find({}).sort({price: -1});
    res.json(sold);
    
});
  
router.post('/', async (req, res) => {
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
  
export default router;