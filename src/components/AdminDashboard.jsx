import React, { useEffect, useMemo, useState } from 'react';

const statuses = ['New', 'Reviewing', 'Interview', 'Hired', 'Rejected'];

function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [applications, setApplications] = useState([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadApplications = async () => {
    const response = await fetch('/api/admin/applications');
    if (response.status === 401) {
      setAuthenticated(false);
      return;
    }
    if (!response.ok) throw new Error('Could not load applications');
    setApplications(await response.json());
  };

  useEffect(() => {
    if (authenticated) loadApplications().catch((err) => setError(err.message));
  }, [authenticated]);

  const login = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });
      if (!response.ok) throw new Error((await response.json()).error || 'Login failed');
      setPassword('');
      setAuthenticated(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    const response = await fetch(`/api/admin/applications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      setError('Could not update application status.');
      return;
    }
    const updated = await response.json();
    setApplications((current) => current.map((application) => application.id === id ? updated : application));
  };

  const filtered = useMemo(() => applications.filter((application) => {
    const haystack = `${application.firstName} ${application.lastName} ${application.email} ${application.jobTitle}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (statusFilter === 'All' || application.status === statusFilter);
  }), [applications, query, statusFilter]);

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#f4f6f8] flex items-center justify-center p-4">
        <form onSubmit={login} className="bg-white w-full max-w-md rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-md bg-[#008080] flex items-center justify-center text-white font-bold">T</div>
            <div><p className="text-[#17263d] font-bold text-lg tracking-wider">technumen</p><p className="text-xs text-gray-400">Recruiter portal</p></div>
          </div>
          <h1 className="text-2xl font-bold text-[#17263d] mb-2">Admin sign in</h1>
          <p className="text-sm text-gray-500 mb-6">Review and manage candidate applications.</p>
          <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="admin-password">Password</label>
          <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required autoFocus className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]/30 focus:border-[#008080]" />
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="w-full mt-6 py-3 bg-[#008080] hover:bg-[#006666] disabled:opacity-60 text-white font-semibold rounded-lg">{loading ? 'Signing in…' : 'Sign in'}</button>
          <a href="/" className="block text-center mt-5 text-sm text-[#008080] hover:underline">Back to careers site</a>
        </form>
      </main>
    );
  }

  const counts = statuses.reduce((result, status) => ({ ...result, [status]: applications.filter((application) => application.status === status).length }), {});

  return (
    <main className="min-h-screen bg-[#f4f6f8]">
      <header className="bg-[#17263d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div><p className="font-bold tracking-widest">TECHNUMEN</p><p className="text-xs text-gray-400 mt-1">Recruiter dashboard</p></div>
          <button onClick={async () => { await fetch('/api/admin/logout', { method: 'POST' }); setAuthenticated(false); }} className="text-sm text-gray-300 hover:text-white">Sign out</button>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-7">
          <div><p className="text-[#008080] text-xs font-bold tracking-widest uppercase">Talent pipeline</p><h1 className="text-3xl font-bold text-[#17263d] mt-2">Applications</h1></div>
          <button onClick={() => loadApplications().catch((err) => setError(err.message))} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#17263d] hover:border-[#008080]">Refresh</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-7">
          {statuses.map((status) => <button key={status} onClick={() => setStatusFilter(status)} className={`bg-white rounded-lg border p-4 text-left ${statusFilter === status ? 'border-[#008080] ring-1 ring-[#008080]' : 'border-gray-100'}`}><p className="text-2xl font-bold text-[#17263d]">{counts[status] || 0}</p><p className="text-xs text-gray-500 mt-1">{status}</p></button>)}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search candidates or roles…" className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#008080]" />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600"><option>All</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select>
          </div>
          {error && <p className="m-4 text-sm text-red-600">{error}</p>}
          {filtered.length === 0 ? <div className="p-12 text-center text-gray-500 text-sm">No applications found.</div> : <div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500"><tr><th className="px-5 py-3">Candidate</th><th className="px-5 py-3">Position</th><th className="px-5 py-3">Submitted</th><th className="px-5 py-3">Resume</th><th className="px-5 py-3">Status</th></tr></thead><tbody className="divide-y divide-gray-100">{filtered.map((application) => <tr key={application.id} className="hover:bg-gray-50"><td className="px-5 py-4"><p className="font-semibold text-[#17263d]">{application.firstName} {application.lastName}</p><a href={`mailto:${application.email}`} className="text-xs text-[#008080] hover:underline">{application.email}</a><p className="text-xs text-gray-400">{application.phone}</p></td><td className="px-5 py-4 text-sm text-gray-700">{application.jobTitle}</td><td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">{formatDate(application.submittedAt)}</td><td className="px-5 py-4 text-xs text-gray-500">{application.resumeName || '—'}{application.linkedin && <a href={application.linkedin} target="_blank" rel="noreferrer" className="block text-[#008080] hover:underline mt-1">LinkedIn ↗</a>}</td><td className="px-5 py-4"><select value={application.status || 'New'} onChange={(event) => updateStatus(application.id, event.target.value)} className="px-2 py-1.5 rounded-md border border-gray-200 text-xs font-semibold text-[#17263d]"><option disabled>Status</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}</tbody></table></div>}
        </div>
      </div>
    </main>
  );
}