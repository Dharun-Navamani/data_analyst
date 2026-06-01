import { useState } from 'react';
import { Send, Bot, User, Sparkles, RefreshCcw } from 'lucide-react';
import apiClient from '../api/client';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const suggestions = [
  'What is the revenue trend?',
  'How many users were active this month?',
  'Compare growth in the last quarter.',
];

export default function AiInsights() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Hello! Ask me anything about your dashboard data. For example: "What is the revenue trend?"' }
  ]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSend = async (text?: string) => {
    const message = text || query.trim();
    if (!message) return;

    setQuery('');
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setLoading(true);
    setStatus('Processing your request...');

    try {
      const res = await apiClient.post('/api/ai/analyze', { query: message });
      setMessages(prev => [...prev, { role: 'ai', content: res.data.insight }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I encountered an error while analyzing your data.' }]);
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  const clearChat = () => {
    setMessages([
      { role: 'ai', content: 'Hello! Ask me anything about your dashboard data. For example: "What is the revenue trend?"' }
    ]);
    setStatus('Chat cleared. Ready for a new question.');
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-violet-600 p-3 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">AI insights</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Ask smart questions</h2>
          </div>
        </div>

        <p className="mt-6 text-sm leading-7 text-slate-600">
          Use natural language to explore your metrics, growth patterns, and revenue health. The assistant can help turn dashboard numbers into action items.
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">Quick prompts</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSend(suggestion)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-700">Tips</p>
              <button onClick={clearChat} className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100">
                <RefreshCcw className="h-4 w-4" /> Clear chat
              </button>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>• Ask about trends in revenue, user count, or active sessions.</li>
              <li>• Use comparison prompts to get side-by-side insights.</li>
              <li>• Ask for growth recommendations to drive product decisions.</li>
            </ul>
          </div>
        </div>
      </aside>

      <section className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">AI Data Assistant</h3>
            <p className="text-sm text-slate-500">Ask natural language questions and get quick insights from your dashboard.</p>
          </div>
          {status && <p className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700">{status}</p>}
        </div>

        <div className="mt-6 flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-violet-700'}`}>
                {msg.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </div>
              <div className={`max-w-[85%] rounded-[30px] border p-4 text-sm leading-6 ${msg.role === 'user' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-800 border-slate-200'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-violet-700">
                <Bot className="h-5 w-5" />
              </div>
              <div className="max-w-[85%] animate-pulse rounded-[30px] bg-slate-100 p-4 text-sm text-slate-500">Thinking...</div>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-3xl bg-slate-50 p-4">
          <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-3">
            <input
              type="text"
              className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              placeholder="Ask a question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={() => handleSend()}
              disabled={!query.trim() || loading}
              className="inline-flex items-center justify-center rounded-2xl bg-violet-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
