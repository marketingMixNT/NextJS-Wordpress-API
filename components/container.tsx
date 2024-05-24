'use client'

import { EastTwoTone } from '@mui/icons-material';
import { motion } from 'framer-motion'
import {transition} from '../pages/transition'

export default function Container({ children }) {
  return <motion.div
  initial={{  opacity: 0 }}
			animate={{  opacity: 1 }}
			exit={{opacity:0}}
			transition={transition}
  
  className="container mx-auto px-5 max-w-screen-2xl">{children}</motion.div>;
}
