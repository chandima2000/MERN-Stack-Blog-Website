import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import testRoutes from './routes/user.route.js';

dotenv.config();

mongoose.connect(process.env.MONGODB)
        .then(() => {
            console.log("DB is connected")
        })
        .catch((err) => {
            console.error(err)
        });

const app = express();

//Register the test API route.
//Normally we use "/api/user/***" method to create the route.
app.use('/api/user',testRoutes);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


