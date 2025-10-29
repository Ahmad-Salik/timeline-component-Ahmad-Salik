import { TimelineTask, DependencyLine } from '@/types/timeline.types';

/**
 * Calculate dependency line coordinates
 */
export const calculateDependencyLine = (
  fromTask: TimelineTask,
  toTask: TimelineTask,
  fromPosition: { left: number; width: number; top: number },
  toPosition: { left: number; width: number; top: number }
): DependencyLine => {
  // Start from end of predecessor task
  const x1 = fromPosition.left + fromPosition.width;
  const y1 = fromPosition.top + 20; // middle of task bar

  // End at start of dependent task
  const x2 = toPosition.left;
  const y2 = toPosition.top + 20;

  return {
    x1,
    y1,
    x2,
    y2,
    fromTaskId: fromTask.id,
    toTaskId: toTask.id,
  };
};

/**
 * Get all dependencies for a task
 */
export const getTaskDependencies = (
  taskId: string,
  tasks: Record<string, TimelineTask>
): string[] => {
  const task = tasks[taskId];
  return task?.dependencies || [];
};

/**
 * Get all tasks that depend on this task
 */
export const getDependentTasks = (
  taskId: string,
  tasks: Record<string, TimelineTask>
): string[] => {
  return Object.values(tasks)
    .filter(task => task.dependencies?.includes(taskId))
    .map(task => task.id);
};

/**
 * Check if there is a circular dependency
 */
export const hasCircularDependency = (
  taskId: string,
  dependencyId: string,
  tasks: Record<string, TimelineTask>,
  visited: Set<string> = new Set()
): boolean => {
  if (taskId === dependencyId) return true;
  if (visited.has(dependencyId)) return false;

  visited.add(dependencyId);
  const dependencies = getTaskDependencies(dependencyId, tasks);

  for (const depId of dependencies) {
    if (hasCircularDependency(taskId, depId, tasks, visited)) {
      return true;
    }
  }

  return false;
};

/**
 * Get all dependencies in order (topological sort)
 */
export const getDependencyChain = (
  taskId: string,
  tasks: Record<string, TimelineTask>
): string[] => {
  const chain: string[] = [];
  const visited = new Set<string>();

  const visit = (id: string) => {
    if (visited.has(id)) return;
    visited.add(id);

    const dependencies = getTaskDependencies(id, tasks);
    dependencies.forEach(depId => visit(depId));

    chain.push(id);
  };

  visit(taskId);
  return chain;
};

