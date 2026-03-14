import { useState, useEffect } from 'react';
import api from '../utils/api';
import NoteForm from '../components/NoteForm';
import NoteCard from '../components/NoteCard';
import { PlusCircle, Loader } from 'lucide-react';

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
      setNotes([response.data, ...notes]);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Your Notes</h1>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
          {notes.length} {notes.length === 1 ? 'note' : 'notes'}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <PlusCircle className="h-5 w-5 mr-2 text-blue-500" />
          Create New Note
        </h2>
        <NoteForm onSubmit={handleAddNote} />
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {notes.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">No notes yet. Create your first note above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onDelete={handleDeleteNote}
              onUpdate={handleUpdateNote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;