import { Note } from '../models/note';
import { getDB } from './db';
import {v4 as uuidv4} from "uuid";

export async function getAllNotes(): Promise<Note[]> {
    const db = await getDB();
    if (!db) return [];

    const result = await db.allDocs({ include_docs: true });
    return result.rows
        .map(row => row.doc)
        .filter((doc): doc is Note => !!doc && 'title' in doc && 'body' in doc);
}

export async function addNoteToDB(noteData: Omit<Note, 'id'>): Promise<Note> {
    const db = await getDB();
    if (!db) throw new Error('DB не ініціалізована');

    const newNote: Note = {
        ...noteData,
        id: uuidv4(),
    };

    await db.put({ ...newNote, _id: newNote.id.toString() });
    return newNote;
}

export async function deleteNote(id: number): Promise<void> {
    const db = await getDB();
    if (!db) return;

    try {
        const note = await db.get(id.toString());
        await db.remove(note)
    } catch (error) {
        console.error('Error:', error)
    }
}

export async function updateNote(updatedNote: Note): Promise<void> {
    const db = await getDB();
    if (!db) return;

    try {
        //get current version
        const existing = await db.get(updatedNote.id);

        const docToUpdate = {
            ...existing,
            ...updatedNote,
            _rev: existing._rev,
        };

        await db.put(docToUpdate)
    } catch (err) {
        console.error('Error:', err);
    }
}
