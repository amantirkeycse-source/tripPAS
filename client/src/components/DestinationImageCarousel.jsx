import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * DestinationImageCarousel - Reusable image carousel for destinations.
 *
 * Props:
 *   images     - Array of image URLs (falls back to [singleImage] if no array)
 *   alt        - Alt text for images
 *   height     - CSS height class (default: 'h-full')
 *   autoPlay   - Auto-play interval in ms (default: 4000, 0 to disable)
 *   showDots   - Show pagination dots (default: true)
 *   showArrows - Show navigation arrows (default: true)
 *   className  - Additional classes
 */
const DestinationImageCarousel = ({
  images = [],
  alt = 'Destination',
  height = 'h-full',
  autoPlay = 4000,
  showDots = true,
  showArrows = true,
  className = ''
}) => {
  // Normalize images - if no array, use [single image] or empty
  const normalizedImages = Array.isArray(images) && images.length > 0
    ? images
    : images ? [images] : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  // If only 1 or 0 images, no carousel needed
  if (normalizedImages.length <= 1) {
    return (
      <div className={`${height} ${className} overflow-hidden`}>
        {normalizedImages.length === 1 ? (
          <img
            src={normalizedImages[0]}
            alt={alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <span className="text-primary-500 text-lg font-semibold">📷</span>
          </div>
        )}
      </div>
    );
  }

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % normalizedImages.length);
  }, [normalizedImages.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length);
  }, [normalizedImages.length]);

  const goToIndex = useCallback((index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Auto-play
  useEffect(() => {
    if (autoPlay <= 0 || isPaused || normalizedImages.length <= 1) return;

    const interval = setInterval(goToNext, autoPlay);
    return () => clearInterval(interval);
  }, [autoPlay, isPaused, goToNext, normalizedImages.length]);

  // Pause on interaction, resume after 5 seconds
  const handleInteraction = useCallback(() => {
    setIsPaused(true);
    const timeout = setTimeout(() => setIsPaused(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') goToPrev();
    if (e.key === 'ArrowRight') goToNext();
  }, [goToNext, goToPrev]);

  // Swipe support
  const [touchStart, setTouchStart] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
      handleInteraction();
    }

    setTouchStart(null);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  return (
    <div
      className={`relative ${height} ${className} overflow-hidden group`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={handleInteraction}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`Image carousel for ${alt}`}
      aria-roledescription="carousel"
    >
      {/* Image Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={currentIndex}
          src={normalizedImages[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          loading={currentIndex === 0 ? 'eager' : 'lazy'}
          draggable={false}
        />
      </AnimatePresence>

      {/* Gradient overlay for better arrow visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
              handleInteraction();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} className="text-dark" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
              handleInteraction();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg z-10"
            aria-label="Next image"
          >
            <ChevronRight size={18} className="text-dark" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {showDots && normalizedImages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {normalizedImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToIndex(index);
                handleInteraction();
              }}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-6 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {normalizedImages.length > 1 && (
        <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {currentIndex + 1} / {normalizedImages.length}
        </div>
      )}
    </div>
  );
};

export default DestinationImageCarousel;
