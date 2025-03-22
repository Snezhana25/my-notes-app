import { Note } from '../models/note';
import { Database } from 'pouchdb-core';

let db: Database<Note> | null = null;

export async function getDB(): Promise<Database<Note> | null> {
    if (typeof window === 'undefined') return null;

    if (!db) {
        const PouchDBCore = (await import('pouchdb-core')).default;
        const AdapterIDB = (await import('pouchdb-adapter-idb')).default;

        PouchDBCore.plugin(AdapterIDB);
        db = new PouchDBCore<Note>('notesdb', { adapter: 'idb' });
    }

    return db;
}
