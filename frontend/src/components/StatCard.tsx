import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  delta: string;
  icon: LucideIcon;
  colorClass: string;
}

export default function StatCard({ title, value, subtitle, delta, icon: Icon, colorClass }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">{title}</p>
          <p className="mt-3 text-2xl font-bold text-[var(--text-h)]">{value}</p>
          <p className="mt-2 text-xs text-[var(--muted)]">{subtitle}</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className={`rounded-xl p-3 ${colorClass} text-white`}> 
            <Icon className="h-5 w-5" />
          </div>
          <div className="text-sm font-semibold text-[var(--muted)]">{delta}</div>
        </div>
      </div>
    </div>
  );
}
