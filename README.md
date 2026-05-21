# 🌟 Team Task Manager (MERN)

A full-stack Team Task Manager built using the MERN stack with JWT authentication, role-based access control, project management, and task tracking features.

---

# 🚀 Live Demo

### Deployed Link
https://team-task-manager-six-tawny.vercel.app

---

# 📂 GitHub Repository

https://github.com/Avichal-AIML/team-task-manager

---

# 📌 Features

✅ User Signup & Login using JWT Authentication  
✅ Role-Based Access Control (Admin & Member)  
✅ Create & Manage Projects  
✅ Add / Remove Project Members  
✅ Create & Assign Tasks  
✅ Task Priority & Due Date Management  
✅ Update Task Status (To Do / In Progress / Done)  
✅ Dashboard Analytics  
✅ Overdue Task Tracking  
✅ Responsive UI  
✅ REST API Architecture  
✅ MongoDB Atlas Integration  
✅ Railway Deployment  

---

# 🛠 Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Context API

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

## Deployment
- Railway
- Vercel
- MongoDB Atlas

---

# 📁 Folder Structure

```bash
team-task-manager/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── seed.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

# ⚙️ Local Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Avichal-AIML/team-task-manager.git
cd team-task-manager
```

---

# 🔹 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
PORT=5001
CLIENT_URL=http://localhost:3000
```

Run backend server:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5001
```

---

# 🔹 Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```text
http://localhost:3000
```

---

# 🌱 Seed Demo Data

To create demo users and sample data:

```bash
cd backend
npm run seed
```

---

# 🔑 Demo Credentials

| Role | Email | Password |
|------|------|------|
| Admin | admin@demo.com | admin123 |
| Member | john@demo.com | john123 |
| Member | priya@demo.com | priya123 |

---

# 📡 API Overview

## Authentication

```http
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
```

## Projects

```http
GET    /api/projects
POST   /api/projects
POST   /api/projects/:id/members
DELETE /api/projects/:id/members/:userId
```

## Tasks

```http
GET   /api/tasks
POST  /api/tasks
PATCH /api/tasks/:id/status
```

## Dashboard

```http
GET /api/dashboard
```

---

# 🌐 Deployment

## Backend Deployment (Railway)

- Create Railway backend service
- Set Root Directory → `backend`

Start Command:

```bash
npm start
```

Add environment variables:

```env
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
PORT=5001
CLIENT_URL=YOUR_FRONTEND_URL
```

---

## Frontend Deployment (Vercel)

Build Command:

```bash
npm run build
```

---

# 🗄 MongoDB Atlas Setup

1. Create MongoDB Atlas Cluster
2. Create Database User
3. Whitelist IP Address:

```text
0.0.0.0/0
```

4. Copy connection string into:

```env
MONGO_URI
```

---

# 👨‍💻 Author

### Avichal Agarwal

📧 Email: 2k22.aiml.2211790@gmail.com  
📍 Kanpur, Uttar Pradesh, India

---

# 📄 License

This project is created for educational and assessment purposes.

---

# ⭐ Support

If you like this project, please give it a ⭐ on GitHub.
