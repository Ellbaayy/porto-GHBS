"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "Apa keahlian utamamu?",
  "Ceritakan proyek AI Waste Classification",
  "Bagaimana cara menghubungimu?",
  "Apa yang sedang kamu pelajari?",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Halo! Saya AI Assistant GHBS. Tanyakan apa saja tentang portofolio, proyek, atau keahlian Gesang.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text.trim();
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Gagal terhubung ke AI Assistant");
      }

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const dataStr = trimmed.replace("data:", "").trim();
          if (dataStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(dataStr);
            const token = parsed.choices?.[0]?.delta?.content || "";
            if (token) {
              assistantResponse += token;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: assistantResponse };
                return copy;
              });
            }
          } catch {
            // ignore partial JSON chunks
          }
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Maaf, terjadi kesalahan: ${msg}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-5 py-3.5 bg-ink text-bg border border-line-strong rounded-full shadow-[0_10px_30px_rgba(79,59,34,0.35)] hover:border-accent hover:shadow-[0_10px_30px_rgba(79,59,34,0.5)] hover:-translate-y-0.5 transition-all duration-300 font-mono text-[12px] font-medium tracking-[0.04em] cursor-pointer"
          aria-label="Open AI Chat"
        >
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-coral rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-coral rounded-full" />
          <Sparkles className="w-4 h-4 text-cobalt group-hover:text-coral transition" />
          <span>Tanya AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[calc(100vw-2.5rem)] sm:w-[400px] h-[560px] max-h-[80vh] bg-bg-soft border border-line-strong rounded-[20px] shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden animate-[slideUp_0.35s_cubic-bezier(0.16,1,0.3,1)]">
          {/* Header */}
          <div className="px-5 py-4 bg-bg border-b border-line flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cobalt-soft border border-cobalt/30 flex items-center justify-center text-cobalt">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-[19px] text-ink leading-none">
                  GHBS <span className="text-cobalt">AI</span>
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cobalt animate-pulse" /> Groq · Llama 3.3
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-ink hover:bg-line transition cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-[14px] bg-bg-soft">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-[88%] flex flex-col gap-1">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.08em] ${
                      m.role === "user" ? "text-right text-coral" : "text-cobalt"
                    }`}
                  >
                    {m.role === "user" ? "You" : "GHBS AI"}
                  </span>
                  <div
                    className={`px-4 py-3 leading-relaxed ${
                      m.role === "user"
                        ? "bg-ink text-bg border border-ink rounded-2xl rounded-tr-sm"
                        : "bg-bg text-ink border border-line rounded-2xl rounded-tl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="max-w-[88%] flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-cobalt">
                    GHBS AI
                  </span>
                  <div className="bg-bg border border-line px-4 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-cobalt rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-cobalt rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 bg-cobalt rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions — only show when there is just the initial assistant message */}
            {messages.length === 1 && !isLoading && (
              <div className="pt-2 space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                  Coba tanyakan →
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => sendMessage(s)}
                      className="text-[12px] px-3 py-1.5 border border-line-strong rounded-full text-ink-soft bg-bg hover:border-cobalt hover:text-cobalt transition cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-bg border-t border-line flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya tentang Gesang atau proyeknya..."
              className="flex-1 bg-bg-soft border border-line-strong rounded-full px-4 py-2.5 text-[14px] text-ink placeholder:text-muted focus:outline-none focus:border-cobalt transition"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 rounded-full bg-accent text-bg flex items-center justify-center hover:bg-accent-deep transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-cobalt shrink-0 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
      `}</style>
    </div>
  );
}
