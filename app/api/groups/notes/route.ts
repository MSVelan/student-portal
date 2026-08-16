import db from "@/lib/config/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const groupId = req.nextUrl.searchParams.get("groupId");

  if (!groupId) {
    return NextResponse.json({ error: "groupId is required" }, { status: 400 });
  }

  const notes = db
    .prepare(
      `SELECT notes.id, notes.content, notes.created_at, users.name AS author
       FROM notes JOIN users ON notes.user_id = users.id
       WHERE notes.group_id = ? ORDER BY notes.created_at DESC`,
    )
    .all(groupId);

  return NextResponse.json({ notes });
}

export async function POST(req: NextRequest) {
  const { groupId, userId, content } = await req.json();

  if (!groupId || !userId || !content) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }

  const result = db
    .prepare("INSERT INTO notes (group_id, user_id, content) VALUES (?, ?, ?)")
    .run(groupId, userId, content);

  return NextResponse.json(
    { id: result.lastInsertRowid, content },
    { status: 201 },
  );
}
