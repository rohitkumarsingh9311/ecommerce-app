// placing orders using COD method

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'

const currency = 'usd'
const deliveryCharges = 10

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//console.log(stripe);

const razorpayInstance= new razorpay({
    key_id: process.env.RAZOR_PAY_KEY,
    key_secret: process.env.RAZOR_PAY_SECRET
})



const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address}=req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            PaymentMethod: "COD",
            Payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success: true, message: "Order placed"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
    
}

// placing orders using razorpay method

const placeOrderStripe = async (req, res) => {

    try {
         const {userId, items, amount, address}=req.body;
         const { origin } = req.headers;

         const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            Payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()

        const line_items = items.map((item) => ({

            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: deliveryCharges * 100
            },
            quantity: 1

        }))

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })
        
        res.json({ success: true, session_url:session.url})

    } catch (error) {
         console.log(error)
        res.json({success: false, message: error.message})
    }

    
}

//verify stripe payment

const verifyStripe = async (req,res) => {
    const {orderId, success, userId } = req.body

    try {
            if(success==='true') {
                await orderModel.findByIdAndUpdate(orderId, {payment: true});
                await userModel.findByIdAndUpdate(userId, {cartData: {}})
                res.json({success: true})
            } else {
                await orderModel.findByIdAndDelete(orderId)
                res.json({success: false})
            }
    } catch (error) {
         console.log(error)
        res.json({success: false, message: error.message})
        
    }
}

const verifyRazorpay = async(req, res) => {
    try {
        const {userId, razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment: true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success: true, message: "Payment Successfull"})
        }
        else {
            res.json({success: false, message: "Payment failed"})   
        }
        
    } catch (error) {
         console.log(error)
        res.json({success: false, message: error.message})
    }
}

// placing orders using razorpay method

const placeOrderRazorpay = async (req, res) => {
    try {
        const {userId, items, amount, address}=req.body;

         const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            Payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()

        const options = {
            amount: amount * 100, // convert to paise
            currency: 'INR',
            payment_capture: 1,
            receipt: newOrder._id.toString()
        };

       await razorpayInstance.orders.create(options, (error, order)=> {
            if(error) {
                console.log(error)
                return res.json({success: false, message: error})
            }
            res.json({success: true, order})
        })
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
        
    }
    
}

// all order data for admin panel

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
    
}

// User Order data for frontend

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({success: true, orders})

    } catch (error) {
         console.log(error)
        res.json({success: false, message: error.message})
    }
    
}

// update order Status from admin panel

const updateStatus = async (req, res) => {
    try {
        const {orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success: true, message: 'Status updated'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus, verifyStripe,verifyRazorpay}