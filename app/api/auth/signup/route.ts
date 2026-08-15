import db from "@/lib/config/database";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password, branch, year } = await req.json();

  if (!name || !email || !password || !branch || !year) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }

  const existing = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get(email);
  if (existing) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 409 },
    );
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const result = db
    .prepare(
      "INSERT INTO users (name, email, password, branch, year) VALUES (?, ?, ?, ?, ?)",
    )
    .run(name, email, hashedPassword, branch, year);

  return NextResponse.json(
    { id: result.lastInsertRowid, name, email },
    { status: 201 },
  );
}
