# Task Manager API

A simple RESTful API for managing tasks using Node.js, Express.js, and in-memory storage.

## Features

- Create, read, update, and delete tasks
- JSON request/response handling
- Basic error handling for missing fields and resources
- Simple route structure with controllers

## Installation

1. Open a terminal in the project folder:
   `d:\Projects\Airtribe\task-manager-api`
2. Install dependencies:
   `npm install`
3. Start the server:
   `npm start`

## Usage

The API runs on port `3000` by default.

### Endpoints

- `GET /tasks` – list all tasks
- `POST /tasks` – create a new task
- `GET /tasks/:id` – get a task by ID
- `PUT /tasks/:id` – update a task by ID
- `DELETE /tasks/:id` – delete a task by ID

### Example requests

Create a task:

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```

Get all tasks:

```bash
curl http://localhost:3000/tasks
```

Update a task:

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

Delete a task:

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## Notes

- Data is stored in memory and resets when the server restarts.
- This project is a learning example for building Express APIs.
