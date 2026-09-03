import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../data/api';
import { ArrowLeft, Headphones, Plus } from 'lucide-react';

const STATUS_COLORS = {
  open: { bg: 'bg-amber-50', text: 'text-amber-700' },
  in_progress: { bg: 'bg-blue-50', text: 'text-blue-700' },
  resolved: { bg: 'bg-green-50', text: 'text-green-700' },
};

function Support() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiRequest('/support')
      .then((data) => setTickets(data.tickets))
      .catch((err) => setError(err.message));
  }, []);

  const handleCreate = async () => {
    if (!subject.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      const data = await apiRequest('/support', {
        method: 'POST',
        body: JSON.stringify({ subject, message }),
      });
      setTickets((prev) => [data.ticket, ...prev]);
      setSubject('');
      setMessage('');
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-[800px] mx-auto">
        <Link to="/customer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4a5565] hover:text-[#10162b] transition mb-6">
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#10162b]">Support</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f5a623] hover:bg-[#d9820b] text-white text-sm font-bold transition"
          >
            <Plus size={16} />
            New ticket
          </button>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">{error}</div>
        )}

        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <h3 className="text-base font-bold text-[#10162b] mb-4">New support ticket</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#4a5565] mb-1.5">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief description of your issue"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] placeholder-gray-400 outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#4a5565] mb-1.5">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Describe your issue in detail..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#10162b] placeholder-gray-400 outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/15 transition resize-y"
                />
              </div>
              <button
                onClick={handleCreate}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-[#f5a623] hover:bg-[#d9820b] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold transition"
              >
                {submitting ? 'Submitting...' : 'Submit ticket'}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {tickets.length === 0 && !error && (
            <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
              <Headphones size={48} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-lg font-bold text-[#10162b] mb-2">No tickets yet</h2>
              <p className="text-sm text-[#4a5565]">Create a ticket if you need help.</p>
            </div>
          )}
          {tickets.map((ticket) => {
            const colors = STATUS_COLORS[ticket.status] || STATUS_COLORS.open;
            return (
              <div key={ticket.id} className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-[#10162b]">{ticket.subject}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors.bg} ${colors.text}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm text-[#4a5565] mb-2">{ticket.message}</p>
                <small className="text-xs text-gray-400">{new Date(ticket.created_at).toLocaleDateString()}</small>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Support;
