import { useEffect, useRef, useState } from "react";

/**
 * Tracks raw and lerped mouse position normalized to viewport (-1 to 1).
 * Lerp factor 0.18 — viscous, premium.
 */
export function useMousePosition(lerpFactor = 0.18) {
  const target = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rawPosition, setRawPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const moveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      target.current = { x: nx, y: ny };
      setRawPosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => setIsMoving(false), 4000);
    };

    let rafId: number;
    let current = { x: 0, y: 0 };

    const animate = () => {
      current.x += (target.current.x - current.x) * lerpFactor;
      current.y += (target.current.y - current.y) * lerpFactor;
      setPosition({ x: current.x, y: current.y });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
    };
  }, [lerpFactor]);

  return { position, rawPosition, isMoving };
}
