"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Halo! Saya AI Assistant GHBS. Ada yang ingin Anda tanyakan tentang portofolio, proyek, atau keahlian Gesang?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
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
            // ignore JSON parse errors for incomplete chunks
          }
        }
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Maaf, terjadi kesalahan: ${err.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3.5 bg-cobalt text-bg rounded-full shadow-[0_10px_30px_rgba(0,255,204,0.3)] hover:scale-105 transition-all duration-300 font-mono text-[13px] font-bold cursor-pointer"
          aria-label="Open AI Chat"
        >
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-coral rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-coral rounded-full" />
          <Sparkles className="w-5 h-5" />
          <span>Tanya AI GHBS</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-bg-soft border border-line-strong rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="px-5 py-4 bg-bg border-b border-line flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-cobalt/20 border border-cobalt/40 flex items-center justify-center text-cobalt">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-[18px] text-ink leading-none">GHBS AI Assistant</h3>
                <span className="font-mono text-[11px] text-cobalt flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-cobalt animate-pulse" /> Groq · Llama 3.3
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-ink hover:bg-line transition"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-[14px]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl leading-relaxed ${
                    m.role === "user"
                      ? "bg-cobalt text-bg font-medium rounded-br-none"
                      : "bg-bg border border-line text-ink rounded-bl-none shadow-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-bg border border-line text-muted px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                  <span className="w-2 h-2 bg-cobalt rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-cobalt rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-cobalt rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-3 bg-bg border-t border-line flex items-center gap-2">
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
              className="w-10 h-10 rounded-full bg-cobalt text-bg flex items-center justify-center hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
