import db from "@/lib/config/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const branch = req.nextUrl.searchParams.get("branch");
  const year = req.nextUrl.searchParams.get("year");

  let groups;
  if (branch && year) {
    groups = db
      .prepare("SELECT * FROM groups_table WHERE branch = ? AND year = ?")
      .all(branch, year);
  } else {
    groups = db.prepare("SELECT * FROM groups_table").all();
  }

  return NextResponse.json({ groups });
}

export async function POST(req: NextRequest) {
  const { userId, groupId } = await req.json();

  if (!userId || !groupId) {
    return NextResponse.json(
      { error: "userId and groupId are required" },
      { status: 400 },
    );
  }

  const existing = db
    .prepare("SELECT id FROM group_members WHERE user_id = ? AND group_id = ?")
    .get(userId, groupId);

  if (existing) {
    return NextResponse.json({ error: "Already a member" }, { status: 409 });
  }

  db.prepare("INSERT INTO group_members (user_id, group_id) VALUES (?, ?)").run(
    userId,
    groupId,
  );

  return NextResponse.json({ success: true }, { status: 201 });
}
