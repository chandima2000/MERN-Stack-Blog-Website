import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js'
dotenv.config();

mongoose.connect(process.env.MONGODB)
        .then(() => {
            console.log("DB is connected")
        })
        .catch((err) => {
            console.error(err)
        });

const app = express();

//By default we are not allowed to send data in a JSON format.
//Therefore we need to allow this.
app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


//Register the test API route.
//Normally we use "/api/user/***" method to create the route.
app.use('/api/user',userRoutes);

app.use('/api/auth',authRoutes);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
         success: false,
         statusCode,
         message
    })
});


