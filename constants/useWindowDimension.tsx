'use client'
import { useState, useEffect } from 'react';

const useWindowDimension = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // Ensure window object is available (client-side)
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      };

      // Set initial dimension
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);

      // Add event listener for window resize
      window.addEventListener('resize', handleResize);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return {windowWidth, windowHeight};
};

export default useWindowDimension;