import React, { useEffect, useRef } from 'react';

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export const FloatingOrbs: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Create orbs - 2 purple, 2 green
    const orbs: Orb[] = [
      {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: 200,
        color: 'purple' // purple-500
      },
      {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: 250,
        color: 'purple'
      },
      {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: 220,
        color: 'green' // sprout-500
      },
      {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: 180,
        color: 'green'
      }
    ];

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach(orb => {
        // Update position
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off edges with some randomness
        if (orb.x < -orb.radius || orb.x > canvas.width + orb.radius) {
          orb.vx = -orb.vx + (Math.random() - 0.5) * 0.5;
        }
        if (orb.y < -orb.radius || orb.y > canvas.height + orb.radius) {
          orb.vy = -orb.vy + (Math.random() - 0.5) * 0.5;
        }

        // Keep orbs within bounds
        orb.x = Math.max(-orb.radius, Math.min(canvas.width + orb.radius, orb.x));
        orb.y = Math.max(-orb.radius, Math.min(canvas.height + orb.radius, orb.y));

        // Add slight randomness to movement for organic feel
        orb.vx += (Math.random() - 0.5) * 0.05;
        orb.vy += (Math.random() - 0.5) * 0.05;

        // Limit velocity
        const maxVelocity = 2;
        orb.vx = Math.max(-maxVelocity, Math.min(maxVelocity, orb.vx));
        orb.vy = Math.max(-maxVelocity, Math.min(maxVelocity, orb.vy));

        // Draw orb with radial gradient
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);

        if (orb.color === 'purple') {
          gradient.addColorStop(0, 'rgba(168, 85, 247, 0.4)'); // purple-500
          gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.2)'); // purple-600
          gradient.addColorStop(1, 'rgba(126, 34, 206, 0)'); // purple-700
        } else {
          gradient.addColorStop(0, 'rgba(74, 222, 128, 0.4)'); // sprout-400
          gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.2)'); // sprout-500
          gradient.addColorStop(1, 'rgba(22, 163, 74, 0)'); // sprout-600
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6, filter: 'blur(40px)' }}
    />
  );
};
