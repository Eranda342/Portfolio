import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn() — class name utility
 * Merges Tailwind class names intelligently,
 * resolving conflicts (e.g. px-4 + px-6 → px-6).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * formatNumber — format large numbers with commas
 */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}
