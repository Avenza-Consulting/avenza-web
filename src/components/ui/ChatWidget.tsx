"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

type Role = "user" | "assistant";
interface Message {
  role: Role;
  content: string;
}

const SUGGESTIONS = [
  "What does Avenza do?",
  "Tell me about your Temenos expertise",
  "How can I get in touch?",
];

// Turn relative paths (/contact) into in-app links and https:// URLs into
// external links, preserving line breaks. Keeps the widget dependency-free.
function renderContent(text: string) {
  const lines = text.split("\n");
  return lines.map((line, li) => {
    const nodes: React.ReactNode[] = [];
    const regex = /(https?:\/\/[^\s<]+|\/[A-Za-z0-9][A-Za-z0-9/_#-]*)/g;
    let last = 0;
    let match: RegExpExecArray | null;
    let key = 0;
    while ((match = regex.exec(line)) !== null) {
      if (match.index > last) nodes.push(line.slice(last, match.index));
      let token = match[0];
      let trailing = "";
      while (/[.,;:!?)]$/.test(token)) {
        trailing = token.slice(-1) + trailing;
        token = token.slice(0, -1);
      }
      if (token.startsWith("http")) {
        nodes.push(
          <a key={`l-${li}-${key++}`} href={token} target="_blank" rel="noopener noreferrer" className="text-amber-soft-text underline underline-offset-2 hover:text-amber">
            {token}
          </a>
        );
      } else {
        nodes.push(
          <Link key={`l-${li}-${key++}`} href={token} className="text-amber-soft-text underline underline-offset-2 hover:text-amber">
            {token}
          </Link>
        );
      }
      if (trailing) nodes.push(trailing);
      last = match.index + match[0].length;
    }
    if (last < line.length) nodes.push(line.slice(last));
    return (
      <span key={`line-${li}`}>
        {nodes}
        {li < lines.length - 1 && <br />}
      </span>
    );
  });
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Keep the latest message in view as it streams in.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  // Focus the input when the panel opens; close on Escape.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 150);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || streaming) return;

    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setError(null);
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "The assistant is unavailable right now.");
      }

      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setStreaming(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with Avi"}
        aria-expanded={open}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-[120] flex h-14 w-14 items-center justify-center rounded-full bg-amber text-on-accent shadow-[0_14px_40px_-10px_rgba(255,138,43,0.7)] ring-1 ring-white/20 sm:bottom-6 sm:right-6"
      >
        {/* Ripple rings emanating from the icon (paused while the panel is open) */}
        {!open && (
          <>
            <span aria-hidden="true" className="chat-ripple pointer-events-none absolute inset-0 rounded-full border-2 border-amber" />
            <span aria-hidden="true" className="chat-ripple pointer-events-none absolute inset-0 rounded-full border-2 border-amber" style={{ animationDelay: "1s" }} />
          </>
        )}

        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="relative z-10">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </motion.svg>
          ) : (
            // The Avenza mark from the cursor, in black.
            <motion.svg key="mark" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.15 }} width="46" height="46" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="relative z-10">
              <path d="M6 13h20L17 22v-5.25z" fill="#0b0b0d" />
            </motion.svg>
          )}
        </AnimatePresence>

        <style jsx>{`
          .chat-ripple {
            animation: chat-ripple 2s ease-out infinite;
          }
          @keyframes chat-ripple {
            0% {
              transform: scale(1);
              opacity: 0.6;
            }
            100% {
              transform: scale(1.7);
              opacity: 0;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .chat-ripple {
              display: none;
            }
          }
        `}</style>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            role="dialog"
            aria-label="Chat with Avi"
            className="fixed bottom-24 right-4 z-[120] flex h-[min(560px,72vh)] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-ink-soft px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber/15 text-amber-soft-text">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15l-1.9-4.1L5.5 9l4.6-1.4L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-bold text-white">Ask Avi</p>
                <p className="truncate text-xs text-text-dim">Avenza&apos;s AI assistant</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-white/5 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 px-3.5 py-2.5 text-sm leading-relaxed text-text-primary">
                    Hi! I&apos;m Avi 👋 Ask me anything about Avenza — our Temenos and core-banking transformation work, capabilities, careers, or how to get in touch.
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-amber/40 hover:text-white">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-tr-sm bg-amber px-3.5 py-2.5 text-sm leading-relaxed text-on-accent"
                        : "max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 px-3.5 py-2.5 text-sm leading-relaxed text-text-primary"
                    }
                  >
                    {m.content ? renderContent(m.content) : <span className="inline-flex gap-1 py-1"><Dot /> <Dot delay={0.15} /> <Dot delay={0.3} /></span>}
                  </div>
                </div>
              ))}

              {error && <p className="text-center text-xs text-red-300">{error}</p>}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-white/10 bg-ink-soft p-3"
            >
              <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-ink px-3 py-2 focus-within:border-amber/40">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  placeholder="Ask about Avenza…"
                  className="max-h-28 flex-1 resize-none bg-transparent text-sm text-text-primary placeholder:text-text-dim focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={streaming || !input.trim()}
                  aria-label="Send message"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber text-on-accent transition-opacity disabled:opacity-40"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 12l16-8-6 8 6 8-16-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-text-dim">Avi can make mistakes — verify important details with our team.</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="inline-block h-1.5 w-1.5 rounded-full bg-text-dim"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
    />
  );
}
