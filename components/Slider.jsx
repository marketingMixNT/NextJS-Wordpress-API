import React, { useEffect, useState, useRef } from 'react';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

function Slider({ imgUris }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef();
  const slideInterval = useRef();

  const removeAnimation = () => {
    slideRef.current.classList.remove('fade-anim');
  };

  useEffect(() => {
    slideRef.current.addEventListener('animationend', removeAnimation);
    slideRef.current.addEventListener('mouseenter', pauseSlider);
    slideRef.current.addEventListener('mouseleave', startSlider);
    startSlider();
    return () => {
      pauseSlider();
    };
  }, []);

  const startSlider = () => {
    slideInterval.current = setInterval(() => {
      handleOnNextClick();
    }, 5000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval.current);
  };

  const handleOnNextClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % imgUris.length;
      return newIndex;
    });
    slideRef.current.classList.add('fade-anim');
  };

  const handleOnPrevClick = () => {
    setCurrentIndex((prevIndex) => {
      const imgUrisLength = imgUris.length;
      const newIndex = (prevIndex + imgUrisLength - 1) % imgUrisLength;
      return newIndex;
    });
    slideRef.current.classList.add('fade-anim');
  };

  return (
    <div ref={slideRef} className='w-full select-none relative h-[92vh]'>
      <div className='h-full w-full'>
        <img src={imgUris[currentIndex]} alt={`Slide ${currentIndex + 1}`} className='object-cover w-full h-full' />
      </div>

      <div className='absolute top-1/2 transform w-full -translate-y-1/2 py-2 px-3 flex justify-between items-center'>
        <button onClick={handleOnPrevClick} className='bg-transparent hover:bg-white rounded-full  duration-500'>
          <MdNavigateBefore size={66} className='text-white hover:text-black' duration-500 />
        </button>
        <button onClick={handleOnNextClick} className='bg-transparent hover:bg-white  rounded-full  duration-500'>
          <MdNavigateNext size={66} className='text-white hover:text-black duration-500' />
        </button>
      </div>
    </div>
  );
}

export default Slider;
