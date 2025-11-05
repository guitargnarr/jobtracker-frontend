/**
 * Applications Page - ENTERPRISE DATA MANAGEMENT SUITE™
 * Full CRUD operations with advanced filtering and search
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Edit2, Trash2, Download, Upload, Zap } from 'lucide-react';
import { getApplications, deleteApplication, createApplication, updateApplication } from '../lib/api';
import { formatDate } from '../lib/utils';
import { getStatusColor, APPLICATION_STATUSES, STATUS_VALUES } from '../lib/constants';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import ApplicationForm from '../components/forms/ApplicationForm';
import { toast } from 'sonner';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterAndSortApplications();
  }, [applications, searchTerm, statusFilter, sortBy, sortOrder]);

  const fetchApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (error) {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortApplications = () => {
    let filtered = [...applications];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.Company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.Position_Title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.Location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.Status === statusFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      let compareA, compareB;

      switch (sortBy) {
        case 'date':
          compareA = new Date(a.Date_Applied || 0);
          compareB = new Date(b.Date_Applied || 0);
          break;
        case 'company':
          compareA = a.Company?.toLowerCase() || '';
          compareB = b.Company?.toLowerCase() || '';
          break;
        case 'status':
          compareA = a.Status?.toLowerCase() || '';
          compareB = b.Status?.toLowerCase() || '';
          break;
        default:
          return 0;
      }

      if (compareA < compareB) return sortOrder === 'asc' ? -1 : 1;
      if (compareA > compareB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredApps(filtered);
  };

  const handleDelete = async (index) => {
    if (!confirm('Delete this application? This action cannot be undone.')) return;

    try {
      await deleteApplication(index);
      toast.success('🗑️ Application deleted successfully');
      fetchApplications();
    } catch (error) {
      toast.error('Failed to delete application');
    }
  };

  const handleCreate = async (formData) => {
    setFormLoading(true);
    try {
      await createApplication(formData);
      toast.success('🎉 Application created successfully!', {
        description: `${formData.Position_Title} at ${formData.Company}`,
      });
      setIsCreateModalOpen(false);
      fetchApplications();
    } catch (error) {
      toast.error('Failed to create application', {
        description: error.response?.data?.detail || 'Please try again',
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = async (formData) => {
    setFormLoading(true);
    try {
      // Find the index of the selected application
      const index = applications.findIndex(app =>
        app.Company === selectedApplication.Company &&
        app.Position_Title === selectedApplication.Position_Title &&
        app.Date_Applied === selectedApplication.Date_Applied
      );

      await updateApplication(index, formData);
      toast.success('✅ Application updated successfully!', {
        description: `${formData.Position_Title} at ${formData.Company}`,
      });
      setIsEditModalOpen(false);
      setSelectedApplication(null);
      fetchApplications();
    } catch (error) {
      toast.error('Failed to update application', {
        description: error.response?.data?.detail || 'Please try again',
      });
    } finally {
      setFormLoading(false);
    }
  };

  const openEditModal = (app) => {
    setSelectedApplication(app);
    setIsEditModalOpen(true);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-black text-slate-600 animate-pulse">
          Loading Career Data Matrix™...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">
            Application Database™
          </h1>
          <p className="text-lg text-slate-600 font-bold mt-2">
            Enterprise-grade career opportunity management system with AI-powered insights
          </p>
        </div>

        <Button
          variant="synergy"
          onClick={() => setIsCreateModalOpen(true)}
          className="text-lg px-6 py-3"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Application
        </Button>
      </motion.div>

      {/* FILTERS & SEARCH */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  🔍 Search Career Touchpoints™
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search company, position, location..."
                    className="w-full pl-10 pr-4 py-2 border-3 border-slate-900 rounded-lg font-medium focus:outline-none focus:ring-4 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  📊 Status Filter
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border-3 border-slate-900 rounded-lg font-bold bg-white focus:outline-none focus:ring-4 focus:ring-blue-500"
                >
                  <option value="all">All Statuses</option>
                  {APPLICATION_STATUSES.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  ⚡ Sort By
                </label>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className="w-full px-4 py-2 border-3 border-slate-900 rounded-lg font-bold bg-white focus:outline-none focus:ring-4 focus:ring-blue-500"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="company-asc">Company A-Z</option>
                  <option value="company-desc">Company Z-A</option>
                  <option value="status-asc">Status A-Z</option>
                  <option value="status-desc">Status Z-A</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-bold text-slate-600">
                Showing <span className="text-blue-600 text-lg">{filteredApps.length}</span> of{' '}
                <span className="text-green-600 text-lg">{applications.length}</span> career touchpoints
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => toast.info('📥 Export Feature', { description: 'CSV export coming soon!' })}
                  className="px-3 py-1.5 text-sm font-bold bg-blue-100 text-blue-700 border-2 border-blue-600 rounded hover:bg-blue-200"
                >
                  <Download className="w-4 h-4 inline mr-1" />
                  Export
                </button>
                <button
                  onClick={() => toast.info('📤 Import Feature', { description: 'CSV import coming soon!' })}
                  className="px-3 py-1.5 text-sm font-bold bg-green-100 text-green-700 border-2 border-green-600 rounded hover:bg-green-200"
                >
                  <Upload className="w-4 h-4 inline mr-1" />
                  Import
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-3 border-slate-900 bg-gradient-to-r from-slate-50 to-slate-100">
                    <th className="px-4 py-3 text-left">
                      <button
                        onClick={() => handleSort('date')}
                        className="font-black text-sm text-slate-900 hover:text-blue-600 flex items-center gap-1"
                      >
                        Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <button
                        onClick={() => handleSort('company')}
                        className="font-black text-sm text-slate-900 hover:text-blue-600 flex items-center gap-1"
                      >
                        Company {sortBy === 'company' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left font-black text-sm text-slate-900">Position</th>
                    <th className="px-4 py-3 text-left font-black text-sm text-slate-900">Location</th>
                    <th className="px-4 py-3 text-left">
                      <button
                        onClick={() => handleSort('status')}
                        className="font-black text-sm text-slate-900 hover:text-blue-600 flex items-center gap-1"
                      >
                        Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left font-black text-sm text-slate-900">Source</th>
                    <th className="px-4 py-3 text-center font-black text-sm text-slate-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map((app, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      className="border-b-2 border-slate-200 hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-semibold text-slate-600">
                        {formatDate(app.Date_Applied)}
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-slate-900">
                        {app.Company || 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-700">
                        {app.Position_Title || 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {app.Location || 'N/A'}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={getStatusColor(app.Status)}>
                          {app.Status?.replace(/_/g, ' ') || 'Unknown'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-600">
                        {app.Source || 'N/A'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditModal(app)}
                            className="p-1.5 bg-blue-100 text-blue-700 border-2 border-blue-600 rounded hover:bg-blue-200 transition-colors"
                            title="Edit application"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="p-1.5 bg-red-100 text-red-700 border-2 border-red-600 rounded hover:bg-red-200 transition-colors"
                            title="Delete application"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {filteredApps.length === 0 && (
                <div className="text-center py-12">
                  <Zap className="w-16 h-16 mx-auto text-slate-300 mb-3" />
                  <p className="text-xl font-black text-slate-400">No applications found</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* CREATE MODAL */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="🚀 Create New Career Touchpoint™"
      >
        <ApplicationForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={formLoading}
        />
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedApplication(null);
        }}
        title="✏️ Update Career Touchpoint™"
      >
        <ApplicationForm
          application={selectedApplication}
          onSubmit={handleEdit}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedApplication(null);
          }}
          isLoading={formLoading}
        />
      </Modal>
    </div>
  );
}
