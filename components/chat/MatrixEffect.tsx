"use client";

import React, { useRef, useEffect } from 'react';

const MatrixEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to fill the window
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const fontSize = 20;
    const columns = Math.floor(canvas.width / fontSize);
    // Create an array of drops for each column
    const drops: number[] = Array(columns).fill(1);
    const dollarSigns = "$";

    const drawMatrix = () => {
      // Fading effect by drawing a semi-transparent black rectangle over the entire canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00FF00"; // Matrix green color
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Randomly select a dollar sign (you could extend this if needed)
        const text = dollarSigns[Math.floor(Math.random() * dollarSigns.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop to top after it passes the bottom, with a random chance
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    // Start the animation
    intervalRef.current = window.setInterval(drawMatrix, 50);

    // Cleanup on component unmount
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1, backgroundColor: "black" }}
    />
  );
};

export default MatrixEffect;
