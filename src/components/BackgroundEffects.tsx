import React, { useEffect, useRef } from 'react';

export const BackgroundEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: { x: number; y: number; radius: number; vx: number; vy: number; alpha: number; color: string }[] = [];
    const numStars = 150;

    const colors = ['#4ade80', '#22d3ee', '#ffffff', '#a78bfa'];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.2,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        alpha: Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse Spotlight Glow Effect
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 600);
      gradient.addColorStop(0, 'rgba(74, 222, 128, 0.05)');
      gradient.addColorStop(0.5, 'rgba(34, 211, 238, 0.02)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render Stars
      stars.forEach((star) => {
        // Parallax scroll based on mouse position
        const dx = (mouseX - width / 2) * 0.0003 * star.radius;
        const dy = (mouseY - height / 2) * 0.0003 * star.radius;

        star.x += star.vx - dx;
        star.y += star.vy - dy;

        // Warp bounds
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Dynamic Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
      />

      {/* Aurora Ambient Lighting Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2]">
        {/* Blob 1 */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[140px] animate-drift-slow"
          style={{
            top: '-10%',
            left: '-10%',
            animationDuration: '25s'
          }}
        />
        {/* Blob 2 */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full bg-cyan-500/8 blur-[160px] animate-drift-slow"
          style={{
            bottom: '10%',
            right: '-10%',
            animationDuration: '30s',
            animationDelay: '-5s'
          }}
        />
        {/* Blob 3 */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] animate-drift-slow"
          style={{
            top: '40%',
            left: '50%',
            transform: 'translateX(-50%)',
            animationDuration: '35s',
            animationDelay: '-10s'
          }}
        />
      </div>

      {/* Fine Film Grain Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] bg-noise-pattern z-[1]" />
    </>
  );
};
