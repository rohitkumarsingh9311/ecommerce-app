import React from 'react';
import {assets} from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
        <div>
            <img src={assets.exchange_icon} className="w-10 mx-auto mb-3" alt="exchange icon" />
            <p className="font-semibold mb-2">Easy Exchange</p>
            <p className="text-gray-400">We offer hassle-free exchanges within 30 days of purchase.</p>
        </div>
        <div>
            <img src={assets.quality_icon} className="w-10 mx-auto mb-3" alt="exchange icon" />
            <p className="font-semibold mb-2">7 Day Return Policy</p>
            <p className="text-gray-400">We provide free 7 days return policy.</p>
        </div>
        <div>
            <img src={assets.support_img} className="w-10 mx-auto mb-3" alt="exchange icon" />
            <p className="font-semibold mb-2">Best Customer Support</p>
            <p className="text-gray-400">We provide 24/7 customer support.</p>
        </div>
    </div>
  )
}

export default OurPolicy