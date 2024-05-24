import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function navbar() {
	return (
		<nav className=' bg-primary text-black  py-6 z-50'>
			<div className='flex justify-between max-w-screen-2xl mx-auto relative'>
<div className='flex gap-6'>
				<Link href={'/apartamenty'} className='hover:text-gray-500 duration-500 font-light tracking-wider'>Apartamenty</Link>
				<Link href={'/atrakcje'} className='hover:text-gray-500 duration-500 font-light tracking-wider'>Atrakcje</Link>
				<Link href={'/posts'} className='hover:text-gray-500 duration-500 font-light tracking-wider'>Blog</Link>
			</div>

			<div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <Link href={'/'}><Image src="/logo.png" alt="" width={150} height={50}/></Link>
            </div>

			<div className='flex gap-6'>
			<Link href={'/'} className='hover:text-gray-500 duration-500 font-light tracking-wider'>Kontakt</Link>
			<Link href={'/'} className='hover:text-gray-500 duration-500 font-light tracking-wider'>Zarezerwuj</Link>
			</div>
			
			</div>
		</nav>
	)
}

export default navbar
