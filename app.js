const express = require('express');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Task Manager API' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Task Manager API running on port ${PORT}`);
  });
}

module.exports = app;
