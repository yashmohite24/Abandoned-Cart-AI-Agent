import { NextResponse } from "next/server";
import { logFeedback } from "@/lib/supabase/server";

type FeedbackBody = {
  name?: string;
  email?: string;
  message?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: FeedbackBody;

  try {
    body = (await request.json()) as FeedbackBody;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name) {
    return NextResponse.json({ ok: false, message: "Name is required." }, { status: 400 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, message: "Enter a valid email address." }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ ok: false, message: "Feedback is required." }, { status: 400 });
  }

  try {
    await logFeedback({ name, email, message });
    return NextResponse.json({ ok: true, message: "Thank you for your feedback." });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "Could not save feedback. Please try again.";
    return NextResponse.json({ ok: false, message: errMessage }, { status: 500 });
  }
}
