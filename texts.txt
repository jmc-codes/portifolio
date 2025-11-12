import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgressBar = () => {
  const progressRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const progress = progressRef.current;
    const circle = circleRef.current;
    if (!progress || !circle) return;

    // Scroll progress bar animation
    gsap.to(progress, {
      scaleX: 1,
      transformOrigin: "left center",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    // Circular progress animation
    const circumference = 2 * Math.PI * 20; // radius = 20
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    gsap.to(circle, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    // Hover effect
    const circleContainer = circle.parentElement;
    circleContainer.addEventListener('mouseenter', () => {
      gsap.to(circle, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    });

    circleContainer.addEventListener('mouseleave', () => {
      gsap.to(circle, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    });

    // Scroll to top on click
    circleContainer.addEventListener('click', () => {
      gsap.to(window, {
        scrollTo: { y: 0 },
        duration: 1.5,
        ease: "power2.out",
      });
    });
  }, []);

  return (
    <>
      {/* Linear Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border/20">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-primary to-accent origin-left scale-x-0"
        />
      </div>

      {/* Circular Progress Indicator */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative w-12 h-12 cursor-pointer group">
          <svg
            className="w-12 h-12 transform -rotate-90 transition-transform group-hover:scale-110"
            viewBox="0 0 44 44"
          >
            <circle
              cx="22"
              cy="22"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-border/20"
            />
            <circle
              ref={circleRef}
              cx="22"
              cy="22"
              r="20"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(264, 50%, 50%)" />
                <stop offset="100%" stopColor="hsl(45, 70%, 60%)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Arrow Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-foreground transition-transform group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollProgressBar;