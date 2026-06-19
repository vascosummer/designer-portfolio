import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));
