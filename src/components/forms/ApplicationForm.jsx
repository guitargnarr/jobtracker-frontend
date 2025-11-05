/**
 * Application Form - Create/Edit Career Touchpoints™
 * Maximum synergy, minimal friction
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Sparkles, Building2, MapPin, Calendar, Link as LinkIcon, FileText } from 'lucide-react';
import Button from '../ui/Button';
import { APPLICATION_STATUSES, SOURCES, PRIORITIES } from '../../lib/constants';
import { toast } from 'sonner';

export default function ApplicationForm({ application = null, onSubmit, onCancel, isLoading = false }) {
  const isEditing = !!application;

  const [formData, setFormData] = useState({
    Company: '',
    Position_Title: '',
    Location: '',
    Date_Applied: new Date().toISOString().split('T')[0],
    Status: 'Application_Sent',
    Source: 'LinkedIn',
    Priority: 'MEDIUM',
    URL: '',
    Notes: '',
    ...application,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.Company?.trim()) {
      newErrors.Company = 'Company name is required';
    }
    if (!formData.Position_Title?.trim()) {
      newErrors.Position_Title = 'Position title is required';
    }
    if (!formData.Date_Applied) {
      newErrors.Date_Applied = 'Application date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Motivational Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-gradient-to-r from-blue-500 to-green-500 border-3 border-slate-900 rounded-lg"
      >
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5" />
          <p className="font-black text-sm">
            {isEditing
              ? '⚡ Optimizing Career Trajectory Data™'
              : '🚀 Creating New Synergy Touchpoint™'}
          </p>
        </div>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            <Building2 className="w-4 h-4 inline mr-1" />
            Company Name *
          </label>
          <input
            type="text"
            name="Company"
            value={formData.Company}
            onChange={handleChange}
            placeholder="e.g., Synergy Corp"
            className={`w-full px-4 py-2 border-3 ${
              errors.Company ? 'border-red-500' : 'border-slate-900'
            } rounded-lg font-medium focus:outline-none focus:ring-4 focus:ring-blue-500`}
          />
          {errors.Company && (
            <p className="text-red-600 text-sm font-semibold mt-1">{errors.Company}</p>
          )}
        </div>

        {/* Position Title */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            <FileText className="w-4 h-4 inline mr-1" />
            Position Title *
          </label>
          <input
            type="text"
            name="Position_Title"
            value={formData.Position_Title}
            onChange={handleChange}
            placeholder="e.g., Chief Synergy Officer"
            className={`w-full px-4 py-2 border-3 ${
              errors.Position_Title ? 'border-red-500' : 'border-slate-900'
            } rounded-lg font-medium focus:outline-none focus:ring-4 focus:ring-blue-500`}
          />
          {errors.Position_Title && (
            <p className="text-red-600 text-sm font-semibold mt-1">{errors.Position_Title}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Location
          </label>
          <input
            type="text"
            name="Location"
            value={formData.Location}
            onChange={handleChange}
            placeholder="e.g., Remote / San Francisco, CA"
            className="w-full px-4 py-2 border-3 border-slate-900 rounded-lg font-medium focus:outline-none focus:ring-4 focus:ring-blue-500"
          />
        </div>

        {/* Date Applied */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Date Applied *
          </label>
          <input
            type="date"
            name="Date_Applied"
            value={formData.Date_Applied}
            onChange={handleChange}
            className={`w-full px-4 py-2 border-3 ${
              errors.Date_Applied ? 'border-red-500' : 'border-slate-900'
            } rounded-lg font-bold bg-white focus:outline-none focus:ring-4 focus:ring-blue-500`}
          />
          {errors.Date_Applied && (
            <p className="text-red-600 text-sm font-semibold mt-1">{errors.Date_Applied}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            📊 Application Status
          </label>
          <select
            name="Status"
            value={formData.Status}
            onChange={handleChange}
            className="w-full px-4 py-2 border-3 border-slate-900 rounded-lg font-bold bg-white focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            {APPLICATION_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Source */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            🌐 Application Source
          </label>
          <select
            name="Source"
            value={formData.Source}
            onChange={handleChange}
            className="w-full px-4 py-2 border-3 border-slate-900 rounded-lg font-bold bg-white focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            {SOURCES.map((source) => (
              <option key={source.value} value={source.value}>
                {source.icon} {source.label}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            ⭐ Priority Level
          </label>
          <select
            name="Priority"
            value={formData.Priority}
            onChange={handleChange}
            className="w-full px-4 py-2 border-3 border-slate-900 rounded-lg font-bold bg-white focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            {PRIORITIES.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>

        {/* URL */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            <LinkIcon className="w-4 h-4 inline mr-1" />
            Job Posting URL
          </label>
          <input
            type="url"
            name="URL"
            value={formData.URL}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-4 py-2 border-3 border-slate-900 rounded-lg font-medium focus:outline-none focus:ring-4 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Notes - Full Width */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">
          📝 Notes & Strategic Insights
        </label>
        <textarea
          name="Notes"
          value={formData.Notes}
          onChange={handleChange}
          placeholder="Key stakeholders, interview details, synergy opportunities..."
          rows={4}
          className="w-full px-4 py-2 border-3 border-slate-900 rounded-lg font-medium focus:outline-none focus:ring-4 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t-3 border-slate-200">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" variant="synergy" loading={isLoading}>
          <Save className="w-4 h-4 mr-2" />
          {isEditing ? 'Update Application' : 'Create Application'}
        </Button>
      </div>
    </form>
  );
}
