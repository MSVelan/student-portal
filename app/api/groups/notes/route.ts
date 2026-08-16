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
