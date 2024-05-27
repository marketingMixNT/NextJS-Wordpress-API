import React, { useEffect, useState,useRef } from 'react'

const featuredProducts = ['/1.jpeg', '/2.jpeg', '/3.jpeg']

function Slider() {
	let count = 0
	const [currentIndex, setCurrentIndex] = useState(0)

    const slideRef = useRef()

	const removeAnimation = () =>{
		slideRef.current.classList.remove('fade-anim')

	}

    useEffect(()=>{
		slideRef.current.addEventListener('animationed',removeAnimation)
        // startSlider()
    },[])

    const startSlider = () => {
        setInterval(() => {
            handleOnNextClick()
        },3000)
    }

	const handleOnNextClick = () => {
		count = (count + 1) % featuredProducts.length
		setCurrentIndex(count)
        slideRef.current.classList.add('fade-anim')
	}
	const handleOnPrevClick = () => {
        const productLength = featuredProducts.length;
        count = (currentIndex + productLength -1) % productLength
        setCurrentIndex(count)
    }



	return (
		<div ref={slideRef} className='w-full select-none relative'>
			<div className='aspect-w-16 aspect-h-9 '>
				<img src={featuredProducts[currentIndex]} alt='' />
			</div>

			<div className='absolute top-1/2 transform w-full -translate-y-1/2 py-2 px-3 flex justify-between items-center'>
				<button onClick={handleOnPrevClick}>Prev</button>
				<button onClick={handleOnNextClick}>Next</button>
			</div>
		</div>
	)
}

export default Slider
