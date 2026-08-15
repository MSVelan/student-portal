"use client";

import { useEffect, useState } from "react";

type Profile = {
  id: number;
  name: string;
  email: string;
  branch: string;
  year: number;
};

export default function ProfileCard({ userId }: { userId: number }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", branch: "", year: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/profile?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setForm({
          name: data.name,
          branch: data.branch,
          year: String(data.year),
        });
      });
  }, [userId]);

  const handleSave = async () => {
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, ...form, year: Number(form.year) }),
    });
    const updated = await res.json();
    setProfile(updated);
    setEditing(false);
    setMessage("Profile updated");
  };

  if (!profile) return <p className="text-gray-500">Loading profile...</p>;

  return (
    <div className="border rounded-lg p-6 w-80 flex flex-col gap-3 bg-white shadow-sm">
      {editing ? (
        <>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border rounded p-2"
          />
          <input
            value={form.branch}
            onChange={(e) => setForm({ ...form, branch: e.target.value })}
            className="border rounded p-2"
          />
          <input
            value={form.year}
            type="number"
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            className="border rounded p-2"
          />
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white rounded p-2"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-gray-500">{profile.email}</p>
          <p className="text-gray-500">
            {profile.branch} — Year {profile.year}
          </p>
          <button
            onClick={() => setEditing(true)}
            className="bg-gray-200 text-gray-800 rounded p-2"
          >
            Edit Profile
          </button>
        </>
      )}
      {message && <p className="text-green-600 text-sm">{message}</p>}
    </div>
  );
}
