# Team Task Manager (MERN)

A full-stack Team Task Manager built as a college project.
Stack: **React + Node.js/Express + MongoDB Atlas + JWT**.

## Features
- Signup / Login with JWT
- Create projects (admin)
- Add / remove project members (admin)
- Create tasks (title, description, due date, priority)
- Assign tasks to users
- Update task status: To Do / In Progress / Done
- Dashboard: total tasks, by status, overdue, per user
- Role based access: `admin` vs `member`

## Folder Structure
```
team-task-manager/
├── backend/
│   ├── config/db.js
│   ├── models/         (User, Project, Task)
│   ├── middleware/     (auth, errorHandler)
│   ├── routes/         (auth, projects, tasks, dashboard)
│   ├── controllers/
│   ├── utils/
│   ├── seed.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/axios.js
    │   ├── context/AuthContext.js
    │   ├── components/   (Navbar, ProtectedRoute, TaskCard)
    │   ├── pages/        (Login, Signup, Dashboard, Projects, ProjectDetail, Tasks)
    │   └── App.js
    ├── package.json
    └── .env.example
```

## Setup (Local)

### 1. Backend
```bash
cd backend
cp .env.example .env     # fill MONGO_URI and JWT_SECRET
npm install
npm run seed             # creates demo users + sample data
npm run dev
```
Backend runs at http://localhost:5001

### 2. Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm start
```
Frontend runs at http://localhost:3000

## Demo Credentials
After running `npm run seed`:

| Role   | Email              | Password   |
|--------|--------------------|------------|
| Admin  | admin@demo.com     | admin123   |
| Member | john@demo.com      | john123    |
| Member | priya@demo.com     | priya123   |

## API Overview
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET  /api/auth/me`
- `GET/POST /api/projects`
- `POST /api/projects/:id/members` (admin)
- `DELETE /api/projects/:id/members/:userId` (admin)
- `GET/POST /api/tasks`
- `PATCH /api/tasks/:id/status`
- `GET /api/dashboard`

## Deploy on Railway

1. Push repo to GitHub.
2. On Railway, create **two services** from the same repo:
   - **backend** — root dir `backend/`, start cmd `npm start`
   - **frontend** — root dir `frontend/`, build cmd `npm run build`, start cmd `npx serve -s build`
3. Add environment variables in Railway:
   - Backend: `MONGO_URI`, `JWT_SECRET`, `PORT=5001`, `CLIENT_URL`
   - Frontend: `REACT_APP_API_URL=https://<backend-railway-url>/api`
4. MongoDB Atlas: whitelist `0.0.0.0/0`, copy connection string into `MONGO_URI`.

That's it 🚀
