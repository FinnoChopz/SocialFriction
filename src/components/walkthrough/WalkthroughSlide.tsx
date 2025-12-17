"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface WalkthroughSlideProps {
  children: ReactNode;
  className?: string;
}

export function WalkthroughSlide({ children, className = "" }: WalkthroughSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative ${className}`}
    >
      {children}
    </motion.div>
  );
}
