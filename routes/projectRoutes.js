const express = require('express');
const router = express.Router();
const { createProject, getProjects } = require('../controllers/projectController');
const auth = require('../middleware/authMiddleware');
const { validateProject } = require('../middleware/validate');

router.post('/', auth, validateProject, createProject);
router.get('/', auth, getProjects);

module.exports = router;
