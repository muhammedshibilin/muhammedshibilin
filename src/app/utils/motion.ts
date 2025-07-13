import { AnimationGeneratorType, Variants } from 'framer-motion';

export const staggerContainer = (staggerChildren?: number, delayChildren?: number): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right', type: AnimationGeneratorType | undefined, delay: number, duration: number): Variants => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
    x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

export const textVariant = (delay: number): Variants => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay,
    },
  },
});

export const zoomIn = (delay: number, duration: number): Variants => ({
    hidden: {
      scale: 0.5,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  });