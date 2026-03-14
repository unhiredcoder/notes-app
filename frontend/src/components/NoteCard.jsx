import { useState } from 'react';
import NoteForm from './NoteForm';
import { Edit2, Trash2, Calendar } from 'lucide-react';

const NoteCard = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (title, content) => {
    onUpdate(note._id, title, content);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="col-span-1">
        <NoteForm
          initialData={{ title: note.title, content: note.content, _id: note._id }}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="p-6 flex-1">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">{note.title}</h3>
        <p className="text-gray-600 mb-4 whitespace-pre-wrap line-clamp-4">{note.content}</p>
        <div className="flex items-center text-sm text-gray-400 mt-auto">
          <Calendar className="h-4 w-4 mr-1" />
          {new Date(note.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3 border-t border-gray-200">
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center space-x-1 text-yellow-600 hover:text-yellow-800 transition"
        >
          <Edit2 className="h-4 w-4" />
          <span className="text-sm font-medium">Edit</span>
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition"
        >
          <Trash2 className="h-4 w-4" />
          <span className="text-sm font-medium">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default NoteCard;