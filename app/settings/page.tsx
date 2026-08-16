"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const userId = 1; // placeholder until auth/session context is added
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/settings?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setTheme(data.theme);
        setNotifications(!!data.notifications_enabled);
      });
  }, []);

  const handleSave = async () => {
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        theme,
        notificationsEnabled: notifications,
      }),
    });
    setMessage("Settings saved");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <p className="text-sm text-gray-500">Customize your preferencs</p>

      <div className="flex flex-col gap-4 w-72 border rounded-lg p-6 bg-white shadow-sm">
        <label className="flex items-center justify-between">
          <span>Dark theme</span>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          />
        </label>

        <label className="flex items-center justify-between">
          <span>Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
        </label>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white rounded p-2"
        >
          Save
        </button>
        {message && <p className="text-green-600 text-sm">{message}</p>}
      </div>
    </main>
  );
}
