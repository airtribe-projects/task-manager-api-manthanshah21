const request = require('supertest');
const app = require('../app');

describe('Task Manager API', () => {
  let taskId;

  it('returns API status on root path', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok', message: 'Task Manager API' });
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Test task', description: 'Test description' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: '1',
      title: 'Test task',
      description: 'Test description',
      completed: false,
    });

    taskId = res.body.id;
  });

  it('should return task list', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get task by id', async () => {
    const res = await request(app).get(`/tasks/${taskId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(taskId);
  });

  it('should update a task', async () => {
    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .send({ completed: true });

    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it('should return 404 for missing task', async () => {
    const res = await request(app).get('/tasks/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Task not found' });
  });

  it('should return 400 for missing title', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ description: 'No title' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Title is required' });
  });

  it('should delete a task', async () => {
    const res = await request(app).delete(`/tasks/${taskId}`);
    expect(res.status).toBe(204);
  });
});
