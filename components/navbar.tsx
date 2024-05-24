import React from 'react'
import Link from 'next/link'

function navbar() {
	return (
		<div className='flex justify-between px-24 py-8 bg-black text-white'>
            <div >
                <Link href={'/'}><h1>logo</h1></Link>
            </div>
			<nav className='flex gap-4'>
				<Link href={'/apartamenty'} className='hover:text-gray-400 duration-500 text-lg'>Apartamenty</Link>
				<Link href={'/atrakcje'} className='hover:text-gray-400 duration-500 text-lg'>Atrakcje</Link>
				<Link href={'/posts'} className='hover:text-gray-400 duration-500 text-lg'>Blog</Link>
			</nav>
		</div>
	)
}

export default navbar
