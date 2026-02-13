import React from 'react'

const Navbar = () => {
    return (

        <nav className='bg-slate-800 ' >
            <div className="flex justify-between items-center mx-auto max-w-4xl py-2 px-2">

                <div className="logo font-bold text-white text-xl">
                    <span className='text-green-500 '>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500 '>Vault/&gt;</span>
                </div>

                <ul className='flex gap-3.5 text-white'>
                   
                    {/* <li><button><a className='hover:bg-green-700 rounded-md p-1 text-sm' href="/">Sign In</a></button></li>
                    <li><button><a className='hover:bg-green-700 rounded-md p-1 text-sm ' href="#">Sign Up</a></button></li> */}
                    <li><button><a className='hover:bg-green-700 rounded-md p-1 text-sm ' href="#">Logout</a></button></li>
                </ul>

            </div>
        </nav>

    )
}

export default Navbar
