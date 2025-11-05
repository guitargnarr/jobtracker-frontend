/**
 * Main App Component - Synergy Dashboard™ 3000
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </Layout>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'border-2 border-slate-900 shadow-brutal-sm',
          duration: 3000,
        }}
      />
    </BrowserRouter>
  );
}
