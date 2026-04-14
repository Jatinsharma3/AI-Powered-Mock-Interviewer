import { GoogleGenAI } from "@google/genai"

const genAI = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY, // ✅ correct for client-side
})

const GEMINI_MODELS = [
  "gemini-1.5-flash",
  "gemini-1.5-pro"
]

/**
 * Groq fallback (optional)
 */
async function generateWithGroq(prompt) {
  const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY

  if (!apiKey) return null

  try {
    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    })

    const data = await resp.json()
    if (!resp.ok) throw new Error(data?.error?.message)

    return data.choices?.[0]?.message?.content
  } catch (e) {
    console.warn("Groq failed:", e.message)
    return null
  }
}

/**
 * Gemini REST fallback
 */
async function generateWithGeminiRest(model, prompt) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  })

  const data = await resp.json()

  if (!resp.ok) {
    throw new Error(data?.error?.message || "Gemini REST error")
  }

  return data?.candidates?.[0]?.content?.parts?.[0]?.text
}

/**
 * Main function
 */
export async function generateInterview(prompt) {
  console.log("AI generation started")

  // ✅ Try Groq first
  const groq = await generateWithGroq(prompt)
  if (groq) return groq

  // ✅ Try Gemini models
  let lastError = null

  for (const model of GEMINI_MODELS) {
    try {
      // SDK call
      try {
        const response = await genAI.models.generateContent({
          model,
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        })

        const text =
          response?.text ||
          response?.candidates?.[0]?.content?.parts?.[0]?.text

        if (text) return text
      } catch {
        // fallback to REST
      }

      const restText = await generateWithGeminiRest(model, prompt)
      if (restText) return restText

    } catch (err) {
      lastError = err
      continue
    }
  }

  throw new Error(
    "All AI models failed. Add GROQ API key or try again later."
  )
}