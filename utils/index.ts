import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cs = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
