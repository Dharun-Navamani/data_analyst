import { useState, useEffect } from 'react';
import { BarChart3, Sparkles, ShieldCheck, Archive } from 'lucide-react';
import { AreaChart, Area, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import apiClient from '../api/client';
import StatCard from '../components/StatCard';

const demoStatCards = [
  {
    title: 'Total Records',
    value: '12.4K',
    subtitle: 'Uploaded datasets',
    delta: '+18%',
    icon: Archive,
    colorClass: 'bg-violet-600',
  },
  {
    title: 'Total Columns',
    value: '37',
    subtitle: 'Fields analyzed',
    delta: '+4%',
    icon: BarChart3,
    colorClass: 'bg-sky-600',
  },
  {
    title: 'Missing Values',
    value: '1.2%',
    subtitle: 'Detected issues',
    delta: '-8%',
    icon: ShieldCheck,
    colorClass: 'bg-emerald-600',
  },
  {
    title: 'Data Quality',
    value: '92%',
    subtitle: 'Cleanliness score',
    delta: '+12%',
    icon: Sparkles,
    colorClass: 'bg-fuchsia-600',
  },
];

const insightList = [
  'Revenue increased 22% over the last quarter.',
  'Most sales occurred in March with a strong upward trend.',
  '3 outliers detected in customer segmentation.',
  'Customer retention is improving month over month.',
];

const donutData = [
  { name: 'Desktop', value: 52, color: '#8b5cf6' },
  { name: 'Mobile', value: 34, color: '#3b82f6' },
  { name: 'Tablet', value: 14, color: '#22c55e' },
];

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
        setChartData(chartRes.data.map((row: any) => ({ ...row, revenue: Number(row.revenue) })));
      } catch (err) {
        setError('Unable to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-50px_rgba(113,76,240,0.35)] dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.4em] text-violet-600 dark:text-violet-400">AI Analytics Platform</p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">Data-driven intelligence for modern teams.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
              Monitor performance, visualize trends, and ask your data questions with a built-in AI assistant — all from one polished analytics workspace.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:w-[420px]">
            <div className="rounded-3xl bg-violet-600 p-6 text-white shadow-xl shadow-violet-500/20">
              <p className="text-sm uppercase tracking-[0.25em] text-violet-100/80">Forecast</p>
              <p className="mt-4 text-3xl font-semibold">+18.4%</p>
              <p className="mt-2 text-sm text-violet-100/80">Projected recurring growth</p>
            </div>
            <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-900/20">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Quality</p>
              <p className="mt-4 text-3xl font-semibold">92%</p>
              <p className="mt-2 text-sm text-slate-400">Trusted AI data scoring</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-4">
        {demoStatCards.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.8fr_1.2fr]">
        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Revenue summary</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Usage & revenue trend</h2>
            </div>
            <button className="inline-flex items-center justify-center rounded-3xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-700">
              Refresh data
            </button>
          </div>

          {loading ? (
            <div className="mt-8 h-[360px] rounded-[28px] bg-slate-100 p-6 dark:bg-slate-900">
              <div className="animate-pulse space-y-4">
                <div className="h-6 w-1/3 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="h-64 rounded-[28px] bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          ) : error ? (
            <div className="mt-8 rounded-[28px] bg-rose-50 p-6 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">{error}</div>
          ) : (
            <div className="mt-8 space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-[28px] bg-slate-950 p-5 text-white shadow-xl shadow-slate-900/20">
                  <p className="text-sm text-slate-400">Revenue this month</p>
                  <p className="mt-4 text-3xl font-semibold">${stats?.revenue?.toLocaleString()}</p>
                </div>
                <div className="rounded-[28px] bg-slate-50 p-5 shadow-sm dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Active users</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{stats?.total_users}</p>
                </div>
                <div className="rounded-[28px] bg-slate-50 p-5 shadow-sm dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Session growth</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{stats?.active_sessions}</p>
                </div>
              </div>

              <div className="h-[420px] rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4338ca" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#4338ca" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} />
                    <CartesianGrid strokeDasharray="4 4" opacity={0.2} vertical={false} />
                    <Tooltip formatter={(value) => (typeof value === 'number' ? `$${value.toLocaleString()}` : String(value))} />
                    <Area type="monotone" dataKey="revenue" stroke="#4338ca" strokeWidth={3} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">AI insights</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">Key Analytics Highlights</h2>
              </div>
              <div className="rounded-3xl bg-violet-100 px-3 py-2 text-xs font-semibold text-violet-700 dark:bg-violet-950/30 dark:text-violet-300">Powered by AI</div>
            </div>
            <ul className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
              {insightList.map((insight) => (
                <li key={insight} className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    ✓
                  </span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Channel mix</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">Traffic distribution</h3>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Last 30 days</div>
            </div>
            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={donutData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={88} paddingAngle={4}>
                    {donutData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              {donutData.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <span className="inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </span>
                  <span>{item.value}%</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
