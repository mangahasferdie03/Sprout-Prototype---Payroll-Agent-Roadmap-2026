import React, { useEffect, useRef } from 'react';

interface Props {
  mouseX: number;
  mouseY: number;
}

export const GridWarp: React.FC<Props> = ({ mouseX, mouseY }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const gridSize = 24;
    const warpRadius = 600;
    const warpStrength = 20;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(128, 128, 128, 0.07)';
      ctx.lineWidth = 1;

      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 2) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let offsetX = x;
          let offsetY = y;

          if (distance < warpRadius) {
            const factor = (1 - distance / warpRadius) * warpStrength;
            const angle = Math.atan2(dy, dx);
            offsetX = x + Math.cos(angle) * factor;
            offsetY = y + Math.sin(angle) * factor;
          }

          if (y === 0) {
            ctx.moveTo(offsetX, offsetY);
          } else {
            ctx.lineTo(offsetX, offsetY);
          }
        }
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 2) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let offsetX = x;
          let offsetY = y;

          if (distance < warpRadius) {
            const factor = (1 - distance / warpRadius) * warpStrength;
            const angle = Math.atan2(dy, dx);
            offsetX = x + Math.cos(angle) * factor;
            offsetY = y + Math.sin(angle) * factor;
          }

          if (x === 0) {
            ctx.moveTo(offsetX, offsetY);
          } else {
            ctx.lineTo(offsetX, offsetY);
          }
        }
        ctx.stroke();
      }
    };

    drawGrid();

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, [mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
};
