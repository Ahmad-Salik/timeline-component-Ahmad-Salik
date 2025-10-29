import {
  format,
  differenceInDays,
} from 'date-fns';

/**
 * Generate time scale labels
 */
export const generateTimeScale = (
  startDate: Date,
  endDate: Date,
  viewMode: 'day' | 'week' | 'month'
): Array<{ date: Date; label: string }> => {
  const scale: Array<{ date: Date; label: string }> = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    if (viewMode === 'day') {
      scale.push({
        date: new Date(current),
        label: format(current, 'MMM dd'),
      });
      current.setDate(current.getDate() + 1);
    } else if (viewMode === 'week') {
      scale.push({
        date: new Date(current),
        label: format(current, 'MMM dd'),
      });
      current.setDate(current.getDate() + 7);
    } else {
      scale.push({
        date: new Date(current),
        label: format(current, 'MMM yyyy'),
      });
      current.setMonth(current.getMonth() + 1);
    }
  }

  return scale;
};

/**
 * Format date label based on view mode
 */
export const formatDateLabel = (date: Date, mode: 'day' | 'week' | 'month'): string => {
  switch (mode) {
    case 'day':
      return format(date, 'MMM dd');
    case 'week':
      return format(date, 'MMM dd');
    case 'month':
      return format(date, 'MMM yyyy');
    default:
      return format(date, 'MMM dd');
  }
};

/**
 * Get week number
 */
export const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

/**
 * Check if date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Get difference in days between two dates
 */
export const getDaysDifference = (startDate: Date, endDate: Date): number => {
  return differenceInDays(endDate, startDate);
};

/**
 * Add days to date
 */
export const addDaysToDate = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

