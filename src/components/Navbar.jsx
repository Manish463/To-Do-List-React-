import React from 'react'

function Navbar() {
  return (
    <>
        <nav className='flex justify-around text-white bg-indigo-900 p-2'>
            <div className="logo text-xl mx-9 font-bold">
                <span>iTask</span>
            </div>
            <ul className='flex gap-8 mx-9'>
                <li className='cursor-pointer hover:font-bold'>Home</li>
                <li className='cursor-pointer hover:font-bold'>Your Task</li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar
