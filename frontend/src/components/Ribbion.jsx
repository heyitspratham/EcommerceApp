import { ChevronDown, Phone } from 'lucide-react'
import React from 'react'


const ribbion = () => {
  return (
    <div className='hidden md:block'>
    <div className=' px-14 bg-[#173C2A] text-white flex py-2 justify-between items-center'>
        <div className='flex items-center gap-2'>
            <Phone/>
            <span>+91 8979072845</span>
        </div>
        <div className='flex gap-8'>
            <span>Get 50% Off on Selected Items</span>
            <span>|</span>
            <button>Shop Now</button>
        </div>
        <div className='flex items-center'>
            <div className='flex items-center'>
                <span>Eng</span>
                <ChevronDown />
            </div>
            <div className='flex items-center'>
                <span>Location</span>
                <ChevronDown />
            </div>
        </div>
    </div>

    </div>
  )
}

export default ribbion