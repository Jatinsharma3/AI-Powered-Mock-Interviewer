import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { desc } from "drizzle-orm"

export async function GET() {
  try {
    const interviews = await db
      .select()
      .from(MockInterview)
      .orderBy(desc(MockInterview.id))

    return Response.json(interviews)

  } catch (err) {
    console.error(err)
    return Response.json({ error: "Failed" }, { status: 500 })
  }
}