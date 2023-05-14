import {Router} from 'express';
import Sold from '../models/Sold.js';
import passport from 'passport';

const router = Router();

  
router.get('/',passport.authenticate('jwt', { session: false }), async (req, res) => {
    const sold = await Sold.find({user: req.user._id}).sort({price: -1});

    const chartData = await Sold.aggregate([
      {
         $match: {user: req.user._id}
      },
      {
         $group: {
            _id: {$month: "$date"},
            data: {
               $push: {product: "$product", price: "$price", quantity:"$quantity", date:"$date"},
            },
           
            totalAmount: { $sum: { $multiply: [ "$quantity", "$price" ] } },
         }
      }
   
    ]).sort({_id: 1});
    
    res.json({sold: chartData});
    
    
});
  
router.post('/',passport.authenticate('jwt', { session: false }), async (req, res) => {
   const {product, price, quantity, date} = req.body;
   const sold = Sold({
    product,
    price,
    quantity,
    date,
    user: req.user._id,
    
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