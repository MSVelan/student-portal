import db from "@/lib/config/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const settings = db
    .prepare(
      "SELECT theme, notifications_enabled FROM settings WHERE user_id = ?",
    )
    .get(userId);

  return NextResponse.json(
    settings || { theme: "light", notifications_enabled: 1 },
  );
}

export async function PUT(req: NextRequest) {
  const { userId, theme, notificationsEnabled } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  db.prepare(
    `INSERT INTO settings (user_id, theme, notifications_enabled)
     VALUES (?, ?, ?)
     ON CONFLICT(user_id) DO UPDATE SET theme = excluded.theme, notifications_enabled = excluded.notifications_enabled`,
  ).run(userId, theme, notificationsEnabled ? 1 : 0);

  return NextResponse.json({ theme, notificationsEnabled });
}
