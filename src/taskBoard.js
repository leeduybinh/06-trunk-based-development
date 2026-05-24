export function createTaskBoard({ title = 'TBD Lab Board', flags } = {}) {
  const tasks = [];

  const addTask = (title, options = {}) => {
    if (!title?.trim()) throw new Error('Task title is required');

    const task = {
      id: tasks.length + 1,
      title: title.trim(),
      done: false,
      hidden: options.hidden === true
    };

    tasks.push(task);
    return task;
  };

  const completeTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) throw new Error(`Task ${id} was not found`);

    task.done = true;
    return task;
  };

  const listTasks = () =>
    tasks.filter(
      (task) => flags?.isEnabled('show-hidden-tasks') || !task.hidden
    );

  const summary = () => {
    const visibleTasks = listTasks();
    const completed = visibleTasks.filter((task) => task.done).length;

    return {
      title,
      total: visibleTasks.length,
      completed,
      remaining: visibleTasks.length - completed
    };
  };

  return { addTask, completeTask, listTasks, summary };
}