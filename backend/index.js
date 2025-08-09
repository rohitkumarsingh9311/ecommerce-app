import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connect } from 'mongoose';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import ProductRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


const port=4110;

//apps config
const app=express();
connectDB();
connectCloudinary();


//middle ware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/user',userRouter);
app.use('/api/product',ProductRouter);
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
//api end point
app.get('/',(req,res)=>{
    res.send('Hi i am working fine');
});

app.listen(port,()=>{ 
    console.log('your app is running on: ',port)
})