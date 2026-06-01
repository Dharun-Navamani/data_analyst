import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, BrainCircuit, Settings, LogOut, Menu } from 'lucide-react';

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="flex h-full">
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-white border-r border-slate-200 p-6 transition-transform duration-300 lg:relative lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'} lg:block`}>
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BrainCircuit className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-lg font-semibold text-slate-900">AI Dashboard</p>
                <p className="text-sm text-slate-500">Analytics & insights</p>
              </div>
            </div>
            <button className="lg:hidden p-2 rounded-md bg-slate-100" onClick={() => setOpen(false)}>
              <LogOut className="h-5 w-5 text-slate-700" />
            </button>
          </div>

          <nav className="space-y-3">
            <NavLink
              to="/"
              <nav className="space-y-2">
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
                  <LayoutDashboard className="h-5 w-5 text-slate-700" />
                  <span className="ml-2">Dashboard</span>
              to="/insights"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              <BrainCircuit className="h-5 w-5" />
              AI Insights
                  <BrainCircuit className="h-5 w-5 text-slate-700" />
                  <span className="ml-2">AI Insights</span>
              to="/upload"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 10l5-5 5 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 5v12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Data Upload
                  <svg className="h-4 w-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 10l5-5 5 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 5v12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="ml-2">Data Upload</span>

          <div className="mt-auto pt-6 border-t border-slate-100">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-200">
              <LogOut className="h-5 w-5" />
                <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
        </aside>

        <main className="flex-1 lg:ml-72">
          <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur-sm lg:px-8">
              <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/70 px-6 py-4 backdrop-blur-sm lg:px-8">
              <div className="flex items-center gap-3">
                <button
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div className="ml-2 hidden md:block">
                  <p className="text-base font-semibold text-[var(--text-h)]">Welcome back, Admin</p>
                      <p className="text-base font-semibold text-slate-900">Welcome back, Admin</p>
                      <p className="text-sm text-slate-500">Your AI dashboard is ready to explore.</p>
                <div className="ml-4 flex-1">
                  <div className="relative max-w-md">
                    <input placeholder="Search insights, datasets or metrics" className="w-full rounded-2xl border border-slate-100 bg-white px-4 py-2 text-sm shadow-sm focus:outline-none" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100">
                  <Settings className="h-5 w-5" />
                </button>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-sm">
                  A
                </div>
              </div>
            </div>
          </header>

          <div className="min-h-[calc(100vh-86px)] px-6 py-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
