import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const isSameOrAfterToday = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // today at midnight
  const d = new Date(date);
  d.setHours(0, 0, 0, 0); // normalize picked date to midnight
  return d >= today;
};