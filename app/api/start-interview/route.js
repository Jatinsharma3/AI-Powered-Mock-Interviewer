import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  const { mockId } = await req.json();

  const result = await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.mockId, mockId));

  if (!result || result.length === 0) {
    return Response.json({ error: "Not found" });
  }

  return Response.json(result[0]);
}