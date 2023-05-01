import {Router} from 'express';
import Sold from '../models/Sold.js';
import passport from 'passport';

const router = Router();

  
router.get('/',passport.authenticate('jwt', { session: false }), async (req, res) => {
    const sold = await Sold.find({}).sort({price: -1});
    res.json({data: sold});
    
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
  res.status(200).json({message: 'created'});
});

router.delete("/:id", async (req, res) => {
    
  await Sold.findOneAndDelete({_id: req.params.id});
 
   res.json({message:"success"});
    
});

router.patch('/:id', async (req, res) => {

   await Sold.updateOne({_id: req.params.id}, {$set: req.body})
   res.json({message:"success"});
});
  
export default router;