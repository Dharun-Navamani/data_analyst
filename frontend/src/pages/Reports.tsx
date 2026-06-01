import { BarChart3, PieChart, ArrowUpRight } from 'lucide-react';

export default function Reports() {
  const cards = [
    { title: 'Monthly Revenue', value: '$84.2K', change: '+14%', icon: ArrowUpRight },
    { title: 'Report Views', value: '12.3K', change: '+6.7%', icon: BarChart3 },
    { title: 'Saved Dashboards', value: '8', change: '+20%', icon: PieChart },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-violet-600 dark:text-violet-400">Reports</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Explore your latest dashboards</h1>
          </div>
          <button className="rounded-3xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700">
            Create new report
          </button>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{card.title}</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{card.value}</p>
              </div>
              <card.icon className="h-8 w-8 text-violet-600" />
            </div>
            <p className="mt-4 text-sm text-emerald-600">{card.change} since last month</p>
          </div>
        ))}
      </div>

      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Report Overview</h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Browse ready-made reports and customize them for your AI analytics workflows.</p>
      </section>
    </div>
  );
}
