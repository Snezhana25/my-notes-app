'use client';

import NotesList from '../components/notesList';
import AddNote from '../components/addNote';
import {Note} from "../models/note";
import {useEffect, useState} from "react";
import {addNoteToDB, getAllNotes} from "../lib/noteService";


export default function HomePage() {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        getAllNotes().then(setNotes).catch(console.error)
    }, []);

    const handleNoteAdded = async (noteData: Omit<Note, 'id'>) => {
        const newNote = await addNoteToDB(noteData);
        setNotes(prev => [...prev, newNote]);
    };

    const handleNoteDeleted = (id: number) => {
        setNotes(prev => prev.filter(note => note.id !== id));
    };

    const handleNoteEdited = (updatedNote: Note) => {
        setNotes(prev =>
            prev.map(note => (note.id === updatedNote.id ? updatedNote : note))
        )
    };

    return (
        <main>
            <h1>📒 All Notes: </h1>
            <AddNote onNoteAdded={handleNoteAdded}/>
            <NotesList
                notes={notes}
                onDelete={handleNoteDeleted}
                onEdit={handleNoteEdited}/>
        </main>
    )
}
