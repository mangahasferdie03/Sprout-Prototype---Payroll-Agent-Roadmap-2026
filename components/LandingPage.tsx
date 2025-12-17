import React, { useState } from 'react';
import { FloatingOrbs } from './FloatingOrbs';
import { GridWarp } from './GridWarp';

interface Props {
  onEnter: (product: 'friday' | 'jarvis') => void;
}

export const LandingPage: React.FC<Props> = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleStart = (product: 'friday' | 'jarvis') => {
    setIsExiting(true);
    // Allow animation to play before switching
    setTimeout(() => onEnter(product), 800);
  };

  // Track mouse position
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>

      {/* Floating Orbs Background */}
      <FloatingOrbs />

      {/* Warped Grid */}
      <GridWarp mouseX={mousePos.x} mouseY={mousePos.y} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">

        {/* Hero Text */}
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
          <span className="block animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
            Our Vision for Sidekick's Future.
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
          The team's 2026 roadmap: evolving Sidekick into a suite of intelligent agents built to enhance every Sprout product and workflow.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '1s' }}>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => handleStart('friday')}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-[0_0_60px_-10px_rgba(74,222,128,0.6)] focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              FRIDAY
            </button>

            <button
              onClick={() => handleStart('jarvis')}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-[0_0_60px_-10px_rgba(74,222,128,0.6)] focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              JARVIS
            </button>
          </div>

          <p className="mt-6 text-slate-600 text-xs uppercase tracking-widest">
            For Sprout Internal Only
          </p>
        </div>
      </div>
    </div>
  );
};