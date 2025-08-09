import express from 'express'
import {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus, verifyStripe, verifyRazorpay} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuthMiddleware.js';
import authUser from '../middleware/authmiddleware.js'

const orderRouter = express.Router();

//admin features
orderRouter.post('/list',adminAuth, allOrders);
orderRouter.post('/status',adminAuth, updateStatus);

//payment feature
orderRouter.post('/place',authUser, placeOrder);
orderRouter.post('/stripe',authUser, placeOrderStripe);
orderRouter.post('/razorpay',authUser, placeOrderRazorpay);

// user feature
orderRouter.post('/userorders', authUser, userOrders)

//verify Payment
orderRouter.post('/verify/stripe', authUser, verifyStripe)
orderRouter.post('/verify/razorpay', authUser, verifyRazorpay)

export default orderRouter

