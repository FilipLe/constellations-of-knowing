import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import type { EraId } from '../data/content';

interface Props {
  activeEra: EraId;
  visualMode: string;
}

const BackgroundSketch: React.FC<Props> = ({ visualMode }) => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const myP5 = useRef<p5 | null>(null);

  useEffect(() => {
    // This function creates the P5 instance
    const sketch = (p: p5) => {
      
      p.setup = () => {
        // Create canvas and attach to the div
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.background(10, 10, 18); // Initial dark background
      };

      p.draw = () => {
        // 1. Background (redraw every frame)
        p.background(10, 10, 18);

        // 2. Global Time
        const t = p.frameCount * 0.01;

        // 3. Move Center to the Right
        p.push();
        p.translate(p.width * 0.6, p.height * 0.5);

        p.noFill();
        p.stroke(255);
        p.strokeWeight(1);

        // Access the LATEST visualMode from props (we need to capture it in closure or use a ref)
        // Note: In instance mode, we can access the 'visualMode' prop directly if we recreate the sketch
        // or we can attach it to the p5 instance.
        
        switch (visualMode) {
          case 'static-stars':
            drawStars(p);
            break;
          case 'single-sphere':
            drawGeoCentric(p, 1, t);
            break;
          case 'concentric':
            drawGeoCentric(p, 5, t);
            break;
          case 'epicycles':
            drawPtolemy(p, t);
            break;
          case 'heliocentric':
            drawSolarSystem(p, t, false);
            break;
          case 'hybrid':
            drawBrahe(p, t);
            break;
          case 'ellipses':
            drawSolarSystem(p, t, true);
            break;
          default:
            drawStars(p);
        }

        p.pop();
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };
    };

    // --- INITIALIZE P5 ---
    // If a previous instance exists, remove it first (cleanup)
    if (myP5.current) {
      myP5.current.remove();
    }
    
    // Create new instance attached to the ref
    if (sketchRef.current) {
       myP5.current = new p5(sketch, sketchRef.current);
    }

    // Cleanup when component unmounts or updates
    return () => {
      if (myP5.current) {
        myP5.current.remove();
      }
    };
  }, [visualMode]); // <--- This dependency array ensures sketch restarts when mode changes

  // --- HELPER FUNCTIONS (Pure Logic) ---
  const drawStars = (p: p5) => {
    p.randomSeed(99); 
    p.stroke(255, 150);
    p.strokeWeight(2);
    p.push();
    p.translate(-p.width * 0.6, -p.height * 0.5);
    for (let i = 0; i < 200; i++) {
      const x = p.random(p.width);
      const y = p.random(p.height);
      p.point(x, y);
    }
    p.pop();
  };

  const drawGeoCentric = (p: p5, rings: number, time: number) => {
    p.fill(50, 100, 200); p.noStroke(); p.circle(0, 0, 40); // Earth
    p.noFill(); p.stroke(255, 40);
    for (let i = 1; i <= rings; i++) {
      p.push();
      p.rotate(time * 0.1 * (i % 2 === 0 ? 1 : -1)); 
      p.ellipse(0, 0, 100 + i * 50, 100 + i * 50);
      p.pop();
    }
  };

  const drawPtolemy = (p: p5, time: number) => {
    p.fill(50, 100, 200); p.noStroke(); p.circle(0, 0, 40); // Earth
    const deferentR = 200;
    p.noFill(); p.stroke(255, 30); p.circle(0, 0, deferentR * 2);
    const angleD = time * 0.5;
    const epiCenterX = p.cos(angleD) * deferentR;
    const epiCenterY = p.sin(angleD) * deferentR;
    const epiR = 50;
    p.stroke(255, 40); p.circle(epiCenterX, epiCenterY, epiR * 2);
    const angleE = time * 2.5;
    const planetX = epiCenterX + p.cos(angleE) * epiR;
    const planetY = epiCenterY + p.sin(angleE) * epiR;
    p.fill(255); p.circle(planetX, planetY, 10);
    p.stroke(255, 50); p.line(epiCenterX, epiCenterY, planetX, planetY);
  };

  const drawSolarSystem = (p: p5, time: number, elliptical: boolean) => {
    p.fill(255, 200, 50); p.noStroke(); p.circle(0, 0, 50); // Sun
    for (let i = 1; i <= 4; i++) {
      const a = 80 * i; 
      const b = elliptical ? a * 0.7 : a;
      const speed = 1.5 / i;
      const angle = time * speed;
      p.noFill(); p.stroke(255, 20); p.ellipse(0, 0, a * 2, b * 2);
      const x = p.cos(angle) * a;
      const y = p.sin(angle) * b;
      p.fill(255); p.circle(x, y, 8);
    }
  };

  const drawBrahe = (p: p5, time: number) => {
    p.fill(50, 100, 200); p.circle(0, 0, 40); // Earth
    const sunDist = 200;
    const sunAngle = time * 0.5;
    const sunX = p.cos(sunAngle) * sunDist;
    const sunY = p.sin(sunAngle) * sunDist;
    p.noFill(); p.stroke(255, 30); p.circle(0, 0, sunDist * 2);
    p.fill(255, 200, 50); p.circle(sunX, sunY, 30); // Sun
    p.push();
    p.translate(sunX, sunY);
    p.noFill(); p.stroke(255, 30); p.circle(0, 0, 100);
    const planetAngle = time * 2;
    const px = p.cos(planetAngle) * 50;
    const py = p.sin(planetAngle) * 50;
    p.fill(255); p.circle(px, py, 10);
    p.pop();
  };

  return <div ref={sketchRef} className="absolute inset-0" />;
};

export default BackgroundSketch;