// Seeds the DB with demo users, a project, and a few tasks
require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');

const run = async () => {
  await connectDB();

  await Promise.all([User.deleteMany(), Project.deleteMany(), Task.deleteMany()]);

  const hash = (p) => bcrypt.hashSync(p, 10);

  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@demo.com',
    password: hash('admin123'),
    role: 'admin',
  });
  const john = await User.create({
    name: 'John',
    email: 'john@demo.com',
    password: hash('john123'),
    role: 'member',
  });
  const priya = await User.create({
    name: 'Priya',
    email: 'priya@demo.com',
    password: hash('priya123'),
    role: 'member',
  });

  const project = await Project.create({
    name: 'College Mini Project',
    description: 'Final year mini project tasks',
    createdBy: admin._id,
    members: [john._id, priya._id],
  });

  const today = new Date();
  const yesterday = new Date(today.getTime() - 86400000);
  const nextWeek = new Date(today.getTime() + 7 * 86400000);

  await Task.insertMany([
    {
      title: 'Design database schema',
      description: 'ER diagram + Mongo collections',
      project: project._id,
      assignedTo: john._id,
      createdBy: admin._id,
      dueDate: yesterday,
      priority: 'High',
      status: 'In Progress',
    },
    {
      title: 'Build login screen',
      description: 'React + JWT integration',
      project: project._id,
      assignedTo: priya._id,
      createdBy: admin._id,
      dueDate: nextWeek,
      priority: 'Medium',
      status: 'To Do',
    },
    {
      title: 'Write README',
      project: project._id,
      assignedTo: john._id,
      createdBy: admin._id,
      dueDate: nextWeek,
      priority: 'Low',
      status: 'Done',
    },
  ]);

  console.log('Seed completed ✅');
  console.log('Login as admin@demo.com / admin123');
  process.exit(0);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
