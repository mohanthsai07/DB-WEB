 "use client";

import createGlobe, { type COBEOptions } from "cobe";
import { useEffect, useRef, type PointerEvent } from "react";

const globeConfig: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0.35,
  theta: 0.25,
  dark: 0,
  diffuse: 1.1,
  mapSamples: 14000,
  mapBrightness: 1.15,
  baseColor: [0.93, 0.96, 0.92],
  markerColor: [0.03, 0.47, 0.25],
  glowColor: [0.76, 0.87, 0.76],
  markers: [
    { location: [17.385, 78.4867], size: 0.12 }, // Hyderabad
    { location: [28.6139, 77.209], size: 0.055 }, // Delhi
    { location: [19.076, 72.8777], size: 0.055 }, // Mumbai
    { location: [12.9716, 77.5946], size: 0.055 }, // Bengaluru
    { location: [13.0827, 80.2707], size: 0.05 }, // Chennai
    { location: [22.5726, 88.3639], size: 0.05 }, // Kolkata
  ],
};

export default function Globe({
  markers = globeConfig.markers,
}: {
  markers?: COBEOptions["markers"];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerStartRef = useRef<number | null>(null);
  const pointerOffsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let phi = globeConfig.phi;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationFrame = 0;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      const bounds = parent.getBoundingClientRect();
      const size = Math.round(Math.min(bounds.width, bounds.height) * 2);
      if (!size) return;

      if (!globe) {
        globe = createGlobe(canvas, {
          ...globeConfig,
          markers,
          width: size,
          height: size,
          scale: 1.08,
        });
        canvas.style.opacity = "1";
      } else {
        globe.update({ width: size, height: size });
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    resize();

    const animate = () => {
      if (globe) {
        if (!motionPreference.matches && pointerStartRef.current === null) {
          phi += 0.0025;
        }
        globe.update({ phi: phi + pointerOffsetRef.current });
      }
      animationFrame = window.requestAnimationFrame(animate);
    };
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(animationFrame);
      globe?.destroy();
    };
  }, [markers]);

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerStartRef.current = event.clientX;
    event.currentTarget.style.cursor = "grabbing";
  };

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (pointerStartRef.current !== null) {
      pointerOffsetRef.current += (event.clientX - pointerStartRef.current) / 200;
      pointerStartRef.current = event.clientX;
    }
  };

  const releasePointer = (event: PointerEvent<HTMLCanvasElement>) => {
    pointerStartRef.current = null;
    event.currentTarget.style.cursor = "grab";
  };

  return (
    <canvas
      ref={canvasRef}
      aria-label={markers?.length ? "Interactive globe highlighting Dhanik Bharat and major Indian cities" : "Interactive globe illustration"}
      role="img"
      className="h-full w-full cursor-grab opacity-0 transition-opacity duration-700 [contain:layout_paint_size]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={releasePointer}
      onPointerCancel={releasePointer}
      onLostPointerCapture={releasePointer}
    />
  );
}
