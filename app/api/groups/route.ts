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
