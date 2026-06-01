import { LayoutDashboard, Star } from 'lucide-react';

const dashboards = [
  { title: 'Executive Summary', description: 'Revenue, churn, and retention metrics in one view.' },
  { title: 'Growth Funnel', description: 'Pipeline progression and conversion performance.' },
  { title: 'Customer Insights', description: 'Retention, segment, and cohort visualization.' },
];

export default function SavedDashboards() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-violet-600 dark:text-violet-400">Saved Dashboards</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Your most important dashboards</h1>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">
            <Star className="h-4 w-4 text-amber-500" /> Create dashboard
          </button>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {dashboards.map((item) => (
          <article key={item.title} className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="rounded-3xl bg-violet-600 p-3 text-white">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{item.title}</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
