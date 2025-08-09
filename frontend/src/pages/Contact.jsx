import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const Contact=()=>{
    return (
        <div>
            <div className='text-center text-2xl pt-10 border-t'>
                <Title text1={'Contact'} text2={' US'} />
            </div>
            <div className='my-10 flex flex-col justify-center md:flex-row gap-20 mb-28'>
                <img src={assets.contact_img} className='w-1/2 md:max-w[480px] ' />
                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='font-semibold text-xl text-gray-800'>Our Store</p>
                    <p>#133 shiv nagar, near railwaycrossing <br /> Suite 350, washington, USA</p>
                    <p>Tel: 9050889943</p>
                    <p>Email: contact@forever.com</p>
                    <p className='font-semibold text-xl text-gray-600'>Career at Forever</p>
                    <p className='text-gray-600'>learn more about our teams and job openings</p>
                    <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
                </div>
            </div>

            <NewsLetterBox />

        </div>
    )
}

export default Contact;