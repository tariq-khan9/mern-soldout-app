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
    console.log(user);
    res.json({message: 'success'});
});

router.post('/login', async (req, res) => {
    //get all form data
    const {email, password} = req.body;
    
    //check if email exist
    const userExists = await User.findOne({email})
     
    if(userExists){
        const match = await bcrypt.compare(password, userExists.password);
        if(match){
            
            const payload = {email, id: userExists._id}
            const token = jwt.sign({payload}, 'my secret');
            res.status(200).json({message: "user logged", token});
        }
        else{
            res.json({message:"password didnt match"});
        }
    }else{
        res.json({message:"user does not exist"});
    };
    

});

  
export default router;