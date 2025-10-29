import { format, formatDistance } from 'date-fns';

/**
 * Format date for display
 */
export const formatDate = (date: Date, formatString: string = 'MMM dd, yyyy'): string => {
  return format(date, formatString);
};

/**
 * Format date range
 */
export const formatDateRange = (startDate: Date, endDate: Date): string => {
  return `${format(startDate, 'MMM dd')} - ${format(endDate, 'MMM dd, yyyy')}`;
};

/**
 * Format duration
 */
export const formatDuration = (startDate: Date, endDate: Date): string => {
  return formatDistance(startDate, endDate);
};

/**
 * Format progress percentage
 */
export const formatProgress = (progress: number): string => {
  return `${Math.round(progress)}%`;
};

/**
 * Truncate text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Get initials from name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Format task title for aria-label
 */
export const formatTaskAriaLabel = (
  title: string,
  startDate: Date,
  endDate: Date,
  progress: number
): string => {
  return `${title}. From ${formatDate(startDate)} to ${formatDate(endDate)}. Progress: ${progress}%. Press Enter to edit.`;
};

