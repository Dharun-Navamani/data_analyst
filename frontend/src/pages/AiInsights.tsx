import { useState } from 'react';
import { Send, Bot, User, Sparkles, RefreshCcw, MessageSquare, Zap } from 'lucide-react';
import apiClient from '../api/client';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const suggestions = [
  'What is the revenue trend?',
  'How many users were active this month?',
  'Compare growth in the last quarter.',
  'Which segment shows the best retention?',
];

const aiHighlights = [
  'Revenue increased 22% compared to last quarter.',
  'Most sales occurred in March and April.',
  '3 outliers detected across the dataset.',
  'Customer retention is improving steadily.',
];

export default function AiInsights() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content:
        'Hello! Ask me anything about your dashboard data. For example: "What is the revenue trend?"',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text?: string) => {
    const message = (text || query).trim();
    if (!message) return;

    setQuery('');
    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setLoading(true);

    try {
      const res = await apiClient.post('/api/ai/analyze', { query: message });
      setMessages((prev) => [...prev, { role: 'ai', content: res.data.insight }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'ai', content: 'Sorry, I encountered an error while analyzing your data.' }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'ai',
        content:
          'Hello! Ask me anything about your dashboard data. For example: "What is the revenue trend?"',
      },
    ]);
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <aside className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center gap-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-600 text-white shadow-lg shadow-violet-500/20">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-violet-600 dark:text-violet-400">AI insights</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">Ask the assistant anything</h2>
            </div>
          </div>

          <p className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Use natural language to explore your performance data. The assistant interprets your dashboards, identifies patterns, and summarizes opportunities.
          </p>

          <div className="mt-8 grid gap-4">
            {aiHighlights.map((highlight) => (
              <div key={highlight} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">✓</span>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{highlight}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[28px] bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 p-6 text-white shadow-xl shadow-violet-500/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-violet-100/80">Ready to ask</p>
                <h3 className="mt-3 text-xl font-semibold">Need a data recommendation?</h3>
              </div>
              <Zap className="h-8 w-8 text-white" />
            </div>
            <p className="mt-4 text-sm leading-6 text-violet-100/85">
              Ask the assistant about trends, anomalies, or predictions to surface the most important story behind your numbers.
            </p>
          </div>
        </aside>

        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">AI Chat Assistant</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Ask questions about your data and receive instant analytics summaries.
              </p>
            </div>
            <button
              type="button"
              onClick={clearChat}
              className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <RefreshCcw className="h-4 w-4" /> Reset chat
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${msg.role === 'user' ? 'bg-violet-600 text-white' : 'bg-slate-100 text-violet-700 dark:bg-slate-900 dark:text-violet-300'}`}>
                  {msg.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                </div>
                <div className={`max-w-[85%] rounded-[30px] border p-4 text-sm leading-6 ${msg.role === 'user' ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-200 bg-slate-50 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {loading && (
            <div className="mt-4 flex gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-violet-700 dark:bg-slate-900 dark:text-violet-300">
                <Bot className="h-5 w-5" />
              </div>
              <div className="max-w-[85%] animate-pulse rounded-[30px] bg-slate-100 p-4 text-sm text-slate-500 dark:bg-slate-900 dark:text-slate-500">Thinking...</div>
            </div>
          )}

          <div className="mt-6 rounded-[28px] bg-slate-50 p-4 dark:bg-slate-900">
            <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
              <input
                type="text"
                className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                placeholder="Ask AI about your data..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!query.trim() || loading}
                className="inline-flex h-11 items-center justify-center rounded-3xl bg-violet-700 px-5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <p className="text-xs uppercase tracking-[0.35em] text-violet-600 dark:text-violet-400">Suggested prompts</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {suggestions.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSend(prompt)}
                className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-900 transition hover:border-violet-300 hover:bg-violet-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-violet-500 dark:hover:bg-slate-800"
              >
                <MessageSquare className="h-5 w-5 text-violet-600" />
                {prompt}
              </button>
            ))}
          </div>
        </section>

        <aside className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">AI companion</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">Floating assistant</h3>
            </div>
            <Zap className="h-6 w-6 text-violet-600" />
          </div>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            Use the assistant to translate dashboard metrics into strategy, spot anomalies, and generate executive summaries.
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Try it out</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">"What pace of growth should we expect next quarter?"</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Hint</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Ask for comparisons, segmentation, or anomaly detection insights.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
