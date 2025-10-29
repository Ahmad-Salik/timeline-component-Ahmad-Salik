export const VIEW_MODE_CONFIG = {
  day: {
    unit: 'day' as const,
    columnWidth: 40,
    pixelsPerDay: 40,
  },
  week: {
    unit: 'week' as const,
    columnWidth: 80,
    pixelsPerDay: 80 / 7,
  },
  month: {
    unit: 'month' as const,
    columnWidth: 120,
    pixelsPerDay: 120 / 30,
  },
} as const;

export const TIMELINE_CONSTANTS = {
  ROW_HEIGHT: 60,
  TASK_HEIGHT: 40,
  MILESTONE_HEIGHT: 24,
  LEFT_PANEL_WIDTH: 200,
  MIN_TASK_WIDTH: 20,
  TASK_PADDING: 8,
  RESIZE_HANDLE_WIDTH: 4,
  GRID_LINE_COLOR: '#e4e4e7',
  TODAY_LINE_COLOR: '#ef4444',
  DEPENDENCY_LINE_COLOR: '#94a3b8',
  DEFAULT_TASK_COLOR: '#0ea5e9',
} as const;

export const DEFAULT_COLORS = [
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#06b6d4', // cyan
  '#ec4899', // pink
  '#84cc16', // lime
] as const;

export const MS_PER_DAY = 1000 * 60 * 60 * 24;

