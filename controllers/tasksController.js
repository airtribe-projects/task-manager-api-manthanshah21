const tasks = [];

const getTasks = (req, res) => {
  res.json(tasks);
};

const createTask = (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const task = {
    id: String(tasks.length + 1),
    title,
    description: description || '',
    completed: false,
  };

  tasks.push(task);
  res.status(201).json(task);
};

const getTaskById = (req, res) => {
  const task = tasks.find((item) => item.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
};

const updateTask = (req, res) => {
  const task = tasks.find((item) => item.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, description, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
};

const deleteTask = (req, res) => {
  const index = tasks.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.status(204).send();
};

module.exports = {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
