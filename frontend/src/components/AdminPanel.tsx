import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import {
  CheckCircle,
  Clock,
  LogOut,
  ListChecks,
  Menu,
  X,
  Mail,
  Phone,
  Building,
  IndianRupee,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  { key: 'all', label: 'All Submissions', icon: ListChecks },
  { key: 'pending', label: 'Pending', icon: Clock },
  { key: 'completed', label: 'Completed', icon: CheckCircle },
];

const AdminPanel: React.FC = () => {
  const [activeSection, setActiveSection] = useState('all');
  const [allSubs, setAllSubs] = useState<any[]>([]);
  const [pendingSubs, setPendingSubs] = useState<any[]>([]);
  const [completedSubs, setCompletedSubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const allRes = await axiosInstance.get('/admin/submissions');
        if (allRes.data?.success) setAllSubs(allRes.data.data.submissions);

        const pendRes = await axiosInstance.get('/admin/requests/pending');
        if (pendRes.data?.success) setPendingSubs(pendRes.data.data.requests);

        const compRes = await axiosInstance.get('/admin/requests/completed');
        if (compRes.data?.success) setCompletedSubs(compRes.data.data.requests);

        setError(null);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to fetch submissions.');
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  const markCompleted = async (userId: string) => {
    try {
      const res = await axiosInstance.put(`/admin/requests/${userId}/complete`);
      if (res.data?.success) {
        const completedSub = pendingSubs.find(sub => sub.id === userId);
        setPendingSubs(prev => prev.filter(sub => sub.id !== userId));
        if (completedSub) setCompletedSubs(prev => [completedSub, ...prev]);
        setAllSubs(prev =>
          prev.map(sub =>
            sub.id === userId ? { ...sub, isCompleted: true } : sub
          )
        );
      } else {
        alert('Failed to update status');
      }
    } catch {
      alert('Failed to update status');
    }
  };

  const renderSection = () => {
    if (loading) return <div className="text-center text-green-700 dark:text-green-300">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    let data: any[] = [];
    if (activeSection === 'all') data = allSubs;
    if (activeSection === 'pending') data = pendingSubs;
    if (activeSection === 'completed') data = completedSubs;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.length === 0 ? (
          <div className="text-center col-span-full text-green-700 dark:text-green-300">No submissions found.</div>
        ) : (
          data.map(sub => (
            <div
              key={sub.id}
              className="bg-white dark:bg-green-950 rounded-xl p-5 shadow-md border border-green-200 dark:border-green-700 flex flex-col gap-4 hover:shadow-lg transition-all"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <h2 className="font-semibold text-green-900 dark:text-green-200 break-words text-lg">
                  {sub.name}
                </h2>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200">
                  {activeSection === 'pending'
                    ? 'Pending'
                    : activeSection === 'completed' || sub.isCompleted
                    ? 'Completed'
                    : 'Active'}
                </span>
              </div>

              {/* Info */}
              <div className="text-sm text-green-700 dark:text-green-300 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span
                    className="truncate max-w-[200px] sm:max-w-[250px] md:max-w-[300px]"
                    title={sub.email}
                  >
                    {sub.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span className="truncate max-w-[200px] sm:max-w-[250px] md:max-w-[300px]">
                    {sub.phoneNumber}
                  </span>
                </div>
                {sub.collegeName && (
                  <div className="flex items-center gap-2">
                    <Building size={14} />
                    <span
                      className="truncate max-w-[200px] sm:max-w-[250px] md:max-w-[300px]"
                      title={sub.collegeName}
                    >
                      {sub.collegeName}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <IndianRupee size={14} />
                  <span>₹{sub.budget || 'N/A'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <FileText size={14} className="mt-0.5 flex-shrink-0" />
                  <span
                    className="line-clamp-3 break-words max-w-[250px] sm:max-w-[300px] md:max-w-[350px]"
                    title={sub.projectIdea}
                  >
                    {sub.projectIdea}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-2 text-xs text-green-600 dark:text-green-400">
                <span>{new Date(sub.submittedAt).toLocaleDateString()}</span>
                {activeSection === 'pending' && (
                  <button
                    onClick={() => markCompleted(sub.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-all text-xs"
                  >
                    Mark Completed
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-green-50 dark:bg-black flex flex-col sm:flex-row">
      {/* Mobile Header */}
      <div className="sm:hidden flex justify-between items-center p-4 bg-white dark:bg-green-950 border-b border-green-200 dark:border-green-800">
        <h1 className="text-lg font-bold text-green-900 dark:text-green-200">Admin Panel</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md bg-green-100 dark:bg-green-800"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`sm:w-64 bg-white dark:bg-green-950 border-r border-green-200 dark:border-green-800 p-6 flex flex-col fixed sm:static top-0 left-0 h-full sm:h-auto transform sm:translate-x-0 transition-transform z-50 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
      >
        <h1 className="hidden sm:block text-2xl font-bold text-green-900 dark:text-green-200 mb-8">
          Admin Panel
        </h1>
        <nav className="flex-1 space-y-2">
          {SECTIONS.map(sec => (
            <button
              key={sec.key}
              onClick={() => {
                setActiveSection(sec.key);
                setMenuOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-4 py-3 rounded-lg text-left font-medium transition-all ${
                activeSection === sec.key
                  ? 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-200'
                  : 'text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/50'
              }`}
            >
              <sec.icon className="h-5 w-5" />
              {sec.label}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition-all"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 mt-14 sm:mt-0">
        <h2 className="text-lg sm:text-xl font-bold text-green-900 dark:text-green-200 mb-6 flex items-center gap-2">
          {SECTIONS.find(s => s.key === activeSection)?.label}
        </h2>
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminPanel;
