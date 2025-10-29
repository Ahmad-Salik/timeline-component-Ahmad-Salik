import React, { useMemo } from 'react';
import { formatDateLabel, isToday } from '@/utils/date.utils';
import { TIMELINE_CONSTANTS, VIEW_MODE_CONFIG } from '@/constants/timeline.constants';
import clsx from 'clsx';

interface TimelineGridProps {
  startDate: Date;
  endDate: Date;
  viewMode: 'day' | 'week' | 'month';
  containerWidth: number;
}

export const TimelineGrid: React.FC<TimelineGridProps> = ({
  startDate,
  endDate,
  viewMode,
  containerWidth,
}) => {
  const intervals = useMemo(() => {
    const result: Date[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      result.push(new Date(current));

      if (viewMode === 'day') {
        current.setDate(current.getDate() + 1);
      } else if (viewMode === 'week') {
        current.setDate(current.getDate() + 7);
      } else {
        current.setMonth(current.getMonth() + 1);
      }
    }

    return result;
  }, [startDate, endDate, viewMode]);

  const columnWidth = VIEW_MODE_CONFIG[viewMode].columnWidth;
  const totalColumns = intervals.length;
  const gridWidth = totalColumns * columnWidth;

  // Calculate today's position
  const todayPosition = useMemo(() => {
    const today = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysSinceStart = (today.getTime() - startDate.getTime()) / msPerDay;
    const pixelsPerDay = VIEW_MODE_CONFIG[viewMode].pixelsPerDay;
    return daysSinceStart * pixelsPerDay;
  }, [startDate, viewMode]);

  const isTodayVisible = todayPosition >= 0 && todayPosition <= gridWidth;

  return (
    <div className="relative">
      {/* Time scale header */}
      <div className="flex border-b border-neutral-300 bg-neutral-50 sticky top-0 z-10">
        {/* Left panel spacer */}
        <div
          className="flex-shrink-0 border-r border-neutral-300 px-4 py-3 font-semibold text-neutral-700"
          style={{ width: `${TIMELINE_CONSTANTS.LEFT_PANEL_WIDTH}px` }}
        >
          Timeline
        </div>

        {/* Time intervals */}
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex" style={{ width: `${gridWidth}px` }}>
            {intervals.map((interval, index) => (
              <div
                key={index}
                className={clsx(
                  'flex-shrink-0 border-r border-neutral-200 px-2 py-3 text-sm font-medium text-center',
                  isToday(interval) && 'bg-primary-50 text-primary-700'
                )}
                style={{ width: `${columnWidth}px` }}
                role="columnheader"
              >
                {formatDateLabel(interval, viewMode)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid lines overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ left: `${TIMELINE_CONSTANTS.LEFT_PANEL_WIDTH}px` }}>
        <div className="flex h-full" style={{ width: `${gridWidth}px` }}>
          {intervals.map((_, index) => (
            <div
              key={index}
              className="border-r border-neutral-100"
              style={{ width: `${columnWidth}px` }}
            />
          ))}
        </div>

        {/* Today indicator */}
        {isTodayVisible && (
          <div
            className="absolute top-0 bottom-0 w-0.5 z-10"
            style={{
              left: `${todayPosition}px`,
              backgroundColor: TIMELINE_CONSTANTS.TODAY_LINE_COLOR,
            }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-error-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Today
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

