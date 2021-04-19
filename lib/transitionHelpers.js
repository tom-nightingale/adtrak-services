export const fade = {
	initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { duration: 0.75, ease: [0.83, 0, 0.17, 1] }
  },
	exit: {
    opacity: 0,
		transition: { duration: 0.75, ease: [0.83, 0, 0.17, 1] }
	}
}

export const tierVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {y: 0, opacity: 1},
  }

export const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 3,
      delayChildren: 3,
      staggerChildren: 0.25
    }
  }
}

export const featureVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y:0 }
}