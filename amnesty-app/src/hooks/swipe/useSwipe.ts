'use client';

// Swipe hook for interactive question navigation
import { useState, useRef, useEffect } from 'react';

interface SwipeHandlers {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

interface SwipeOptions {
  threshold?: number; // Minimum distance required for a swipe
  timeout?: number;   // Maximum time in ms allowed for a swipe
}

export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeHandlers, options: SwipeOptions = {}) {
  const { threshold = 50, timeout = 500 } = options;
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [clickStart, setClickStart] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setTouchStart(null);
    }, timeout);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > threshold;
    const isRightSwipe = distance < -threshold;
    
    if (isLeftSwipe) {
      onSwipeLeft();
    } else if (isRightSwipe) {
      onSwipeRight();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Handle click events (alternative to swipe)
  const handleMouseDown = (e: React.MouseEvent) => {
    setClickStart(e.clientX);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setClickStart(null);
    }, timeout);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (clickStart === null) return;
    
    const windowWidth = window.innerWidth;
    const clickPosition = e.clientX;
    
    // Check if click is on left or right side of screen
    if (clickPosition < windowWidth / 2) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
    
    setClickStart(null);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
  };
}
