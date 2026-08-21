"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  Bot,
  User,
  Dna,
  Terminal,
  RefreshCw,
  Copy,
  Check,
  Zap,
  Layers,
  ArrowRight,
} from "lucide-react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "Calculate thermodynamic melting kinetics for KRAS G12D mutant",
  "Design SpCas9 guide RNAs with NGG PAMs for exon 2 target",
  "Find restriction endonuclease cut sites for EcoRI and BamHI",
  "Explain 3D spatial diffusion transformer architecture in Codex Bio",
];

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "**Codex Bio Autonomous AI Copilot Initialized**.\n\nI am connected to our in-silico biophysics calculations engine, thermodynamic models (SantaLucia 1998), CRISPR guide designers, and restriction digest simulators.\n\n*How can I assist your molecular engineering program today?*",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetch("/api/chat")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          const loaded: Message[] = [];
          for (const item of data.data) {
            if (item.userMessage) {
              loaded.push({
                role: "user",
                content: item.userMessage,
                timestamp: item.timestamp || item.createdAt || new Date().toISOString(),
              });
            }
            if (item.assistantMessage) {
              loaded.push({
                role: "assistant",
                content: item.assistantMessage,
                timestamp: item.timestamp || item.createdAt || new Date().toISOString(),
              });
            }
            if (item.role && item.content) {
              loaded.push({
                role: item.role,
                content: item.content,
                timestamp: item.createdAt || item.timestamp || new Date().toISOString(),
              });
            }
          }
          if (loaded.length > 0) {
            setMessages(loaded);
          }
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content,
          timestamp: data.timestamp || new Date().toISOString(),
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ Error reaching AI compute service: ${err.message}. Please verify network connection or local server.`,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (content: string, idx: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="rounded-2xl bg-surface/80 backdrop-blur-2xl border border-border overflow-hidden shadow-2xl flex flex-col h-[650px]">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-surface-elevated/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-display font-bold text-ink flex items-center gap-2">
              Autonomous Genomics Copilot
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Agent Active
              </span>
            </h3>
            <p className="text-xs font-mono text-ink-muted">
              Live Biophysics Execution Engine · Deterministic Tool Calling
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar bg-void/50">
        {messages.map((msg, idx) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={idx}
              className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs ${
                  isUser
                    ? "bg-blue-600 text-white"
                    : "bg-surface-elevated border border-purple-500/30 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.2)]"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Dna className="w-4 h-4 animate-spin-20s" />}
              </div>

              <div
                className={`max-w-[82%] p-4 rounded-2xl text-xs leading-relaxed transition-all shadow-md relative group ${
                  isUser
                    ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-none font-medium"
                    : "bg-surface/90 border border-border text-ink rounded-tl-none font-sans"
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                {!isUser && (
                  <button
                    onClick={() => handleCopy(msg.content, idx)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-surface-elevated/80 border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity text-ink-muted hover:text-ink"
                    title="Copy response"
                  >
                    {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-surface-elevated border border-purple-500/30 text-purple-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
              <RefreshCw className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl rounded-tl-none bg-surface/90 border border-border text-xs font-mono text-accent-cyan flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
              <span>Querying thermodynamic kinetics and in-silico models...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-3 border-t border-border bg-surface/90 flex items-center gap-2 overflow-x-auto custom-scrollbar">
        <span className="text-[10px] font-mono text-ink-muted flex-shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-accent-cyan" /> Suggested:
        </span>
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 rounded-lg bg-surface-elevated hover:bg-slate-800 border border-white/5 text-[11px] text-ink-muted hover:text-accent-cyan whitespace-nowrap transition-colors flex-shrink-0 font-mono"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <div className="p-4 border-t border-border bg-surface-elevated/70">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask genomics copilot, paste sequence, or request thermodynamic calculations..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-void border border-border text-xs font-sans text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-500/25 transition-all"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
