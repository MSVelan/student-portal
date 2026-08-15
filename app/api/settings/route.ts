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
