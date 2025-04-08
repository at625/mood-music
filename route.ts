import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export const runtime = "nodejs"

export async function GET() {
  try {
    console.log("Testing OpenAI API connection")
    console.log("API Key exists:", !!process.env.OPENAI_API_KEY)

    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: "Say hello world",
    })

    return NextResponse.json({ success: true, message: text })
  } catch (error) {
    console.error("OpenAI API test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
