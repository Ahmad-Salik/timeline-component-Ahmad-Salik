import React, { useState, useRef, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { TimelineViewProps, TimelineTask, DependencyLine as DependencyLineType } from '@/types/timeline.types';
import { TimelineGrid } from './TimelineGrid';
import { TimelineRow } from './TimelineRow';
import { DependencyLine } from './DependencyLine';
import { TaskDetailSidebar } from './TaskDetailSidebar';
import { calculateTaskPosition } from '@/utils/position.utils';
import { calculateDependencyLine, getTaskDependencies } from '@/utils/dependency.utils';
import { VIEW_MODE_CONFIG, TIMELINE_CONSTANTS } from '@/constants/timeline.constants';

export const TimelineView: React.FC<TimelineViewProps> = ({
  rows,
  tasks,
  startDate,
  endDate,
  viewMode,
  onTaskUpdate,
  onTaskMove,
  onTaskClick,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [selectedTask, setSelectedTask] = useState<TimelineTask | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);

  const pixelsPerDay = VIEW_MODE_CONFIG[viewMode].pixelsPerDay;

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth - TIMELINE_CONSTANTS.LEFT_PANEL_WIDTH;
        setContainerWidth(width);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Calculate dependency lines
  const dependencyLines = useMemo(() => {
    const lines: DependencyLineType[] = [];

    Object.values(tasks).forEach(task => {
      if (!task.dependencies || task.dependencies.length === 0) return;

      const toPosition = calculateTaskPosition(
        task.startDate,
        task.endDate,
        startDate,
        pixelsPerDay
      );
      const toRowIndex = rows.findIndex(r => r.id === task.rowId);
      const toTop = toRowIndex * TIMELINE_CONSTANTS.ROW_HEIGHT + TIMELINE_CONSTANTS.ROW_HEIGHT / 2;

      task.dependencies.forEach(depId => {
        const fromTask = tasks[depId];
        if (!fromTask) return;

        const fromPosition = calculateTaskPosition(
          fromTask.startDate,
          fromTask.endDate,
          startDate,
          pixelsPerDay
        );
        const fromRowIndex = rows.findIndex(r => r.id === fromTask.rowId);
        const fromTop = fromRowIndex * TIMELINE_CONSTANTS.ROW_HEIGHT + TIMELINE_CONSTANTS.ROW_HEIGHT / 2;

        lines.push(
          calculateDependencyLine(
            fromTask,
            task,
            { ...fromPosition, top: fromTop },
            { ...toPosition, top: toTop }
          )
        );
      });
    });

    return lines;
  }, [tasks, rows, startDate, pixelsPerDay]);

  const handleTaskClick = (task: TimelineTask) => {
    setSelectedTask(task);
    setIsSidebarOpen(true);
    if (onTaskClick) {
      onTaskClick(task);
    }
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<TimelineTask>) => {
    if (onTaskUpdate) {
      onTaskUpdate(taskId, updates);
    }
    // Update local selected task state
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask({ ...selectedTask, ...updates });
    }
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedTask(null);
  };

  const totalHeight = rows.length * TIMELINE_CONSTANTS.ROW_HEIGHT;

  return (
    <div
      className={clsx('border border-neutral-300 rounded-xl overflow-hidden bg-white', className)}
      role="grid"
      aria-label="Timeline view"
    >
      <div ref={containerRef} className="overflow-x-auto">
        <TimelineGrid
          startDate={startDate}
          endDate={endDate}
          viewMode={viewMode}
          containerWidth={containerWidth}
        />

        {/* Rows container */}
        <div className="relative" style={{ minHeight: `${totalHeight}px` }}>
          {/* Dependency lines layer */}
          {dependencyLines.length > 0 && (
            <svg
              className="absolute inset-0 pointer-events-none"
              style={{ 
                left: `${TIMELINE_CONSTANTS.LEFT_PANEL_WIDTH}px`,
                zIndex: 1,
              }}
            >
              {dependencyLines.map((line, index) => (
                <DependencyLine
                  key={`${line.fromTaskId}-${line.toTaskId}-${index}`}
                  line={line}
                  isHighlighted={
                    hoveredTaskId === line.fromTaskId || hoveredTaskId === line.toTaskId
                  }
                />
              ))}
            </svg>
          )}

          {/* Timeline rows */}
          {rows.map((row, index) => (
            <div
              key={row.id}
              onMouseEnter={() => {
                const rowTaskIds = row.tasks;
                if (rowTaskIds.length > 0) {
                  setHoveredTaskId(rowTaskIds[0]);
                }
              }}
              onMouseLeave={() => setHoveredTaskId(null)}
            >
              <TimelineRow
                row={row}
                tasks={tasks}
                viewStartDate={startDate}
                pixelsPerDay={pixelsPerDay}
                onTaskClick={handleTaskClick}
                enableDragDrop={false}
                selectedTaskId={selectedTask?.id}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Task Detail Sidebar */}
      <TaskDetailSidebar
        task={selectedTask}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onUpdate={handleTaskUpdate}
        allTasks={tasks}
      />
    </div>
  );
};

