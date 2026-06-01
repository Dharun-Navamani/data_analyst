import { Settings2, ShieldCheck } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-violet-600 dark:text-violet-400">Settings</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Workspace preferences</h1>
          </div>
          <button className="rounded-3xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700">
            Save changes
          </button>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="rounded-3xl bg-violet-600 p-3 text-white">
              <Settings2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Theme settings</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Customize the experience for your team.</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Dark mode</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Toggle the interface for low-light environments.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Data security</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">All uploads are stored securely in your backend infrastructure.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center gap-4">
            <div className="rounded-3xl bg-emerald-500 p-3 text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Permissions & access</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage access for team members and roles.</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Admin control</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Grant or revoke access for dashboard contributors.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Control email and in-app reporting alerts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
