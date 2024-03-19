import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


export const signup = async (req,res,next) => {
    const {username,email,password} = req.body;
    if(!username || !email || !password || username ==='' || email==="" || password==="" ){
        //return res.status(400).json({msg:"Please fill all fields"});
        next(errorHandler(400,"Please fill all fields"));
    }
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username, email, password:hashedPassword});
    try {
        await newUser.save();
        res.status(200).json({message: "Signup Successful"});
    } catch (error) {
        //res.status(400).json({message:error.message})  // Instead of this now we use middleware
        next(error)
    }
};

export const signin = async (req,res,next) => {
    const {email,password}=req.body;
    if(!email || !password || email==="" || password==="" ){
        next(errorHandler(400,"Please fill all fields"));
    }

    try {
        const validUser = await User.findOne({email});
        if(!validUser){
           return next(errorHandler(400,'Wrong Credentials'));
        }

        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if (!validPassword) {
           return next(errorHandler(400,'Wrong Credentials'));
        }

        const token = jwt.sign({
            id:validUser._id,
        },
        process.env.JWT_SECRET,{expiresIn:'7d'}
        );

        const {password:pass, ...rest} = validUser._doc; // Remove the password from the response and rest of the data is set to the 'rest'.

        res.status(200).cookie('access_token',
                    token,
                    {httpOnly:true}
            ).json(rest); // The 'rest' is go to the frontend as payload. It helps to the Redux handle the state

    } catch (error) {
            next(error);
    }
    
};


export const google = async (req, res, next) => {
         const {email, name, googlePhotoUrl} = req.body;
         try {
            const user = await User.findOne({email});
            if(user){
                const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
                const {password, ...rest} = user._doc;
                res.status(200).cookie('access_token',token,{
                    httpOnly: true}).json(rest); 
            }
            else{
                const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8); 
                 //This 36 mean is, numbers from 0 - 9 and letters from A-Z
                const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
                const newUser = new User({
                    username : name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                    email,
                    password : hashedPassword,
                    profilePicture : googlePhotoUrl
                });

                await newUser.save();
                const token = jwt.sign({id : newUser._id}, process.env.JWT_SECRET);
                const  {password ,...rest} = newUser._doc ;
                res.status(200).cookie('access_token',token,{
                    httpOnly: true,
                }).json(rest);
            }
        }
        catch (error) {
            next(error);
         }
};