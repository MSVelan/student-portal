import db from "@/lib/config/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const user = db
    .prepare("SELECT id, name, email, branch, year FROM users WHERE id = ?")
    .get(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(req: NextRequest) {
  const { userId, name, branch, year } = await req.json();

  if (!userId || !name || !branch || !year) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }

  db.prepare(
    "UPDATE users SET name = ?, branch = ?, year = ? WHERE id = ?",
  ).run(name, branch, year, userId);

  const updated = db
    .prepare("SELECT id, name, email, branch, year FROM users WHERE id = ?")
    .get(userId);

  return NextResponse.json(updated);
}
