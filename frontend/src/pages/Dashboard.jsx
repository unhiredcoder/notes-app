import { useState, useEffect } from 'react';
import api from '../utils/api';
import NoteForm from '../components/NoteForm';
import NoteCard from '../components/NoteCard';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotes = async () => {
    try {
      const response = await api.get('/notes');
      setNotes(response.data);
    } catch (err) {
      setError('Failed to load notes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async (title, content) => {
    try {
      const response = await api.post('/notes', { title, content });
      setNotes([response.data, ...notes]); // Add new note to top
    } catch (err) {
      console.error(err);
      alert('Failed to create note');
    }
  };

  const handleUpdateNote = async (id, title, content) => {
    try {
      const response = await api.put(`/notes/${id}`, { title, content });
      setNotes(notes.map((note) => (note._id === id ? response.data : note)));
    } catch (err) {
      console.error(err);
      alert('Failed to update note');
    }
  };

  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete note');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading notes...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Notes</h1>
      <NoteForm onSubmit={handleAddNote} />
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onDelete={handleDeleteNote}
            onUpdate={handleUpdateNote}
          />
        ))}
        {notes.length === 0 && !loading && (
          <p className="text-gray-500 col-span-full text-center">No notes yet. Create one!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;