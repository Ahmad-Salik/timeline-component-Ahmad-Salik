import { MS_PER_DAY } from '@/constants/timeline.constants';

/**
 * Calculate pixel position from date
 */
export const calculatePosition = (
  date: Date,
  startDate: Date,
  pixelsPerDay: number
): number => {
  const daysSinceStart = (date.getTime() - startDate.getTime()) / MS_PER_DAY;
  return Math.round(daysSinceStart * pixelsPerDay);
};

/**
 * Calculate duration in pixels
 */
export const calculateDuration = (
  startDate: Date,
  endDate: Date,
  pixelsPerDay: number
): number => {
  const durationDays = (endDate.getTime() - startDate.getTime()) / MS_PER_DAY;
  return Math.round(durationDays * pixelsPerDay);
};

/**
 * Calculate date from pixel position
 */
export const calculateDateFromPosition = (
  position: number,
  startDate: Date,
  pixelsPerDay: number
): Date => {
  const days = Math.round(position / pixelsPerDay);
  const result = new Date(startDate);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Calculate task position and width
 */
export const calculateTaskPosition = (
  taskStartDate: Date,
  taskEndDate: Date,
  viewStartDate: Date,
  pixelsPerDay: number,
  minWidth: number = 20
): { left: number; width: number } => {
  const left = calculatePosition(taskStartDate, viewStartDate, pixelsPerDay);
  const width = Math.max(
    minWidth,
    calculateDuration(taskStartDate, taskEndDate, pixelsPerDay)
  );

  return { left: Math.max(0, left), width };
};

/**
 * Check if a point is within bounds
 */
export const isPointInBounds = (
  x: number,
  y: number,
  bounds: { left: number; top: number; width: number; height: number }
): boolean => {
  return (
    x >= bounds.left &&
    x <= bounds.left + bounds.width &&
    y >= bounds.top &&
    y <= bounds.top + bounds.height
  );
};

/**
 * Clamp value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

