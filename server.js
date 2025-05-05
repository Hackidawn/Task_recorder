const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// ✅ CORS must be declared before routes
const corsOptions = {
  origin: ['http://localhost:3000', 'https://task-tracker-frontend.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`)))
  .catch(err => console.error(err));
