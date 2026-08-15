import db from "@/lib/config/database";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 },
    );
  }

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as
    | { id: number; name: string; email: string; password: string }
    | undefined;

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({ id: user.id, name: user.name, email: user.email });
}
