import db from "@/lib/config/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const timetable = db
    .prepare(
      "SELECT id, day, time_slot, subject FROM timetable WHERE user_id = ? ORDER BY day",
    )
    .all(userId);

  return NextResponse.json({ timetable });
}

export async function POST(req: NextRequest) {
  const { userId, day, timeSlot, subject } = await req.json();

  if (!userId || !day || !timeSlot || !subject) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }

  const result = db
    .prepare(
      "INSERT INTO timetable (user_id, day, time_slot, subject) VALUES (?, ?, ?, ?)",
    )
    .run(userId, day, timeSlot, subject);

  return NextResponse.json(
    { id: result.lastInsertRowid, day, timeSlot, subject },
    { status: 201 },
  );
}
