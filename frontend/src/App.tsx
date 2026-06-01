import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AiInsights from './pages/AiInsights';
import DataUpload from './pages/DataUpload';
import Reports from './pages/Reports';
import SavedDashboards from './pages/SavedDashboards';
import Settings from './pages/Settings';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<DataUpload />} />
          <Route path="insights" element={<AiInsights />} />
          <Route path="reports" element={<Reports />} />
          <Route path="saved" element={<SavedDashboards />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
