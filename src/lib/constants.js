/**
 * Constants for Synergy Dashboard™ 3000
 */

// Application Status Options (Full objects for forms)
export const APPLICATION_STATUSES = [
  { value: 'Applied_LinkedIn', label: 'Applied (LinkedIn)', color: 'bg-blue-100 text-blue-800' },
  { value: 'Application_Sent', label: 'Application Sent', color: 'bg-blue-100 text-blue-800' },
  { value: 'Application_Viewed', label: 'Application Viewed', color: 'bg-purple-100 text-purple-800' },
  { value: 'Application_Acknowledged', label: 'Acknowledged', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'Resume_Downloaded', label: 'Resume Downloaded', color: 'bg-cyan-100 text-cyan-800' },
  { value: 'Interview_Invitation', label: 'Interview Invited', color: 'bg-synergy-100 text-synergy-800' },
  { value: 'Assessment_Required', label: 'Assessment Required', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'Rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
  { value: 'PHISHING', label: '⚠️ PHISHING', color: 'bg-red-600 text-white' },
];

// Simple array of status values (for filters)
export const STATUS_VALUES = APPLICATION_STATUSES.map(s => s.value);

// Priority Levels
export const PRIORITIES = [
  { value: 'HIGH', label: 'High Priority', color: 'bg-red-100 text-red-800' },
  { value: 'MEDIUM', label: 'Medium Priority', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'LOW', label: 'Low Priority', color: 'bg-slate-100 text-slate-800' },
];

// Application Sources
export const SOURCES = [
  { value: 'LinkedIn', label: 'LinkedIn', icon: '💼' },
  { value: 'Company Website', label: 'Company Website', icon: '🌐' },
  { value: 'Referral', label: 'Referral', icon: '🤝' },
  { value: 'Email', label: 'Email', icon: '📧' },
  { value: 'Indeed', label: 'Indeed', icon: '🔍' },
  { value: 'Other', label: 'Other', icon: '📝' },
];

// Corporate Humor Tooltips
export const SYNERGY_TOOLTIPS = [
  "Optimizing synergy matrices...",
  "Leveraging paradigm shifts...",
  "Disrupting the status quo...",
  "Thinking outside the box...",
  "Moving the needle forward...",
  "Circling back on action items...",
  "Touching base with stakeholders...",
  "Deep diving into analytics...",
  "Cascading KPIs downstream...",
  "Aligning with strategic initiatives...",
];

// Konami Code Sequence
export const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

// Status color helper
export const getStatusColor = (status) => {
  const statusObj = APPLICATION_STATUSES.find(s => s.value === status);
  return statusObj?.color || 'bg-slate-100 text-slate-800';
};

// Priority color helper
export const getPriorityColor = (priority) => {
  const priorityObj = PRIORITIES.find(p => p.value === priority);
  return priorityObj?.color || 'bg-slate-100 text-slate-800';
};

// Source icon helper
export const getSourceIcon = (source) => {
  const sourceObj = SOURCES.find(s => s.value === source);
  return sourceObj?.icon || '📝';
};
