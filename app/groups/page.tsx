"use client";

import { useEffect, useState } from "react";
import GroupCard from "@/components/GroupCard";
import NoteCard from "@/components/NoteCard";

type Group = { id: number; name: string; branch: string; year: number };
type Note = { id: number; content: string; author: string; created_at: string };

export default function GroupsPage() {
  const userId = 1; // placeholder until auth/session context is added
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    fetch("/api/groups")
      .then((res) => res.json())
      .then((data) => setGroups(data.groups));
  }, []);

  const loadNotes = (groupId: number) => {
    setActiveGroup(groupId);
    fetch(`/api/groups/notes?groupId=${groupId}`)
      .then((res) => res.json())
      .then((data) => setNotes(data.notes));
  };

  const handleJoin = async (groupId: number) => {
    await fetch("/api/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, groupId }),
    });
    loadNotes(groupId);
  };

  const handlePostNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGroup) return;
    await fetch("/api/groups/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ groupId: activeGroup, userId, content: noteText }),
    });
    setNoteText("");
    loadNotes(activeGroup);
  };

  return (
    <main className="min-h-screen flex flex-col items-center gap-8 py-10">
      <h1 className="text-2xl font-bold">Groups</h1>

      <div className="w-full max-w-md flex flex-col gap-3">
        {groups.map((g) => (
          <GroupCard key={g.id} group={g} onJoin={handleJoin} />
        ))}
      </div>

      {activeGroup && (
        <div className="w-full max-w-md flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Notes</h2>
          <form onSubmit={handlePostNote} className="flex gap-2">
            <input
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Share a note..."
              className="border rounded p-2 flex-1"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-3"
            >
              Post
            </button>
          </form>
          <div className="flex flex-col gap-2">
            {notes.map((n) => (
              <NoteCard key={n.id} note={n} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
