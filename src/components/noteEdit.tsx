'use client';

import { useState } from 'react';
import { EditNoteProps } from '../models/note';


export default function EditNote({ note, onCancel, onSave }: EditNoteProps) {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  const handleSave = () => {
    onSave({ ...note, title, body });
  };

  return (
    <div className="space-y-2">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full px-2 py-1 border rounded"
      />
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        className="w-full px-2 py-1 border rounded resize-none"
      />
      <div className="space-x-2">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          💾 Save
        </button>
        <button
          onClick={onCancel}
          className="text-sm text-gray-500"
        >
          ❌ Remove
        </button>
      </div>
    </div>
  )
}
