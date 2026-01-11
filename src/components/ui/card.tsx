'use client'

// --- REUSABLE CARD COMPONENT ---

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// This is the base for our dropdowns. It's a simple, styled container.
export const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2, ease: "easeInOut" }}
    className={`bg-card border border-border  p-4 ${className}`}
  >
    {children}
  </motion.div>
);

export default Card