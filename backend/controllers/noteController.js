const Note = require('../models/Note');

// @desc    Create a new note
// @route   POST /api/notes
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId; // from auth middleware

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const note = await Note.create({
      userId,
      title,
      content,
    });

    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all notes for the logged in user
// @route   GET /api/notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.userId;

    const note = await Note.findOne({ _id: id, userId });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    await note.save();

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const note = await Note.findOneAndDelete({ _id: id, userId });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createNote, getNotes, updateNote, deleteNote };