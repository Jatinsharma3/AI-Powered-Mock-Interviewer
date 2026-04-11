import { db } from "@/utils/db"
import { MockInterview, UserAnswer } from "@/utils/schema"
import { desc, eq } from "drizzle-orm"

export async function GET() {
  try {
    const interviews = await db
      .select()
      .from(MockInterview)
      .orderBy(desc(MockInterview.id))

    const recent = interviews.slice(0, 10).reverse()

    const finalData = []

    for (const interview of recent) {
      const answers = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interview.mockId))

      if (answers.length > 0) {
        let total = 0

        answers.forEach(ans => {
          const num = Number(String(ans.rating).match(/\d+/)?.[0]) || 0
          total += num
        })

        const avg = Math.round((total / answers.length) * 10) / 10

        finalData.push({
          name: interview.createdAt || "Date",
          rating: avg
        })
      }
    }

    return Response.json(finalData)

  } catch (err) {
    console.error(err)
    return Response.json({ error: "Failed" }, { status: 500 })
  }
}