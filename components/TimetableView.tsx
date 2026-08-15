"use client";

import { useEffect, useState } from "react";

type Entry = { id: number; day: string; time_slot: string; subject: string };

export default function TimetableView({ userId }: { userId: number }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [form, setForm] = useState({ day: "", timeSlot: "", subject: "" });

  const loadTimetable = () => {
    fetch(`/api/dashboard?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setEntries(data.timetable));
  };

  useEffect(() => {
    loadTimetable();
  }, [userId]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, ...form }),
    });
    setForm({ day: "", timeSlot: "", subject: "" });
    loadTimetable();
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/dashboard?id=${id}`, { method: "DELETE" });
    loadTimetable();
  };

  return (
    <div className="w-full max-w-lg flex flex-col gap-4">
      <h2 className="text-xl font-semibold">My Timetable</h2>

      <ul className="flex flex-col gap-2">
        {entries.map((e) => (
          <li
            key={e.id}
            className="border rounded p-3 flex justify-between text-sm"
          >
            <span>{e.day}</span>
            <span>{e.time_slot}</span>
            <span className="font-medium">{e.subject}</span>
            <button
              onClick={() => handleDelete(e.id)}
              className="text-red-500 text-xs"
            >
              Delete
            </button>
          </li>
        ))}
        {entries.length === 0 && (
          <p className="text-gray-500 text-sm">No entries yet.</p>
        )}
      </ul>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          placeholder="Day"
          value={form.day}
          onChange={(e) => setForm({ ...form, day: e.target.value })}
          className="border rounded p-2 flex-1"
          required
        />
        <input
          placeholder="Time"
          value={form.timeSlot}
          onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
          className="border rounded p-2 flex-1"
          required
        />
        <input
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="border rounded p-2 flex-1"
          required
        />
        <button type="submit" className="bg-blue-600 text-white rounded px-3">
          Add
        </button>
      </form>
    </div>
  );
}
