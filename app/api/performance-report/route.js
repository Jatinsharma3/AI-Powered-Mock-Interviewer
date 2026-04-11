import { db } from "@/utils/db"
import { MockInterview, UserAnswer } from "@/utils/schema"
import { desc, eq } from "drizzle-orm"
import { generateInterview } from "@/utils/GeminiAiModel"

export async function POST() {
  try {
    const interviews = await db
      .select()
      .from(MockInterview)
      .orderBy(desc(MockInterview.id))

    if (interviews.length === 0) {
      return Response.json({
        report: "Please complete at least one interview."
      })
    }

    const recent = interviews.slice(0, 3)

    let compiledData = ""

    for (const interview of recent) {
      const answers = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interview.mockId))

      compiledData += `\nRole: ${interview.jobPosition}\n`

      answers.forEach(ans => {
        compiledData += `Q: ${ans.question}
A: ${ans.userAns}
Feedback: ${ans.feedback}
Rating: ${ans.rating}\n\n`
      })
    }

    const prompt = `Analyze this interview data and give strengths and weaknesses:\n${compiledData}`

    const result = await generateInterview(prompt)

    return Response.json({ report: result })

  } catch (err) {
    console.error(err)
    return Response.json({ error: "Failed" }, { status: 500 })
  }
}