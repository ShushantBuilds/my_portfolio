'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagneticCursor() {
  // 1. Ensure component only renders on the client to prevent SSR glitches
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // 2. Start coordinates completely off-screen
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 3. Apply smooth spring physics to the outer ring
  const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);

    const updateMouse = (e: MouseEvent) => {
      // Update motion values directly for maximum performance
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-magnetic]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updateMouse);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY]);

  // If not mounted yet, render absolutely nothing
  if (!isMounted) return null;

  return (
    <>
      <style jsx global>{`
        body, a, button, [data-magnetic] { cursor: none !important; }
      `}</style>

      {/* The inner precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-neutral-300 rounded-full pointer-events-none z-[100]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isHovering ? 0 : 1, // Hides when hovering over links
        }}
        transition={{ duration: 0.15 }}
      />

      {/* The trailing outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-neutral-500 rounded-full pointer-events-none z-[99]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0)",
          borderColor: isHovering ? "rgba(255,255,255,0.8)" : "rgba(115,115,115,0.5)"
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}