import React, { useEffect, useRef } from 'react';
import './HolographicCubes.css';

const HolographicCubes = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let cubes = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Technologies with colors
    const technologies = [
      { name: 'HTML5', color: '#E34F26', glow: 'rgba(227, 79, 38, 0.6)' },
      { name: 'CSS3', color: '#1572B6', glow: 'rgba(21, 114, 182, 0.6)' },
      { name: 'JavaScript', color: '#F7DF1E', glow: 'rgba(247, 223, 30, 0.6)' },
      { name: 'TypeScript', color: '#3178C6', glow: 'rgba(49, 120, 198, 0.6)' },
      { name: 'React', color: '#61DAFB', glow: 'rgba(97, 218, 251, 0.6)' },
      { name: 'Next.js', color: '#5eb3c7', glow: 'rgba(94, 179, 199, 0.6)' },
      { name: 'React Native', color: '#61DAFB', glow: 'rgba(97, 218, 251, 0.6)' },
      { name: 'Flutter', color: '#02569B', glow: 'rgba(2, 86, 155, 0.6)' },
      { name: 'Node.js', color: '#339933', glow: 'rgba(51, 153, 51, 0.6)' },
      { name: 'Express', color: '#5eb3c7', glow: 'rgba(94, 179, 199, 0.6)' },
      { name: 'Java', color: '#007396', glow: 'rgba(0, 115, 150, 0.6)' },
      { name: 'PHP', color: '#777BB4', glow: 'rgba(119, 123, 180, 0.6)' },
      { name: 'Python', color: '#3776AB', glow: 'rgba(55, 118, 171, 0.6)' },
      { name: 'WordPress', color: '#21759B', glow: 'rgba(33, 117, 155, 0.6)' },
      { name: 'WooCommerce', color: '#96588A', glow: 'rgba(150, 88, 138, 0.6)' },
      { name: 'MongoDB', color: '#47A248', glow: 'rgba(71, 162, 72, 0.6)' },
      { name: 'MySQL', color: '#4479A1', glow: 'rgba(68, 121, 161, 0.6)' },
      { name: 'PostgreSQL', color: '#336791', glow: 'rgba(51, 103, 145, 0.6)' },
      { name: 'Linux', color: '#FCC624', glow: 'rgba(252, 198, 36, 0.6)' },
      { name: 'Docker', color: '#2496ED', glow: 'rgba(36, 150, 237, 0.6)' },
      { name: 'Git', color: '#F05032', glow: 'rgba(240, 80, 50, 0.6)' },
      { name: 'AWS', color: '#FF9900', glow: 'rgba(255, 153, 0, 0.6)' },
      { name: 'Cloudflare', color: '#F38020', glow: 'rgba(243, 128, 32, 0.6)' }
    ];

    // Cube class
    class Cube {
      constructor(tech, index) {
        this.tech = tech;
        this.size = 60 + Math.random() * 40;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.speedZ = (Math.random() - 0.5) * 0.2;
        this.rotationX = Math.random() * Math.PI * 2;
        this.rotationY = Math.random() * Math.PI * 2;
        this.rotationZ = Math.random() * Math.PI * 2;
        this.rotationSpeedX = (Math.random() - 0.5) * 0.01;
        this.rotationSpeedY = (Math.random() - 0.5) * 0.01;
        this.rotationSpeedZ = (Math.random() - 0.5) * 0.01;
        this.opacity = 0.3 + Math.random() * 0.4;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.z += this.speedZ;

        this.rotationX += this.rotationSpeedX;
        this.rotationY += this.rotationSpeedY;
        this.rotationZ += this.rotationSpeedZ;

        // Wrap around
        if (this.x < -100) this.x = canvas.width + 100;
        if (this.x > canvas.width + 100) this.x = -100;
        if (this.y < -100) this.y = canvas.height + 100;
        if (this.y > canvas.height + 100) this.y = -100;
        if (this.z < 0) this.z = 1000;
        if (this.z > 1000) this.z = 0;
      }

      draw() {
        const scale = 1000 / (1000 + this.z);
        const x = this.x;
        const y = this.y;
        const size = this.size * scale;

        ctx.save();
        ctx.translate(x, y);

        // Intense outer glow (multiple layers)
        for (let i = 3; i > 0; i--) {
          const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * (1 + i * 0.5));
          glowGradient.addColorStop(0, this.tech.glow);
          glowGradient.addColorStop(0.5, this.tech.glow.replace('0.6', '0.3'));
          glowGradient.addColorStop(1, 'transparent');
          ctx.fillStyle = glowGradient;
          ctx.fillRect(-size * 2, -size * 2, size * 4, size * 4);
        }

        ctx.globalAlpha = this.opacity;

        // Draw 3D cube with intense glow
        const half = size / 2;
        const offset = size * 0.35;

        // Front face with gradient fill
        const faceGradient = ctx.createLinearGradient(-half, -half, half, half);
        faceGradient.addColorStop(0, this.tech.color + '40');
        faceGradient.addColorStop(0.5, this.tech.color + '20');
        faceGradient.addColorStop(1, this.tech.color + '10');
        
        ctx.fillStyle = faceGradient;
        ctx.fillRect(-half, -half, size, size);

        // Front face edges with intense glow
        ctx.strokeStyle = this.tech.color;
        ctx.lineWidth = 3 * scale;
        ctx.shadowBlur = 30 * scale;
        ctx.shadowColor = this.tech.color;
        ctx.beginPath();
        ctx.rect(-half, -half, size, size);
        ctx.stroke();

        // Top face
        ctx.fillStyle = this.tech.color + '30';
        ctx.beginPath();
        ctx.moveTo(-half, -half);
        ctx.lineTo(-half + offset, -half - offset);
        ctx.lineTo(half + offset, -half - offset);
        ctx.lineTo(half, -half);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Right face
        ctx.fillStyle = this.tech.color + '20';
        ctx.beginPath();
        ctx.moveTo(half, -half);
        ctx.lineTo(half + offset, -half - offset);
        ctx.lineTo(half + offset, half - offset);
        ctx.lineTo(half, half);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw tech name with glow
        ctx.shadowBlur = 15 * scale;
        ctx.shadowColor = this.tech.color;
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${14 * scale}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.tech.name, 0, 0);

        ctx.restore();
      }
    }

    // Create cubes
    const createCubes = () => {
      cubes = technologies.map((tech, index) => new Cube(tech, index));
    };
    createCubes();

    // Draw grid
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(94, 179, 199, 0.05)';
      ctx.lineWidth = 1;
      
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Draw connecting lines
    const drawConnections = () => {
      for (let i = 0; i < cubes.length; i++) {
        for (let j = i + 1; j < cubes.length; j++) {
          const dx = cubes[i].x - cubes[j].x;
          const dy = cubes[i].y - cubes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const opacity = (1 - distance / 200) * 0.1;
            ctx.strokeStyle = `rgba(94, 179, 199, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(cubes[i].x, cubes[i].y);
            ctx.lineTo(cubes[j].x, cubes[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.5, '#0a0a1a');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      drawConnections();

      // Sort cubes by z-index for proper layering
      cubes.sort((a, b) => b.z - a.z);

      cubes.forEach(cube => {
        cube.update();
        cube.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="holographic-cubes" />;
};

export default HolographicCubes;