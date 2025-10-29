import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { TimelineTask } from '@/types/timeline.types';
import { Button } from '@/components/primitives/Button';
import { Slider } from '@/components/primitives/Slider';
import { formatDate, formatDateRange } from '@/utils/formatting.utils';

interface TaskDetailSidebarProps {
  task: TimelineTask | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (taskId: string, updates: Partial<TimelineTask>) => void;
  onDelete?: (taskId: string) => void;
  allTasks?: Record<string, TimelineTask>;
}

export const TaskDetailSidebar: React.FC<TaskDetailSidebarProps> = ({
  task,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  allTasks = {},
}) => {
  const [editedTask, setEditedTask] = useState<Partial<TimelineTask>>({});

  useEffect(() => {
    if (task) {
      setEditedTask({
        title: task.title,
        description: task.description,
        progress: task.progress,
        assignee: task.assignee,
        color: task.color,
      });
    }
  }, [task]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!task || !isOpen) return null;

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(task.id, editedTask);
    }
    onClose();
  };

  const handleDelete = () => {
    if (onDelete && window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      onDelete(task.id);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 bg-black transition-opacity z-40',
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 overflow-y-auto',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="complementary"
        aria-label="Task details"
        aria-hidden={!isOpen}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">Task Details</h2>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
              aria-label="Close sidebar"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Task Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Task Name
            </label>
            <input
              type="text"
              value={editedTask.title || ''}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter task name"
            />
          </div>

          {/* Date Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Date Range
            </label>
            <div className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-700">
              {formatDateRange(task.startDate, task.endDate)}
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <Slider
              label="Progress"
              value={editedTask.progress ?? task.progress}
              onChange={(value) => setEditedTask({ ...editedTask, progress: value })}
              min={0}
              max={100}
              step={5}
              showValue={true}
            />
          </div>

          {/* Assignee */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Assignee
            </label>
            <input
              type="text"
              value={editedTask.assignee || ''}
              onChange={(e) => setEditedTask({ ...editedTask, assignee: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter assignee name"
            />
          </div>

          {/* Color */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16'].map(color => (
                <button
                  key={color}
                  className={clsx(
                    'w-10 h-10 rounded-lg border-2 transition-all',
                    (editedTask.color || task.color) === color ? 'border-neutral-900 scale-110' : 'border-transparent'
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => setEditedTask({ ...editedTask, color })}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Description
            </label>
            <textarea
              value={editedTask.description || ''}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-24"
              placeholder="Enter task description"
            />
          </div>

          {/* Dependencies */}
          {task.dependencies && task.dependencies.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Dependencies
              </label>
              <div className="space-y-2">
                {task.dependencies.map(depId => {
                  const depTask = allTasks[depId];
                  return depTask ? (
                    <div key={depId} className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm">
                      {depTask.title}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-neutral-200">
            <Button variant="primary" onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>

          {/* Delete Button */}
          <div className="mt-4">
            <Button variant="danger" onClick={handleDelete} className="w-full">
              Delete Task
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

