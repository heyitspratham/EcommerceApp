import React from 'react'
import playStore from "../assets/playstore.png"
import appStore from "../assets/Appstore.png"

const Footer = () => {
  return (
    <div id='footer' className='flex  justify-around px-8 bg-[#1A2335]  text-white py-5'>
        <div id="leftFooter" className='w-[20vmax] flex flex-col items-center font-mono'>
            <h4 className='text-2xl font-bold '>DOWNLOAD OUR APP</h4>
            <p className='py-5 text-center'>Download app for Android and IOS mobile phone</p>
            <img src={playStore} alt="playStore" className='pb-5 w-[60%]'  />
            <img src={appStore} alt="appStore" className='w-[60%]' />
        </div>
        <div id="midFooter" className='flex flex-col gap-4 items-center justify-end font-serif pb-10'>
            <h1 className='text-8xl pb-6 text-[#8241F6]'>Shop On.</h1>
            <p>High quality is our first priority</p>
            <p>copyright 2023 &copy; Pratham Shukla</p>
        </div>
        <div id="rightFooter" className='w-[20vmax] font-mono text-lg gap-3 flex flex-col items-center justify-center'>
            <h4 className='text-3xl underline underline-offset-4 pb-5'>Follow Us</h4>
            <a className='hover:text-[#8241F6]' href="http://instagram.com">Instagram</a>
            <a className='hover:text-[#8241F6]' href="http://instagram.com">Twitter</a>
            <a className='hover:text-[#8241F6]' href="http://instagram.com">Youtube</a>
        </div>
    </div>
  )
}

export default Footer