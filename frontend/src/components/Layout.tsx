import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  Home,
  FileUp,
  Sparkles,
  Layers,
  Database,
  Settings,
  Bell,
  Menu,
  Search,
  SunMedium,
  Moon,
  ChevronDown,
} from 'lucide-react';

const sidebarItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/upload', label: 'Upload Data', icon: FileUp },
  { to: '/insights', label: 'AI Insights', icon: Sparkles },
  { to: '/reports', label: 'Reports', icon: Layers },
  { to: '/saved', label: 'Saved Dashboards', icon: Database },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('ai-dashboard-theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('ai-dashboard-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      window.localStorage.setItem('ai-dashboard-theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-900/5 transition duration-300 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/95 lg:relative lg:translate-x-0 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <div className="flex items-center justify-between gap-3 pb-6">
            <div>
              <div className="inline-flex items-center gap-3 rounded-3xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-cyan-500 px-4 py-3 text-white shadow-lg shadow-violet-500/20">
                <div className="rounded-2xl bg-white/10 p-2">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-base font-semibold">Apex Analytics</p>
                  <p className="text-xs text-slate-200/80">AI-powered insights</p>
                </div>
              </div>
            </div>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 lg:hidden" onClick={() => setDrawerOpen(false)}>
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/10'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900/80 dark:hover:text-white'
                    }`
                  }
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Workspace</p>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">Marketing Analytics</p>
              </div>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-violet-600 text-white">M</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">Explore your latest dashboards, upload clean datasets, and keep insights within reach.</p>
          </div>
        </aside>

        <main className="flex-1 lg:ml-72">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-xl transition duration-300 dark:border-slate-800 dark:bg-slate-950/90 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
                <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 lg:hidden" onClick={() => setDrawerOpen(true)}>
                  <Menu className="h-5 w-5" />
                </button>
                <div className="rounded-3xl border border-slate-200 bg-slate-100 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
                  <div className="flex items-center gap-3">
                    <Search className="h-4 w-4 text-slate-500" />
                    <input
                      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500 dark:placeholder:text-slate-400"
                      placeholder="Search dashboards, insights, data..."
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                  <Bell className="h-5 w-5" />
                </button>
                <button
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  onClick={() => setDarkMode((prev) => !prev)}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <button className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-violet-600 text-white">AD</span>
                  <span>Admin</span>
                </button>
              </div>
            </div>
          </header>

          <div className="min-h-[calc(100vh-96px)] px-6 py-8 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
