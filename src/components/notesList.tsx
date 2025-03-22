'use client';

import {Note, NotesListProps} from '../models/note';
import { deleteNote, updateNote } from '../lib/noteService';
import {useState} from "react";
import EditNote from '../components/noteEdit';


export default function NotesList({ notes, onDelete, onEdit }: NotesListProps) {
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleSave = async (updated: Note) => {
        await updateNote(updated);
        onEdit(updated);
        setEditingId(null);
    };

    return (
        <ul className="space-y-4">
            {notes.map(note => (
                <li key={note.id} className="bg-white p-4 rounded shadow relative space-y-2">
                    {editingId === note.id ? (
                        <EditNote
                            note={note}
                            onCancel={() => setEditingId(null)}
                            onSave={handleSave}
                        />
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold">{note.title}</h2>
                            <p>{note.body}</p>

                            <div className="absolute top-2 right-2 space-x-2">
                                <button
                                    onClick={() => setEditingId(note.id)}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={() => deleteNote(note.id).then(() => onDelete(note.id))}
                                    className="text-red-600 hover:text-red-800 text-sm"
                                >
                                    🗑️ Remove
                                </button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    )
}
