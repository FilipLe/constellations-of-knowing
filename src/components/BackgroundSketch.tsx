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
          case 'aristotle-physics':
            drawAristotle(p, t);
            break;
          case 'eratosthenes-measurement':
            drawEratosthenes(p);
            break;
          case 'hipparchus-catalog':
            drawHipparchus(p);
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
          case 'galileo-telescope':
            drawGalileo(p, t);
            break;
          case 'ellipses':
            drawSolarSystem(p, t, true);
            break;
          case 'newton-laws':
            drawNewton(p, t);
            break;
          case 'epilogue-constellation':
            drawEpilogue(p, t);
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

  const drawAristotle = (p: p5, time: number) => {
    // More structured, weighty spheres with purpose - all moving eastward at different speeds
    p.fill(50, 100, 200); p.noStroke(); p.circle(0, 0, 40); // Earth at center
    p.noFill(); p.stroke(255, 60);
    p.strokeWeight(2);
    // Multiple ordered spheres, all moving in same direction (eastward) but at different speeds
    for (let i = 1; i <= 7; i++) {
      p.push();
      // All rotate in same direction, but at different speeds (faster for outer spheres)
      const rotation = time * 0.08 * i;
      p.rotate(rotation);
      const radius = 60 + i * 35;
      p.circle(0, 0, radius * 2);
      // Add small markers to show purpose/direction
      p.fill(255, 100); p.noStroke();
      for (let j = 0; j < 8; j++) {
        const angle = (j / 8) * p.TWO_PI;
        const x = p.cos(angle) * radius;
        const y = p.sin(angle) * radius;
        p.circle(x, y, 3);
      }
      p.noFill(); p.stroke(255, 60);
      p.pop();
    }
  };

  const drawEratosthenes = (p: p5) => {
    // Sun above Earth, two cities (Syene and Alexandria) with sticks, showing angle difference
    p.push();
    p.translate(p.width * 0.2, 0); // Shift to the right
    
    // Draw Earth as a large circle
    p.noFill(); p.stroke(100, 150, 200, 100);
    p.strokeWeight(2);
    const earthRadius = 120;
    p.circle(0, 0, earthRadius * 2);
    
    // Sun at the top
    p.fill(255, 220, 100);
    p.noStroke();
    p.circle(0, -earthRadius - 80, 40);
    
    // Two cities: Syene (left, no shadow - sun directly overhead) and Alexandria (right, has shadow)
    const syeneX = -80;
    const alexandriaX = 80;
    const stickHeight = 35;
    
    // Sticks pointing up from cities
    p.stroke(200, 150, 100);
    p.strokeWeight(4);
    p.line(syeneX, 0, syeneX, -stickHeight); // Syene stick
    p.line(alexandriaX, 0, alexandriaX, -stickHeight); // Alexandria stick
    
    // Sun rays (parallel rays from sun)
    p.stroke(255, 200, 100, 150);
    p.strokeWeight(2);
    // Ray to Syene (vertical, no angle - sun directly overhead)
    p.line(syeneX, -stickHeight, syeneX, -earthRadius - 60);
    // Ray to Alexandria (at an angle)
    const alexandriaStickTopY = -stickHeight;
    const angle = p.PI / 12; // ~7.2 degrees (approximately what Eratosthenes measured)
    const rayEndX = alexandriaX + p.tan(angle) * (earthRadius + 60 - stickHeight);
    p.line(alexandriaX, alexandriaStickTopY, rayEndX, -earthRadius - 60);
    
    // Shadow in Alexandria
    const shadowLength = stickHeight * p.tan(angle);
    p.fill(50, 50, 50, 180);
    p.noStroke();
    p.triangle(
      alexandriaX, 0,
      alexandriaX + shadowLength, 0,
      alexandriaX, -stickHeight
    );
    
    // Angle arc showing the difference (at Alexandria)
    p.noFill();
    p.stroke(255, 200, 100, 200);
    p.strokeWeight(2);
    p.arc(alexandriaX, -stickHeight, 30, 30, -p.PI / 2, -p.PI / 2 + angle);
    
    // Label the cities
    p.fill(255, 200);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(10);
    p.text('Syene', syeneX, 20);
    p.text('Alexandria', alexandriaX, 20);
    
    p.pop();
  };

  const drawHipparchus = (p: p5) => {
    // Stars with varying brightness in clusters
    p.randomSeed(42);
    p.push();
    p.translate(-p.width * 0.6, -p.height * 0.5);
    
    // Create clusters of stars with different brightness
    const clusters = [
      { x: p.width * 0.2, y: p.height * 0.3, count: 30 },
      { x: p.width * 0.5, y: p.height * 0.2, count: 25 },
      { x: p.width * 0.7, y: p.height * 0.4, count: 35 },
      { x: p.width * 0.3, y: p.height * 0.6, count: 28 },
      { x: p.width * 0.8, y: p.height * 0.7, count: 32 }
    ];
    
    clusters.forEach(cluster => {
      for (let i = 0; i < cluster.count; i++) {
        const angle = p.random(p.TWO_PI);
        const dist = p.random(60, 120);
        const x = cluster.x + p.cos(angle) * dist;
        const y = cluster.y + p.sin(angle) * dist;
        
        // Varying brightness (magnitude)
        const brightness = p.random(100, 255);
        const size = p.map(brightness, 100, 255, 1, 3);
        
        p.stroke(255, brightness);
        p.strokeWeight(size);
        p.point(x, y);
      }
    });
    
    // Add some connecting lines to show catalog structure
    p.stroke(255, 30);
    p.strokeWeight(0.5);
    clusters.forEach((cluster, i) => {
      if (i < clusters.length - 1) {
        p.line(cluster.x, cluster.y, clusters[i + 1].x, clusters[i + 1].y);
      }
    });
    
    p.pop();
  };

  const drawGalileo = (p: p5, time: number) => {
    // Telescope, Venus phases, Jupiter with moons
    p.push();
    
    // Draw telescope (more detailed, on the left)
    p.push();
    p.translate(-180, 30);
    p.rotate(p.PI / 12); // Slight angle
    // Telescope tube
    p.fill(80, 80, 80);
    p.noStroke();
    p.rect(-5, -60, 10, 120);
    // Eyepiece (smaller end)
    p.fill(60, 60, 60);
    p.circle(0, -60, 18);
    // Objective lens (larger end)
    p.fill(120, 120, 120);
    p.circle(0, 60, 28);
    // Lens reflection
    p.fill(200, 200, 200, 100);
    p.circle(0, 60, 20);
    // Tripod legs
    p.stroke(100, 100, 100);
    p.strokeWeight(3);
    p.line(-5, 60, -30, 100);
    p.line(5, 60, 30, 100);
    p.line(0, 60, 0, 100);
    p.pop();
    
    // Venus phases (top right) - clearer phases
    p.push();
    p.translate(120, -80);
    const venusCycle = (time * 0.2) % p.TWO_PI;
    const venusPhase = venusCycle / p.TWO_PI; // 0 to 1
    
    // Draw Venus circle outline
    p.stroke(255, 200, 100, 150);
    p.strokeWeight(2);
    p.noFill();
    p.circle(0, 0, 45);
    
    // Draw phase based on cycle
    p.fill(255, 200, 100);
    p.noStroke();
    
    if (venusPhase < 0.25) {
      // New Venus (dark, but show outline)
      p.fill(255, 200, 100, 50);
      p.circle(0, 0, 45);
    } else if (venusPhase < 0.5) {
      // Waxing crescent
      p.circle(0, 0, 45);
      p.fill(10, 10, 18);
      p.ellipse(0, 0, 45, 45 * (1 - (venusPhase - 0.25) * 4));
    } else if (venusPhase < 0.75) {
      // Waning gibbous
      p.circle(0, 0, 45);
      p.fill(10, 10, 18);
      p.ellipse(0, 0, 45 * (1 - (venusPhase - 0.5) * 4), 45);
    } else {
      // Waning crescent
      p.circle(0, 0, 45);
      p.fill(10, 10, 18);
      p.ellipse(0, 0, 45, 45 * (venusPhase - 0.75) * 4);
    }
    p.pop();
    
    // Jupiter with moons (center-right)
    p.push();
    p.translate(100, 0);
    p.fill(200, 150, 100);
    p.noStroke();
    p.circle(0, 0, 35); // Jupiter
    
    // Four Galilean moons orbiting
    const moonDist = 60;
    for (let i = 0; i < 4; i++) {
      const angle = time * (0.5 + i * 0.2) + i * p.PI / 2;
      const moonX = p.cos(angle) * moonDist;
      const moonY = p.sin(angle) * moonDist;
      p.fill(255, 200);
      p.circle(moonX, moonY, 6);
      // Orbit path
      p.noFill();
      p.stroke(255, 20);
      p.strokeWeight(1);
      p.circle(0, 0, moonDist * 2);
    }
    p.pop();
    
    p.pop();
  };

  const drawNewton = (p: p5, time: number) => {
    // Show forces acting on elliptical orbits - three laws represented
    p.fill(255, 200, 50); p.noStroke(); p.circle(0, 0, 50); // Sun
    
    // Elliptical orbit with planet
    const a = 150;
    const b = 100;
    p.noFill(); p.stroke(255, 40);
    p.ellipse(0, 0, a * 2, b * 2);
    
    const speed = time * 0.8;
    const angle = speed;
    const planetX = p.cos(angle) * a;
    const planetY = p.sin(angle) * b;
    
    // Planet
    p.fill(255); p.noStroke();
    p.circle(planetX, planetY, 12);
    
    // Force vector (gravity pulling toward sun)
    const forceScale = 30;
    const forceX = -planetX * 0.15;
    const forceY = -planetY * 0.15;
    p.stroke(255, 200, 50, 200);
    p.strokeWeight(2);
    p.line(planetX, planetY, planetX + forceX, planetY + forceY);
    // Arrowhead
    const arrowAngle = p.atan2(forceY, forceX);
    p.push();
    p.translate(planetX + forceX, planetY + forceY);
    p.rotate(arrowAngle);
    p.triangle(0, 0, -8, -4, -8, 4);
    p.pop();
    
    // Velocity vector (tangent to orbit - inertia)
    const velX = -p.sin(angle) * forceScale;
    const velY = p.cos(angle) * forceScale;
    p.stroke(100, 200, 255, 200);
    p.strokeWeight(2);
    p.line(planetX, planetY, planetX + velX, planetY + velY);
    // Arrowhead
    const velAngle = p.atan2(velY, velX);
    p.push();
    p.translate(planetX + velX, planetY + velY);
    p.rotate(velAngle);
    p.triangle(0, 0, -8, -4, -8, 4);
    p.pop();
    
    // Show equal areas (second law) - draw sectors
    p.noFill();
    p.stroke(255, 30);
    p.strokeWeight(1);
    const sectorAngle = p.PI / 6;
    p.line(0, 0, planetX, planetY);
    p.line(0, 0, p.cos(angle + sectorAngle) * a, p.sin(angle + sectorAngle) * b);
  };

  const drawEpilogue = (p: p5, time: number) => {
    // Names connected in chain with mini versions of their modules
    p.push();
    p.translate(-p.width * 0.4, 0);
    
    const philosophers = [
      { name: 'Pythagoras', x: -200, y: -80, mode: 'single-sphere' },
      { name: 'Plato', x: -100, y: -40, mode: 'concentric' },
      { name: 'Aristotle', x: 0, y: 0, mode: 'aristotle-physics' },
      { name: 'Ptolemy', x: 100, y: 40, mode: 'epicycles' },
      { name: 'Copernicus', x: 200, y: 80, mode: 'heliocentric' },
      { name: 'Kepler', x: 300, y: 120, mode: 'ellipses' },
      { name: 'Newton', x: 400, y: 160, mode: 'newton-laws' }
    ];
    
    // Draw connecting chain
    p.stroke(255, 100);
    p.strokeWeight(2);
    for (let i = 0; i < philosophers.length - 1; i++) {
      p.line(philosophers[i].x, philosophers[i].y, philosophers[i + 1].x, philosophers[i + 1].y);
    }
    
    // Draw each philosopher's mini visualization
    philosophers.forEach((phil) => {
      p.push();
      p.translate(phil.x, phil.y);
      
      // Mini visualization based on mode
      p.scale(0.3);
      switch (phil.mode) {
        case 'single-sphere':
          drawGeoCentric(p, 1, time);
          break;
        case 'concentric':
          drawGeoCentric(p, 3, time);
          break;
        case 'aristotle-physics':
          drawAristotle(p, time);
          break;
        case 'epicycles':
          drawPtolemy(p, time);
          break;
        case 'heliocentric':
          drawSolarSystem(p, time, false);
          break;
        case 'ellipses':
          drawSolarSystem(p, time, true);
          break;
        case 'newton-laws':
          drawNewton(p, time);
          break;
      }
      
      p.pop();
      
      // Name label
      p.fill(255, 200);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(12);
      p.text(phil.name, phil.x, phil.y + 50);
    });
    
    p.pop();
  };

  return <div ref={sketchRef} className="absolute inset-0" />;
};

export default BackgroundSketch;