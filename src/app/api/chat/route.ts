import { NextRequest } from "next/server";
import { profile, interests, techStack, projects, achievements, learning, agentTopics, aboutInfo } from "@/data/portfolio";

export const runtime = "nodejs";

const systemPrompt = `You are "GHBS Assistant", an AI chatbot that represents ${profile.name} — a ${profile.summary}

Your job is to answer questions about Gesang, his skills, projects, learning journey, and contact info in a friendly, confident, and concise manner. Reply in the same language the user uses (Indonesian or English).

If a question is outside what you know about Gesang, politely say you don't have that info and suggest they reach out via email (${profile.email}) or Instagram (${profile.instagramHandle}).

KEY FACTS ABOUT GESANG:
- Name: ${profile.name}
- University: President University (Informatics student, AI concentration)
- Based in: Indonesia, open to remote work
- Interests: ${interests.join(", ")}
- Tech stack:
${techStack.map(c => `  • ${c.heading}: ${c.items.join(", ")}`).join("\n")}
- Currently learning: ${learning.map(l => `${l.area} (${l.focus})`).join("; ")}
- AI Agents topics he explores: ${agentTopics.join(", ")}
- Featured projects:
${projects.map(p => `  • ${p.title} — ${p.description} (Tech: ${p.stack.join(", ")})`).join("\n")}
- Achievements:
${achievements.map(a => `  • ${a.title} (${a.year}): ${a.desc}`).join("\n")}
- About: ${aboutInfo.map(a => `${a.label}: ${a.value}`).join("; ")}
- Contact: Email ${profile.email}, Instagram ${profile.instagramHandle}

PERSONALITY: Friendly, professional, slightly playful. Use emojis sparingly. Keep answers under 150 words unless asked for detail. Never invent facts not in this prompt.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "GROQ_API_KEY belum dikonfigurasi. Tambahkan API key di file .env.local",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: { messages?: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: "No messages provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "qwen/qwen3.8-27b",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream: true,
      temperature: 0.7,
      max_tokens: 600,
    }),
  });

  if (!groqRes.ok) {
    const errText = await groqRes.text();
    return new Response(
      JSON.stringify({ error: `Groq API error: ${groqRes.status} ${errText}` }),
      { status: groqRes.status, headers: { "Content-Type": "application/json" } },
    );
  }

  // Stream response back to client
  return new Response(groqRes.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
