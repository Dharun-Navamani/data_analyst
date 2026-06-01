import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AiInsights from './pages/AiInsights';
import DataUpload from './pages/DataUpload';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="insights" element={<AiInsights />} />
          <Route path="upload" element={<DataUpload />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
