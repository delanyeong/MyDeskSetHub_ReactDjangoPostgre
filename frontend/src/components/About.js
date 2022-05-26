import React from 'react'
import setup2Img from '../assets/setup2.jpg'


function About() {
  return (
    <div name='about' className='relative w-full h-screen bg-zinc-900/30'>

        <img className='absolute w-full h-full object-cover mix-blend-overlay' src={setup2Img} alt="" />

        <div className='max-w-[1240px] mx-auto relative'>
            <div className='px-4 py-20 text-center'>
                <h2 className='text-5xl font-bold text-white'>Trusted by creators across the world</h2>
                <p className='text 3-xl py-6 text-white'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt, ratione reprehenderit non eum, dolorum iste quaerat dolore error ut perspiciatis in. Itaque dolor officia ducimus nulla cupiditate repudiandae nihil debitis?</p>
            </div>
        </div>

    </div>
  )
}

export default About