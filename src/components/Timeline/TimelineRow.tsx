import React, { useMemo } from 'react';
import { TimelineRow as TimelineRowType, TimelineTask } from '@/types/timeline.types';
import { TaskBar } from './TaskBar';
import { calculateTaskPosition } from '@/utils/position.utils';
import { TIMELINE_CONSTANTS } from '@/constants/timeline.constants';
import { getInitials } from '@/utils/formatting.utils';

interface TimelineRowProps {
  row: TimelineRowType;
  tasks: Record<string, TimelineTask>;
  viewStartDate: Date;
  pixelsPerDay: number;
  onTaskClick?: (task: TimelineTask) => void;
  onTaskDragStart?: (taskId: string, x: number, y: number) => void;
  onTaskDragEnd?: () => void;
  enableDragDrop?: boolean;
  selectedTaskId?: string | null;
}

export const TimelineRow: React.FC<TimelineRowProps> = ({
  row,
  tasks,
  viewStartDate,
  pixelsPerDay,
  onTaskClick,
  onTaskDragStart,
  onTaskDragEnd,
  enableDragDrop = false,
  selectedTaskId = null,
}) => {
  const rowTasks = useMemo(() => {
    return row.tasks
      .map(taskId => tasks[taskId])
      .filter(Boolean)
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }, [row.tasks, tasks]);

  return (
    <div
      className="flex border-b border-neutral-200"
      style={{ height: `${TIMELINE_CONSTANTS.ROW_HEIGHT}px` }}
      role="region"
      aria-label={`${row.label} timeline. ${rowTasks.length} tasks.`}
    >
      {/* Left panel - Row label */}
      <div
        className="flex items-center px-4 border-r border-neutral-200 bg-neutral-50 flex-shrink-0"
        style={{ width: `${TIMELINE_CONSTANTS.LEFT_PANEL_WIDTH}px` }}
      >
        {row.avatar ? (
          <img
            src={row.avatar}
            alt={row.label}
            className="w-8 h-8 rounded-full mr-3"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-medium mr-3">
            {getInitials(row.label)}
          </div>
        )}
        <span className="font-medium text-neutral-900 truncate">{row.label}</span>
      </div>

      {/* Right panel - Tasks */}
      <div className="flex-1 relative">
        {rowTasks.map(task => {
          const position = calculateTaskPosition(
            task.startDate,
            task.endDate,
            viewStartDate,
            pixelsPerDay,
            TIMELINE_CONSTANTS.MIN_TASK_WIDTH
          );

          return (
            <TaskBar
              key={task.id}
              task={task}
              position={position}
              onClick={onTaskClick}
              onDragStart={onTaskDragStart}
              onDragEnd={onTaskDragEnd}
              enableDragDrop={enableDragDrop}
              isSelected={task.id === selectedTaskId}
            />
          );
        })}
      </div>
    </div>
  );
};

