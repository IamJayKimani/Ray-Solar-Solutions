import { useEffect, useState } from 'react';
import { apiRequest } from '../../data/api';
import { Mail, MailOpen, Trash2, ArrowLeft, Inbox } from 'lucide-react';
import { Link } from 'react-router-dom';

function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await apiRequest('/admin/messages');
      setMessages(data.messages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id) => {
    try {
      await apiRequest(`/admin/messages/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ is_read: true }),
      });
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: true } : m)));
      if (selected?.id === id) setSelected((prev) => ({ ...prev, is_read: true }));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await apiRequest(`/admin/messages/${id}`, { method: 'DELETE' });
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  const formatDate = (iso) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-8">
      <div className="max-w-[1000px] mx-auto">
        <Link to="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4a5565] hover:text-[#10162b] transition mb-6">
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#10162b]">Messages</h1>
            <p className="text-sm text-[#4a5565] mt-1">
              {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">{error}</div>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <div className="w-8 h-8 border-4 border-[#f5a623] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-[#4a5565] mt-4">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <Inbox size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-bold text-[#10162b] mb-2">No messages yet</h2>
            <p className="text-sm text-[#4a5565]">Messages from the contact form will appear here.</p>
          </div>
        ) : selected ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <button
              onClick={() => { setSelected(null); if (!selected.is_read) markRead(selected.id); }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#4a5565] hover:text-[#10162b] transition mb-4"
            >
              <ArrowLeft size={14} />
              Back to messages
            </button>
            <div className="border-b border-gray-100 pb-4 mb-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#10162b]">{selected.subject}</h2>
                  <p className="text-sm text-[#4a5565] mt-1">
                    From <span className="font-semibold text-[#10162b]">{selected.name}</span> &lt;{selected.email}&gt;
                  </p>
                </div>
                <span className="text-xs text-gray-400">{formatDate(selected.created_at)}</span>
              </div>
            </div>
            <p className="text-sm text-[#10162b] leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            <div className="mt-6 flex gap-3">
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f5a623] hover:bg-[#d9820b] text-white text-sm font-bold transition"
              >
                <Mail size={14} />
                Reply via email
              </a>
              <button
                onClick={() => deleteMessage(selected.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-sm font-bold transition"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => { setSelected(msg); if (!msg.is_read) markRead(msg.id); }}
                className={`bg-white rounded-2xl border p-5 cursor-pointer hover:shadow-md transition ${
                  msg.is_read ? 'border-gray-200' : 'border-[#f5a623]/30 bg-[#f5a623]/[0.02]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-0.5 ${msg.is_read ? 'text-gray-300' : 'text-[#f5a623]'}`}>
                    {msg.is_read ? <MailOpen size={18} /> : <Mail size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h3 className={`text-sm truncate ${msg.is_read ? 'font-medium text-[#4a5565]' : 'font-bold text-[#10162b]'}`}>
                        {msg.subject}
                      </h3>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(msg.created_at)}</span>
                    </div>
                    <p className="text-xs text-[#4a5565]">
                      <span className="font-semibold">{msg.name}</span> &lt;{msg.email}&gt;
                    </p>
                    <p className="text-sm text-[#4a5565] mt-1 truncate">{msg.message}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }}
                    className="text-gray-300 hover:text-red-500 transition shrink-0"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageMessages;
