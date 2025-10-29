import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { TimelineTask } from '@/types/timeline.types';
import { formatTaskAriaLabel, formatProgress } from '@/utils/formatting.utils';
import { TIMELINE_CONSTANTS } from '@/constants/timeline.constants';

interface TaskBarProps {
  task: TimelineTask;
  position: { left: number; width: number };
  onDragStart?: (taskId: string, x: number, y: number) => void;
  onDragEnd?: () => void;
  onClick?: (task: TimelineTask) => void;
  onResize?: (taskId: string, newStartDate: Date, newEndDate: Date) => void;
  enableDragDrop?: boolean;
  isSelected?: boolean;
}

export const TaskBar: React.FC<TaskBarProps> = ({
  task,
  position,
  onDragStart,
  onDragEnd,
  onClick,
  onResize,
  enableDragDrop = false,
  isSelected = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<'left' | 'right' | null>(null);
  const taskRef = useRef<HTMLDivElement>(null);
  const initialPosRef = useRef({ x: 0, width: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!enableDragDrop || isResizing) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    initialPosRef.current = { x: e.clientX, width: position.width };
    
    if (onDragStart) {
      onDragStart(task.id, e.clientX, e.clientY);
    }
  };

  const handleResizeStart = (side: 'left' | 'right') => (e: React.MouseEvent) => {
    if (!enableDragDrop) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(side);
    initialPosRef.current = { x: e.clientX, width: position.width };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging && !isResizing) return;
      // Drag/resize logic would be handled by parent
    };

    const handleMouseUp = () => {
      if (isDragging || isResizing) {
        setIsDragging(false);
        setIsResizing(null);
        if (onDragEnd) {
          onDragEnd();
        }
      }
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, onDragEnd]);

  const handleClick = (e: React.MouseEvent) => {
    if (!isDragging && !isResizing && onClick) {
      e.stopPropagation();
      onClick(task);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) {
        onClick(task);
      }
    }
  };

  const height = task.isMilestone 
    ? TIMELINE_CONSTANTS.MILESTONE_HEIGHT 
    : TIMELINE_CONSTANTS.TASK_HEIGHT;

  return (
    <div
      ref={taskRef}
      className={clsx(
        'absolute rounded transition-shadow group',
        isDragging && 'cursor-grabbing shadow-lg z-20',
        enableDragDrop && !isDragging && 'cursor-grab hover:shadow-md',
        !enableDragDrop && 'cursor-pointer hover:shadow-md',
        isSelected && 'ring-2 ring-primary-500'
      )}
      style={{
        left: `${position.left}px`,
        width: `${position.width}px`,
        top: `${TIMELINE_CONSTANTS.TASK_PADDING}px`,
        height: `${height}px`,
        backgroundColor: task.color || TIMELINE_CONSTANTS.DEFAULT_TASK_COLOR,
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={formatTaskAriaLabel(task.title, task.startDate, task.endDate, task.progress)}
    >
      <div className="flex items-center justify-between h-full px-2 overflow-hidden">
        <span className="text-xs font-medium text-white truncate">
          {task.title}
        </span>
        {!task.isMilestone && (
          <span className="text-xs text-white opacity-75 ml-1 flex-shrink-0">
            {formatProgress(task.progress)}
          </span>
        )}
      </div>

      {/* Progress bar overlay */}
      {!task.isMilestone && task.progress > 0 && (
        <div
          className="absolute bottom-0 left-0 h-1 bg-white opacity-40 rounded-b"
          style={{ width: `${task.progress}%` }}
        />
      )}

      {/* Resize handles */}
      {enableDragDrop && !task.isMilestone && (
        <>
          <div
            className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-white opacity-0 hover:opacity-50 group-hover:opacity-30"
            onMouseDown={handleResizeStart('left')}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-white opacity-0 hover:opacity-50 group-hover:opacity-30"
            onMouseDown={handleResizeStart('right')}
          />
        </>
      )}
    </div>
  );
};

