import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();



mongoose.connect(process.env.MONGODB)
        .then(() => {
            console.log("DB is connected")
        })
        .catch((err) => {
            console.error(err)
        });

const app = express();



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});