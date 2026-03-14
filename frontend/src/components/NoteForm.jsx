import { useState } from 'react';
import { Save, X } from 'lucide-react';

const NoteForm = ({ initialData = { title: '', content: '' }, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }
    onSubmit(title, content);
    if (!initialData._id) {
      setTitle('');
      setContent('');
    }
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="Note title"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          placeholder="Write your note..."
        />
      </div>
      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </button>
        )}
        <button
          type="submit"
          className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Save className="h-4 w-4" />
          <span>{initialData._id ? 'Update' : 'Save'} Note</span>
        </button>
      </div>
    </form>
  );
};

export default NoteForm;