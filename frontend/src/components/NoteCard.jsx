import { useState } from 'react';
import NoteForm from './NoteForm';

const NoteCard = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (title, content) => {
    onUpdate(note._id, title, content);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="border rounded-lg p-4 bg-white shadow">
        <NoteForm
          initialData={{ title: note.title, content: note.content, _id: note._id }}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{note.content}</p>
      <div className="text-sm text-gray-500 mb-4">
        Created: {new Date(note.createdAt).toLocaleDateString()}
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;