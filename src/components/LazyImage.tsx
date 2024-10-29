import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { imageService } from '../services/api/image';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
  quality?: number;
  'aria-hidden'?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  style,
  width,
  height,
  quality = 75,
  'aria-hidden': ariaHidden
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView && !optimizedSrc) {
      const loadOptimizedImage = async () => {
        try {
          const response = await imageService.optimize({
            url: src,
            width,
            height,
            quality,
            format: 'webp'
          });
          
          if (response.data.url) {
            await imageService.preload(response.data.url);
            setOptimizedSrc(response.data.url);
          }
        } catch (error) {
          console.error('Image optimization failed:', error);
          setOptimizedSrc(src); // Fallback to original source
        }
      };

      loadOptimizedImage();
    }
  }, [isInView, src, width, height, quality]);

  return (
    <div className="relative overflow-hidden" ref={imgRef}>
      {isInView && (
        <img
          src={optimizedSrc || src}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={style}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
          width={width}
          height={height}
          aria-hidden={ariaHidden}
        />
      )}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
    </div>
  );
};

export default LazyImage;
