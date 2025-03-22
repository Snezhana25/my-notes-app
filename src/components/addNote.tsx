'use client'

import { useState } from 'react'
import { AddNoteProps } from '../models/note'
import {v4 as uuidv4} from "uuid";

export default function AddNote({ onNoteAdded }: AddNoteProps) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim() || !body.trim()) return

        onNoteAdded({
            id: uuidv4(),
            title,
            body,
            userId: 1
        });

        setTitle('');
        setBody('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-6 space-y-4 border border-gray-200"
        >
            <h2 className="text-xl font-bold text-gray-800">New Note</h2>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
                placeholder="Text"
                value={body}
                onChange={e => setBody(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-32"
            />

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
                Save
            </button>
        </form>
    )
}
