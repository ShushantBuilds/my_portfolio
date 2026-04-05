'use client';
import { useEffect, useRef } from 'react';

export default function SchematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: -1000, y: -1000 }; // Start offscreen
    const radius = 180; // Size of the scanning circle

    // Generate Nodes
    const nodes: { x: number; y: number; vx: number; vy: number; id: string; hasAxis: boolean }[] = [];
    const nodeCount = 50;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas(); // Set initial size

    // Populate nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2, // Very slow drift
        vy: (Math.random() - 0.5) * 0.2,
        id: Math.random().toString(16).substring(2, 6).toUpperCase(), // e.g., "A4F2"
        hasAxis: Math.random() > 0.7, // 30% of nodes get architectural crosshairs
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Architectural Grid
      const gridSize = 100;
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.moveTo(0, y); ctx.lineTo(canvas.width, y);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Process Nodes
      nodes.forEach((node) => {
        // Subtle movement
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // 2. Draw Crosshairs for designated architectural nodes
        if (node.hasAxis) {
          ctx.beginPath();
          ctx.moveTo(node.x, 0); ctx.lineTo(node.x, canvas.height);
          ctx.moveTo(0, node.y); ctx.lineTo(canvas.width, node.y);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.stroke();
        }

        // 3. Draw the Node itself (small square)
        ctx.fillStyle = 'rgba(163, 163, 163, 0.8)'; // text-neutral-400
        ctx.fillRect(node.x - 2, node.y - 2, 4, 4);

        // 4. Scanner Logic
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const distance = Math.hypot(dx, dy);

        if (distance < radius) {
          // Draw connecting line to mouse center
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(node.x, node.y);
          const opacity = 1 - (distance / radius); // Fades out towards edge
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
          ctx.stroke();

          // Draw Technical Labels (Hex ID and simulated latency)
          ctx.font = '10px monospace';
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
          const latency = (distance * 0.02).toFixed(2);
          ctx.fillText(`ID:${node.id}`, node.x + 8, node.y - 4);
          ctx.fillText(`${latency}ms`, node.x + 8, node.y + 8);
        }
      });

      // 5. Draw the Scanner Radius Circle (Dashed)
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.setLineDash([4, 6]); // Creates the dashed effect
        ctx.stroke();
        ctx.setLineDash([]); // Reset dash for next frame
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOut = () => {
      // Hide scanner when mouse leaves window
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseOut);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}