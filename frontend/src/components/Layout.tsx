import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, BrainCircuit, Settings, LogOut } from 'lucide-react';

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <BrainCircuit className="w-8 h-8" />
            AI Dashboard
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-700 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link to="/insights" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
            <BrainCircuit className="w-5 h-5" />
            <span className="font-medium">AI Insights</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Welcome back, Admin</h2>
          <div className="flex items-center gap-4">
             <button className="p-2 hover:bg-gray-100 rounded-full">
               <Settings className="w-5 h-5 text-gray-600" />
             </button>
             <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
               A
             </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
