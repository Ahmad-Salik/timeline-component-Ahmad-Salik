import { TimelineTask, TimelineRow } from '@/types/timeline.types';

/**
 * Validate task data
 */
export const validateTask = (task: Partial<TimelineTask>): string[] => {
  const errors: string[] = [];

  if (!task.id) errors.push('Task ID is required');
  if (!task.title) errors.push('Task title is required');
  if (!task.startDate) errors.push('Start date is required');
  if (!task.endDate) errors.push('End date is required');
  if (!task.rowId) errors.push('Row ID is required');

  if (task.startDate && task.endDate && task.startDate > task.endDate) {
    errors.push('Start date must be before end date');
  }

  if (task.progress !== undefined && (task.progress < 0 || task.progress > 100)) {
    errors.push('Progress must be between 0 and 100');
  }

  return errors;
};

/**
 * Validate row data
 */
export const validateRow = (row: Partial<TimelineRow>): string[] => {
  const errors: string[] = [];

  if (!row.id) errors.push('Row ID is required');
  if (!row.label) errors.push('Row label is required');
  if (!Array.isArray(row.tasks)) errors.push('Tasks must be an array');

  return errors;
};

/**
 * Check if date is valid
 */
export const isValidDate = (date: unknown): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Validate date range
 */
export const isValidDateRange = (startDate: Date, endDate: Date): boolean => {
  return isValidDate(startDate) && isValidDate(endDate) && startDate <= endDate;
};

/**
 * Check if tasks overlap
 */
export const tasksOverlap = (task1: TimelineTask, task2: TimelineTask): boolean => {
  return task1.startDate <= task2.endDate && task1.endDate >= task2.startDate;
};

