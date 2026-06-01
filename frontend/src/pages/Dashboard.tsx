import { useState, useEffect } from 'react';
import { Activity, ArrowUpRight, DollarSign, LayoutDashboard, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import apiClient from '../api/client';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const statsRes = await apiClient.get('/api/dashboard/stats');
        setStats(statsRes.data);

        const chartRes = await apiClient.get('/api/dashboard/chart-data');
        setChartData(chartRes.data);
      } catch (err) {
        setError('Unable to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statItems = [
    {
      title: 'Total Users',
      value: stats?.total_users || 0,
      subtitle: 'New signups this month',
      delta: '+14.2%',
      icon: Users,
      colorClass: 'bg-blue-600',
    },
    {
      title: 'Active Sessions',
      value: stats?.active_sessions || 0,
      subtitle: 'Live session count',
      delta: '+6.4%',
      icon: Activity,
      colorClass: 'bg-cyan-600',
    },
    {
      title: 'Revenue',
      value: `$${stats?.revenue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? '0.00'}`,
      subtitle: 'Total sales today',
      delta: '+9.1%',
      icon: DollarSign,
      colorClass: 'bg-emerald-600',
    },
    {
      title: 'Growth',
      value: `${stats?.growth ?? 0}%`,
      subtitle: 'Month over month',
      delta: '+2.8%',
      icon: ArrowUpRight,
      colorClass: 'bg-violet-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statItems.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">Performance overview</p>
              <h2 className="mt-2 text-xl font-semibold text-[var(--text-h)]">Growth and user trends</h2>
            </div>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95">
              Refresh metrics
            </button>
          </div>

          {loading ? (
            <div className="mt-8 min-h-[360px] rounded-3xl bg-slate-50 p-6 text-slate-500">Loading analytics...</div>
          ) : error ? (
            <div className="mt-8 rounded-3xl bg-rose-50 p-6 text-rose-700">{error}</div>
          ) : (
            <div className="mt-8 space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-sm">
                  <p className="text-sm text-slate-400">Revenue this month</p>
                  <p className="mt-3 text-2xl font-semibold">${stats?.revenue?.toLocaleString()}</p>
                </div>
                <div className="rounded-3xl bg-indigo-50 p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Active users</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">{stats?.total_users}</p>
                </div>
                <div className="rounded-3xl bg-cyan-50 p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Session growth</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">{stats?.active_sessions}</p>
                </div>
              </div>

              <div className="h-[460px] rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Last 6 months</h3>
                    <p className="text-sm text-slate-500">Track user growth and revenue patterns over time.</p>
                  </div>
                  <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">Updated daily</div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="revenue" stroke="#14b8a6" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-600 p-3 text-white">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Smart summary</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">AI-generated snapshot</h3>
              </div>
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-600">
              The latest dashboard metrics show healthy adoption with rising revenue and active sessions. Focus on onboarding and retention to convert these gains into long-term impact.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">Top KPI</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900">Revenue efficiency</h3>
              </div>
              <div className="rounded-2xl bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700">+9.1%</div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <p>Real-time performance shows strong revenue growth relative to active engagement.</p>
              <p>Next milestone: reduce churn while maintaining conversion velocity.</p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
