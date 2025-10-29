export interface TimelineTask {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number; // 0-100
  assignee?: string;
  rowId: string; // which row/resource this belongs to
  dependencies?: string[]; // IDs of tasks this depends on
  color?: string;
  isMilestone?: boolean;
  description?: string;
}

export interface TimelineRow {
  id: string;
  label: string;
  avatar?: string;
  tasks: string[]; // task IDs assigned to this row
}

export interface TimelineViewProps {
  rows: TimelineRow[];
  tasks: Record<string, TimelineTask>;
  startDate: Date;
  endDate: Date;
  viewMode: 'day' | 'week' | 'month';
  onTaskUpdate?: (taskId: string, updates: Partial<TimelineTask>) => void;
  onTaskMove?: (taskId: string, newRowId: string, newStartDate: Date) => void;
  onTaskClick?: (task: TimelineTask) => void;
  className?: string;
}

export interface TimeScale {
  start: Date;
  end: Date;
  unit: 'hour' | 'day' | 'week' | 'month';
  intervals: Date[];
}

export interface TaskPosition {
  left: number;
  width: number;
  top: number;
  height: number;
}

export interface DependencyConnection {
  from: { x: number; y: number };
  to: { x: number; y: number };
  taskId: string;
}

export interface DependencyLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  fromTaskId: string;
  toTaskId: string;
}

