import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * **cn Utility**
 *
 * A helper function to conditionally combine and merge Tailwind CSS class names.
 *
 * ### Features:
 * - **Class merging**:
 *   - Uses `clsx` to conditionally join class names.
 *   - Handles arrays, objects, strings, and falsy values gracefully.
 * - **Tailwind-aware merging**:
 *   - Leverages `tailwind-merge` to intelligently resolve conflicting Tailwind classes (e.g., `p-2` vs `p-4`).
 * - **Lightweight and reusable**:
 *   - Commonly used across components for consistent class handling.
 *
 * ### Parameters:
 * - `...inputs` (`ClassValue[]`) - A list of class values, including strings, arrays, objects, or conditional expressions.
 *
 * ### Returns:
 * - `string` — A merged and optimized class name string.
 *
 * ### Example Usage:
 * ```ts
 * cn("px-4", "py-2", isActive && "bg-blue-500 p-2", );
 * // "px-4 py-2 bg-blue-500 p-2" → intelligently merged into "p-2 bg-blue-500"
 * ```
 *
 * @author [Suriya](https://github.com/suriya-k7)
 */

export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
