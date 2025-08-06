import React from 'react'

function Navbar() {
  return (
    <>
      <nav className='flex justify-between md:justify-around select-none text-white bg-indigo-900 p-3'>
        <div className="logo text-xl md:mx-9 font-bold">
          <span>iTask</span>
        </div>
        <ul className='flex gap-8 md:mx-9'>
          <li className='cursor-pointer hover:text-blue-300'>Home</li>
          <li className='cursor-pointer hover:text-blue-300'>Your Task</li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
