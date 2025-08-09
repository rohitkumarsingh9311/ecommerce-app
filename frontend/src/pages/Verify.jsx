import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import {toast} from 'react-toastify';
import {useSearchParams} from 'react-router-dom'
import axios from 'axios'
const Verify = () => {

    const {navigate, token, setCartItems, backendURL} = useContext(ShopContext)
    const [searchparams, setSearchParams] = useSearchParams();
    

    const success = searchparams.get('success')
    const orderId = searchparams.get('orderId')

    const verifyPayment = async() => {
        try {
            if(!token) {
                return null;
            } else {
                const response = await axios.post(backendURL + '/api/order/verify/stripe', {success,orderId},{headers:{token}})
                console.log(response);
                if(response.data.success) {
                    setCartItems({})
                    navigate('/orders')
                } else {
                    navigate('/cart')
                }
            }
            
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }

    }

    useEffect(()=>{
        verifyPayment()
    },[token])
  return (
    <div>
    </div>
  )
}

export default Verify