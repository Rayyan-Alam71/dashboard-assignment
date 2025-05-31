import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='container mx-auto py-4 z-10 border-b-[1px] border-gray-400'>
      <div className='flex justify-between items-center mx-32'>
        <button className='text-2xl font-bold'> <Link href={"/"}>Admin Dashboard</Link></button>
        <div>
          <button className='cursor-pointer border-[1px] border-black bg-black text-white font-mono px-3 py-2 rounded-lg'> Toggle </button>
        </div>
      </div>
    </header>
  )
}

export default Header
