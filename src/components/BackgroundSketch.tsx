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
    // create the P5 instance
    const sketch = (p: p5) => {
      
      p.setup = () => {
        // create dark canvas and attach to the div
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.background(10, 10, 18);
      };

      p.draw = () => {
        // redraw background every frame
        p.background(10, 10, 18);

        const t = p.frameCount * 0.01;

        p.push();
        p.translate(p.width * 0.6, p.height * 0.5);

        p.noFill();
        p.stroke(255);
        p.strokeWeight(1);

        // access the 'visualMode' prop directly and attach it to the p5 instance.
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
    // if previous p5 instance exists, remove it ~ cleanup
    if (myP5.current) {
      myP5.current.remove();
    }
    
    // create new p5 instance attached to the ref
    if (sketchRef.current) {
       myP5.current = new p5(sketch, sketchRef.current);
    }

    // cleanup
    return () => {
      if (myP5.current) {
        myP5.current.remove();
      }
    };
  }, [visualMode]); 

  // --- HELPER FUNCTIONS ---
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
    // more structured, weighty spheres with purpose, moving eastward
    p.fill(50, 100, 200); p.noStroke(); p.circle(0, 0, 40); // Earth at center
    p.noFill(); p.stroke(255, 60);
    p.strokeWeight(2);
    // multiple ordered spheres, all moving in same direction eastward
    for (let i = 1; i <= 7; i++) {
      p.push();
      const rotation = time * 0.08 * i;
      p.rotate(rotation);
      const radius = 60 + i * 35;
      p.circle(0, 0, radius * 2);
      // small markers to show purpose/direction
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
    p.push();
    p.translate(p.width * 0.2, 0); 
    
    // Earth
    p.noFill(); 
    p.stroke(100, 150, 200, 100);
    p.strokeWeight(2);
    const earthRadius = 100;
    p.circle(20, 100, earthRadius * 2);
    
    // Sun at the top
    p.fill(255, 220, 100);
    p.noStroke();
    p.circle(-10, -earthRadius - 180, 80);
    
    // two cities: Syene (no shadow - sun directly overhead) and Alexandria (has shadow)
    const syeneX = 20;
    const alexandriaX = -30;
    const stickHeight = 35;
    
    // Earth center
    const earthCenterX = 20;
    const earthCenterY = 100;
    
    // sticks pointing up from cities
    p.stroke(200, 150, 100);
    p.strokeWeight(4);
    const syeneStickTopX = syeneX;
    const syeneStickTopY = -stickHeight;
    p.line(syeneX, 0, syeneStickTopX, syeneStickTopY); // Syene stick
    
    const alexandriaStickBaseX = alexandriaX + 10;
    const alexandriaStickBaseY = 10;
    const alexandriaStickTopX = alexandriaX - 10;
    const alexandriaStickTopY = -stickHeight + 10;
    p.line(alexandriaStickBaseX, alexandriaStickBaseY, alexandriaStickTopX, alexandriaStickTopY); // Alexandria stick
    
    p.fill(255, 255, 255, 50); 
    p.noStroke();
    p.triangle(
      alexandriaStickTopX+30, alexandriaStickTopY+60,   
      earthCenterX,       earthCenterY,          
      syeneStickTopX,     syeneStickTopY+60        
    );

    // extended lines from stick tops to Earth's center
    p.stroke(200, 150, 100, 150);
    p.strokeWeight(2);
    p.line(syeneStickTopX, syeneStickTopY, earthCenterX, earthCenterY); // Syene to center
    p.line(alexandriaStickTopX, alexandriaStickTopY, earthCenterX, earthCenterY); // Alexandria to center
    
    // sun rays
    p.stroke(255, 200, 100, 150);
    p.strokeWeight(2);
    const sunX = 20;
    const sunY = -earthRadius - 160;
    // ray to Syene (vertical, no angle - sun directly overhead)
    p.line(syeneStickTopX, syeneStickTopY, sunX, sunY);
    // ray to Alexandria (at an angle, parallel to Syene ray)
    const angle = p.PI / 12; // ~7 degrees, what Eratosthenes measured
    const rayOffsetX = alexandriaStickTopX - syeneStickTopX;
    const rayOffsetY = alexandriaStickTopY - syeneStickTopY;
    p.line(alexandriaStickTopX, alexandriaStickTopY, sunX + rayOffsetX, sunY + rayOffsetY);
    
    // shadow in Alexandria
    const shadowLength = stickHeight * p.tan(angle);
    p.fill(200, 200, 200, 180);
    p.noStroke();
    p.triangle(
      alexandriaStickBaseX-20, alexandriaStickBaseY+10,
      alexandriaStickBaseX + shadowLength-10, alexandriaStickBaseY,
      alexandriaStickTopX, alexandriaStickTopY
    );
    
    p.stroke(200, 200, 200, 100);
    p.strokeWeight(1);
    p.line(syeneX, 0, syeneX, 0); 
    
    // angle arc showing the difference at Alexandria
    p.noFill();
    p.stroke(255, 200, 100, 200);
    p.strokeWeight(2);
    p.arc(alexandriaStickTopX, alexandriaStickTopY, 30, 30, -p.PI / 2, -p.PI / 2 + angle);
    
    // city label
    p.fill(255, 200);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(10);
    p.text('Syene', syeneX+10, 0);
    p.text('Alexandria', alexandriaX+20, 15);
    
    p.pop();
  };

  const drawHipparchus = (p: p5) => {
    // stars with varying brightness in clusters
    p.randomSeed(42);
    p.push();
    p.translate(-p.width * 0.6, -p.height * 0.5);
    
    // create clusters of stars with different brightness
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
        
        // varying brightness
        const brightness = p.random(100, 255);
        const size = p.map(brightness, 100, 255, 1, 3);
        
        p.stroke(255, brightness);
        p.strokeWeight(size);
        p.point(x, y);
      }
    });
    
    // connecting lines to show catalog structure
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
    p.push();
    
    // orbital diagram of Venus phases
    p.push();
    p.translate(100, -220);
    
    // Sun at center
    p.fill(255, 220, 50);
    p.noStroke();
    p.circle(0, 0, 40);
    
    // Earth at bottom
    p.fill(100, 150, 255);
    p.noStroke();
    p.circle(0, 150, 25);
    p.fill(200, 220, 255);
    p.circle(0, 150, 20);
    
    // elliptical orbit path
    p.noFill();
    p.stroke(150, 150, 150, 100);
    p.strokeWeight(1);
    p.ellipse(0, 0, 300, 200);
    
    // Venus phases arranged around orbit
    const baseSize = 25; 
    const phases = [
      { angle: -p.PI / 2, name: 'Full', size: baseSize * 0.6, illuminated: 1.0 }, // Top
      { angle: -p.PI / 2 + 0.6, name: 'Gibbous', size: baseSize * 0.75, illuminated: 0.75 }, // Top-right
      { angle: 0, name: 'Third Quarter', size: baseSize * 0.9, illuminated: 0.5 }, // Right
      { angle: p.PI / 4, name: 'Crescent', size: baseSize * 1.1, illuminated: 0.25 }, // Bottom-right
      { angle: p.PI / 2, name: 'New', size: baseSize * 1.3, illuminated: 0 }, // Bottom
      { angle: p.PI / 2 + p.PI / 4, name: 'Crescent', size: baseSize * 1.1, illuminated: 0.25 }, // Bottom-left
      { angle: p.PI, name: 'First Quarter', size: baseSize * 0.9, illuminated: 0.5 }, // Left
      { angle: -p.PI / 2 - 0.6, name: 'Gibbous', size: baseSize * 0.75, illuminated: 0.75 } // Top-left
    ];
    
    phases.forEach(phase => {
      p.push();
      // position on orbit
      const orbitX = p.cos(phase.angle) * 150;
      const orbitY = p.sin(phase.angle) * 100;
      p.translate(orbitX, orbitY);
      
      // angle to Sun, illumination faces Sun
      const angleToSun = p.atan2(-orbitY, -orbitX);
      
      // draw Venus phase
      const venusSize = phase.size;
      const radius = venusSize / 2;
      
      if (phase.illuminated === 0) {
        // new - completely dark
        p.fill(30, 30, 40);
        p.noStroke();
        p.circle(0, 0, venusSize);
        p.noFill();
        p.stroke(200, 220, 255, 100);
        p.strokeWeight(1);
        p.circle(0, 0, venusSize);
      } else if (phase.illuminated === 1.0) {
        // full - completely illuminated
        p.fill(255, 200, 100);
        p.noStroke();
        p.circle(0, 0, venusSize);
      } else if (phase.illuminated === 0.5) {
        // quarter - half illuminated
        p.fill(255, 200, 100);
        p.noStroke();
        // illuminated side faces Sun
        const startAngle = angleToSun - p.PI / 2;
        const endAngle = angleToSun + p.PI / 2;
        p.arc(0, 0, venusSize, venusSize, startAngle, endAngle);
        p.noFill();
        p.stroke(200, 220, 255, 150);
        p.strokeWeight(1);
        p.circle(0, 0, venusSize);
      } else if (phase.illuminated < 0.5) {
        // crescent - thin bright part facing Sun
        const illumination = phase.illuminated;
        const offset = radius * (1 - illumination * 2); 
        const darkAngle = angleToSun + p.PI;  // dark side away from Sun
        const darkOffsetX = p.cos(darkAngle) * offset * 2.2;
        const darkOffsetY = p.sin(darkAngle) * offset * 2.2;
        const darkDiameter = venusSize * 1.8;  // large dark circle to carve out crescent
      
        const ctx = p.drawingContext as CanvasRenderingContext2D;
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, p.TWO_PI);
        ctx.clip();
      
        // full bright disk
        p.fill(255, 200, 100);
        p.noStroke();
        p.circle(0, 0, venusSize);
      
        // carve out dark side with large shifted circle
        p.fill(30, 30, 40);
        p.circle(darkOffsetX, darkOffsetY, darkDiameter);
      
        ctx.restore();
      
        p.noFill();
        p.stroke(200, 220, 255, 150);
        p.strokeWeight(1);
        p.circle(0, 0, venusSize);
      } else {
        // gibbous - mostly illuminated, small dark portion
        const darkPortion = 1 - phase.illuminated;
        const offset = radius * darkPortion * 1.8; 
        const darkOffsetX = p.cos(angleToSun + p.PI) * offset;
        const darkOffsetY = p.sin(angleToSun + p.PI) * offset;
        const darkRadius = radius - offset * 0.5;
        
        // clipping to Venus circle boundary
        const ctx = p.drawingContext as CanvasRenderingContext2D;
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, p.TWO_PI);
        ctx.clip();
        
        // full illuminated circle
        p.fill(255, 200, 100);
        p.noStroke();
        p.circle(0, 0, venusSize);
        
        // dark portion, clipped to Venus boundary
        p.fill(30, 30, 40);
        p.circle(darkOffsetX, darkOffsetY, darkRadius * 2);
        
        ctx.restore();
        
        p.noFill();
        p.stroke(200, 220, 255, 150);
        p.strokeWeight(1);
        p.circle(0, 0, venusSize);
      }
      
      // label
      p.fill(255, 255, 255, 200);
      p.noStroke();
      p.textAlign(p.CENTER, p.TOP);
      p.textSize(9);
      p.text(phase.name, 0, venusSize / 2 + 5);
      
      p.pop();
    });
    
    p.pop();
    
    // Jupiter with moons
    p.push();
    p.translate(100, 150);
    p.fill(200, 150, 100);
    p.noStroke();
    p.circle(0, 0, 50); 
    
    // four Galilean moons orbiting
    const moonDist = 80; 
    for (let i = 0; i < 4; i++) {
      const angle = time * (0.5 + i * 0.2) + i * p.PI / 2;
      const moonX = p.cos(angle) * moonDist;
      const moonY = p.sin(angle) * moonDist;
      p.fill(255, 200);
      p.circle(moonX, moonY, 8); 
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
    p.background(10, 10, 30);
    p.translate(100, -100);

    // Sun
    p.fill(255, 200, 50);
    p.noStroke();
    p.circle(0, 0, 50);
    
    // elliptical orbit
    const a = 180;  // semi-major axis
    const b = 120;  // semi-minor axis
    p.noFill();
    p.stroke(255, 60);
    p.strokeWeight(1);
    p.ellipse(0, 0, a * 2, b * 2);

    // planet position (Keplerian motion approximation)
    const angularSpeed = 0.7;
    const angle = time * angularSpeed;
    const planetX = p.cos(angle) * a;
    const planetY = p.sin(angle) * b;

    // planet
    p.fill(100, 180, 255);
    p.noStroke();
    p.circle(planetX, planetY, 16);

    // gravity force vector (1st & 2nd Law)
    const forceScale = 0.18;
    const fx = -planetX * forceScale;
    const fy = -planetY * forceScale;
    
    // force line
    p.stroke(255, 100, 100);
    p.strokeWeight(3);
    p.line(planetX, planetY, planetX + fx, planetY + fy);
    
    // arrowhead
    const fAngle = p.atan2(fy, fx);
    p.push();
    p.translate(planetX + fx, planetY + fy);
    p.rotate(fAngle);
    p.fill(255, 100, 100);
    p.noStroke();
    p.triangle(0, 0, -12, -5, -12, 5);
    p.pop();

    // velocity / inertia vector (1st Law) 
    const velLength = 50;
    const vx = -p.sin(angle) * velLength;
    const vy = p.cos(angle) * velLength;
    
    p.stroke(100, 220, 255);
    p.strokeWeight(3);
    p.line(planetX, planetY, planetX + vx, planetY + vy);
    
    const vAngle = p.atan2(vy, vx);
    p.push();
    p.translate(planetX + vx, planetY + vy);
    p.rotate(vAngle);
    p.fill(100, 220, 255);
    p.noStroke();
    p.triangle(0, 0, -12, -5, -12, 5);
    p.pop();

    // force = mass x acceleration (2nd Law) 
    p.stroke(255, 100);
    p.strokeWeight(1);
    const sector = p.PI / 8;
    p.line(0, 0, planetX, planetY);
    p.line(0, 0, p.cos(angle + sector) * a, p.sin(angle + sector) * b);

    // labels
    p.textAlign(p.CENTER);
    p.textSize(14);
    p.noStroke();

    p.fill(255, 120, 120);
    p.text("Gravitational Force\n(F = GMm/r² → toward Sun)", planetX + fx / 2, planetY + fy / 2 - 20);

    p.fill(120, 230, 255);
    p.text("Inertia / Velocity\n(1st Law: tends to go straight)", planetX + vx / 2 + 5, planetY + vy / 2 + 10);

    // legend 
    p.push();
    p.translate(-200, 200);
    p.textAlign(p.LEFT);
    p.textSize(15);
    p.fill(255);
    p.text("Newton's Laws of Motion & Universal Gravitation", 0, 0);

    p.textSize(13);
    p.strokeWeight(3);

    // 1st Law
    p.stroke(100, 220, 255);
    p.line(0, 30, 30, 30);
    p.noStroke();
    p.fill(200);
    p.text("1st Law – Inertia: Object moves in straight line unless acted upon", 40, 35);

    // 2nd Law
    p.stroke(255, 100, 100);
    p.line(0, 60, 30, 60);
    p.noStroke();
    p.fill(200);
    p.text("2nd Law – F = ma: Gravity accelerates planet toward Sun", 40, 65);

    // 3rd Law 
    p.fill(200);
    p.noStroke();
    p.text("3rd Law – Action–Reaction: Every action there is an equal but opposite reaction", 40, 95);

    p.pop();
  };

  return <div ref={sketchRef} className="absolute inset-0" />;
};

export default BackgroundSketch;