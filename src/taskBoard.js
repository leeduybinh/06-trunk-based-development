export function createTaskBoard({ title = 'TBD Lab Board', flags } = {}) {
  const tasks = [];

  const listTasks = () =>
    tasks.filter((task) => flags?.isEnabled('show-hidden-tasks') || !task.hidden);

  return {
    addTask(title, { hidden = false } = {}) {
      if (!title?.trim()) throw new Error('Task title is required');

      const task = {
        id: tasks.length + 1,
        title: title.trim(),
        done: false,
        hidden
      };

      tasks.push(task);
      return task;
    },

    completeTask(id) {
      const task = tasks.find((task) => task.id === id);
      if (!task) throw new Error(`Task ${id} was not found`);

      task.done = true;
      return task;
    },

    listTasks,

    summary() {
      const visibleTasks = listTasks();
      const completed = visibleTasks.filter((task) => task.done).length;

      return {
        title,
        total: visibleTasks.length,
        completed,
        remaining: visibleTasks.length - completed
      };
    }
  };
}