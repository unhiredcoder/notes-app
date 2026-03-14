const express = require('express');
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All note routes are protected
router.use(authMiddleware);

// POST /api/notes
router.post('/', createNote);

// GET /api/notes
router.get('/', getNotes);

// PUT /api/notes/:id
router.put('/:id', updateNote);

// DELETE /api/notes/:id
router.delete('/:id', deleteNote);

module.exports = router;