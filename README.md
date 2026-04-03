# Project Management Utility (MERN)

A full-stack project management application built as part of an internship assignment.

This application demonstrates:
- MERN stack integration (MongoDB, Express, React, Node.js)
- User and task management
- Kanban-style workflow representing SDLC phases
- Task history tracking
- Redux Toolkit for state management
- Basic API security using CORS

---

## 🚀 Features

### Frontend
- Clean homepage with metrics dashboard
- User creation and management
- Task creation with user assignment
- Kanban board with 3 stages:
  - Todo
  - In Progress
  - Done
- Update task status using dropdown
- Delete tasks
- Task history visible on demand
- Toast notifications for actions
- Responsive UI using Tailwind CSS
- State management using Redux Toolkit

---

### Backend
- RESTful API using Express.js
- MongoDB integration using Mongoose
- Separate User and Task schemas
- Tasks linked to assigned users
- Input validation for user and task operations
- CORS-based API security using environment variables

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- React Redux
- Tailwind CSS
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- Mongoose
- dotenv
- cors

### Database
- MongoDB Atlas

---

## 📁 Folder Structure

```
client/
  src/
    components/
    api/
    store/
      user/
      task/

server/
  src/
    controllers/
    routes/
    models/
    DB/
    server.js
```

---

## ⚙️ Local Setup Instructions

### 1. Clone Repository
```
git clone https://github.com/M-ADARSHCHARY/task-management-mitt-arv.git
cd task-management-mitt-arv
```

---

### 2. Setup Backend
```
cd server
npm install
```

Create `.env` file inside `server/`:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
CLIENT_URI=http://localhost:5173
```

Run backend:
```
npm run dev
```

---

### 3. Setup Frontend
Open a new terminal:

```
cd client
npm install
```

Create `.env` file inside `client/`:

```
VITE_API_BACKEND_URL=http://localhost:5000
```

Run frontend:
```
npm run dev
```

---

### 4. Access Application

- Frontend: http://localhost:5173  
- Backend API: http://localhost:5000/api  

---

## 🔗 API Overview

### User APIs
- POST /api/users  
- GET /api/users  
- DELETE /api/users/:id  

### Task APIs
- POST /api/tasks  
- GET /api/tasks  
- PATCH /api/tasks/:taskId  
- DELETE /api/tasks/:taskId  

---

## 🧠 Design Decisions

### Kanban-Based Workflow
A Kanban board was used to clearly represent SDLC stages:
- Todo → In Progress → Done  

---

### Separate User and Task Models
Tasks include an `assignedUser` field linked to users, enabling:
- Clear task ownership  
- Better scalability  

---

### Redux Toolkit for State Management
Redux was used to:
- Avoid prop drilling  
- Manage global state  
- Handle async logic cleanly  

---

### Backend Validation
Validation ensures:
- Valid user assignment  
- Consistent task data  

---

### API Security (CORS)
Access is restricted using:
- `CLIENT_URI` environment variable  

---

## 🚧 Future Improvements

- Authentication & Authorization (JWT)
- Role-based access (Admin, Manager, Developer)
- User-specific dashboards
- Drag-and-drop Kanban board
- Task priority, due dates, and tags
- Search and filtering
- Centralized error handling
- Testing (unit + integration)
- CI/CD pipeline
- Monitoring and logging

---

## 🌐 Deployment

- Backend deployed on Render  
- Frontend deployed on Vercel  

---

## 📌 Notes

This project focuses on building a clean, functional, and scalable full-stack application while maintaining simplicity and readability.
