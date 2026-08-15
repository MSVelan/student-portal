import db from "@/lib/config/database";
import { NextResponse } from "next/server";

export async function GET() {
  const tables = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table'")
    .all();
  return NextResponse.json({ status: "ok", tables });
}
