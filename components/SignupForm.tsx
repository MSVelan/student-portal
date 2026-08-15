"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    year: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, year: Number(form.year) }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Signup failed");
      return;
    }

    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="border rounded p-2"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="border rounded p-2"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="border rounded p-2"
        required
      />
      <input
        name="branch"
        placeholder="Branch (e.g. CSE)"
        onChange={handleChange}
        className="border rounded p-2"
        required
      />
      <input
        name="year"
        type="number"
        placeholder="Year"
        onChange={handleChange}
        className="border rounded p-2"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white rounded p-2">
        Sign Up
      </button>
    </form>
  );
}
