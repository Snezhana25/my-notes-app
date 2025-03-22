export interface Note {
    id: string;
    title: string;
    body: string;
    userId: number;
}

export interface AddNoteProps {
    onNoteAdded: (note: Note) => void
}

export interface NotesListProps {
    notes: Note[];
    onDelete: (id: string) => void;
    onEdit: (note: Note) => void;
}

export interface EditNoteProps {
    note: Note;
    onCancel: () => void;
    onSave: (updatedNote: Note) => void;
}
