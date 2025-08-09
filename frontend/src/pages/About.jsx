import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={' US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className="w-full md:max-w-[450px]" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore veniam, nobis ratione dolores, voluptatibus adipisci debitis facere laboriosam, nemo eligendi aliquam. Repellendus illo quam enim. Facilis maxime mollitia veniam quam?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque aliquam consequatur quaerat expedita ipsum officiis iste soluta alias quasi nisi! Quidem fuga consequatur labore vero pariatur iure, quia adipisci aliquam!</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eveniet enim officiis aperiam dolores sed amet! Quas, nulla distinctio laboriosam aspernatur harum deleniti blanditiis impedit, dolorem ut, aliquid consequuntur repellat.</p>
        </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />

      </div>
      <div className='flex flex-col md:flex-row text-sm mb-3'>
        <div className='border border-gray-300 px-10 py-8 flex flex-col gap-5'>
          <b>Quality Assurance: </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam sequi consequatur molestias sunt rerum dolorum, eligendi dolores voluptate dignissimos itaque nemo eos? Ratione non aliquid suscipit, voluptates voluptate incidunt commodi!</p>
        </div>

        <div className='border border-gray-300 px-10 py-8 flex flex-col gap-5'>
          <b>Convenience: </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam sequi consequatur molestias sunt rerum dolorum, eligendi dolores voluptate dignissimos itaque nemo eos? Ratione non aliquid suscipit, voluptates voluptate incidunt commodi!</p>
        </div>

        <div className='border border-gray-300 px-10 py-8 flex flex-col gap-5'>
          <b>Exceptional Customer Service </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam sequi consequatur molestias sunt rerum dolorum, eligendi dolores voluptate dignissimos itaque nemo eos? Ratione non aliquid suscipit, voluptates voluptate incidunt commodi!</p>
        </div>

      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About