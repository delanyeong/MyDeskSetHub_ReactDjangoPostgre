import React from 'react'

function Footer() {
  return (
    <div className='w-full bg-slate-900 text-gray-300 py-y px-2'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-6 border-b-2 border-gray-600 py-8'>
            <div>
                <h6 className='font bold uppercase pt-2'>Solutions</h6>
                <ul>
                    <li className='py-1'>Marketing</li>
                    <li className='py-1'>Analytics</li>
                    <li className='py-1'>Commerce</li>
                    <li className='py-1'>Data</li>
                    <li className='py-1'>Cloud</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer