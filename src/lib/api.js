/**
 * API Client for Synergy Dashboard™ 3000
 * Connects to FastAPI backend
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance with base config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || error.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

// ============================================================================
// AUTH & STATUS
// ============================================================================

export const getAuthStatus = async () => {
  const { data } = await api.get('/api/auth/status');
  return data;
};

export const setAuthMode = async (mode) => {
  const { data } = await api.post('/api/auth/mode', { mode });
  return data;
};

export const getHealth = async () => {
  const { data } = await api.get('/health');
  return data;
};

// ============================================================================
// APPLICATIONS
// ============================================================================

export const getApplications = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.priority) params.append('priority', filters.priority);
  if (filters.source) params.append('source', filters.source);
  if (filters.company) params.append('company', filters.company);

  const { data } = await api.get(`/api/applications?${params.toString()}`);
  return data;
};

export const getApplication = async (id) => {
  const { data } = await api.get(`/api/applications/${id}`);
  return data;
};

export const createApplication = async (application) => {
  const { data } = await api.post('/api/applications', application);
  return data;
};

export const updateApplication = async (id, updates) => {
  const { data } = await api.put(`/api/applications/${id}`, updates);
  return data;
};

export const deleteApplication = async (id) => {
  const { data } = await api.delete(`/api/applications/${id}`);
  return data;
};

// ============================================================================
// GMAIL INTEGRATION
// ============================================================================

export const triggerGmailScan = async (days = 14) => {
  const { data } = await api.post(`/api/gmail/scan?days=${days}`);
  return data;
};

export const getGmailStatus = async () => {
  const { data } = await api.get('/api/gmail/status');
  return data;
};

// ============================================================================
// ANALYTICS & STATS
// ============================================================================

export const getDashboardStats = async () => {
  const { data } = await api.get('/api/stats/overview');
  return data;
};

export const getTimeline = async (months = 6) => {
  const { data } = await api.get(`/api/stats/timeline?months=${months}`);
  return data;
};

export const getTopCompanies = async () => {
  const { data } = await api.get('/api/stats/companies');
  return data;
};

export const getStatusBreakdown = async () => {
  const { data } = await api.get('/api/stats/status-breakdown');
  return data;
};

export const getSourceBreakdown = async () => {
  const { data } = await api.get('/api/stats/source-breakdown');
  return data;
};

// ============================================================================
// PHISHING
// ============================================================================

export const getPhishingAlerts = async () => {
  const { data } = await api.get('/api/phishing/alerts');
  return data;
};

export default api;
