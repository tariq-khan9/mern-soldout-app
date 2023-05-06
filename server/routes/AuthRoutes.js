import {Router} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/AuthModel.js'

const router = Router();

  
router.post('/register', async (req, res) => {
    //get all form data
    const {name, email, password} = req.body;
    
    //check if the user already exist
     const userExists = await User.findOne({email})
     
     if(userExists){
        res.status(406).json({message: "User already exists"});
        return;
    };
    console.log("not exist")

    //hashed the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hashSync(password, saltRounds);

    //save data to mongoDB
    const user = User({name, email, password: hashedPassword});
    await user.save();
   // res.json({message: 'success'});
     res.status(200).json({message: 'success'});
});
   

router.post('/login', async (req, res) => {
try{
    //get all form data
    const {email, password} = req.body;
    
    //check if email exist
    const user = await User.findOne({email})
    if(user===null){
        res.status(204).json({message: 'user not found'});
    }
    else{
        
        const match = await bcrypt.compare(password, user.password);
        if(match){
            
            const payload = {username: email, _id: user._id}
            const token = jwt.sign(payload, 'my secret');
            res.status(200).json({message: "user logged", token});
        }
        else{
           res.status(204).json({message:"password didnt match"});
        }
    };
}
catch(error){
   return res.status(500).json({message: 'Server is not responding!'})
}
    

});

  
export default router;