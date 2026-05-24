export function createTaskBoard({ title = 'TBD Lab Board', flags } = {}) {
  const tasks = [];

  function addTask(title, options = {}) {
    if (!title || title.trim().length === 0) {
      throw new Error('Task title is required');
    }

    const task = {
      id: tasks.length + 1,
      title: title.trim(),
      done: false,
      hidden: options.hidden === true
    };

    tasks.push(task);
    return task;
  }

  function completeTask(id) {
    const task = tasks.find((item) => item.id === id);

    if (!task) {
      throw new Error(`Task ${id} was not found`);
    }

    task.done = true;
    return task;
  }

  function listTasks() {
    const canShowHiddenTasks = flags?.isEnabled('show-hidden-tasks') === true;
    return tasks.filter((task) => canShowHiddenTasks || !task.hidden);
  }

  function summary() {
    const visibleTasks = listTasks();
    const completed = visibleTasks.filter((task) => task.done).length;

    return {
      title,
      total: visibleTasks.length,
      completed,
      remaining: visibleTasks.length - completed
    };
  }

  return {
    addTask,
    completeTask,
    listTasks,
    summary
  };
}
