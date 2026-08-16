type Note = { id: number; content: string; author: string; created_at: string };

export default function NoteCard({ note }: { note: Note }) {
  return (
    <div className="border rounded-lg p-3 bg-white shadow-sm">
      <p className="text-sm">{note.content}</p>
      <p className="text-xs text-gray-400 mt-1">
        {note.author} · {new Date(note.created_at).toLocaleString()}
      </p>
    </div>
  );
}
