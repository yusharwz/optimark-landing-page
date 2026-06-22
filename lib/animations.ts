import { Variants } from "framer-motion";

const APPLE_EASE = [0.16, 1, 0.3, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: APPLE_EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: APPLE_EASE },
  },
};

export const heroBadge: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: 0.2, ease: APPLE_EASE },
  },
};

export const heroTitle: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.3, ease: APPLE_EASE },
  },
};

export const heroDescription: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.4, ease: APPLE_EASE },
  },
};

export const heroButton: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: 0.5, ease: APPLE_EASE },
  },
};

export const heroImage: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1, delay: 0.4, ease: APPLE_EASE },
  },
};

export const featureCardHover = {
  whileHover: {
    scale: 1.02,
    y: -8,
    transition: { duration: 0.3, ease: APPLE_EASE },
  },
};
