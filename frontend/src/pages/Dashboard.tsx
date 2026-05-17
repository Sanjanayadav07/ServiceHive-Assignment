import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import toast from 'react-hot-toast';

import API from '../services/api';

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
}

const Dashboard = () => {
  const navigate = useNavigate();

  // USER FOR RBAC
  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [search, setSearch] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [status, setStatus] =
    useState('New');

  const [source, setSource] =
    useState('Website');

  // FILTERS
  const [
    filterStatus,
    setFilterStatus,
  ] = useState('');

  const [
    filterSource,
    setFilterSource,
  ] = useState('');

  // PAGINATION
  const [page, setPage] =
    useState(1);

  const [
    totalPages,
    setTotalPages,
  ] = useState(1);

  // FETCH LEADS
  const fetchLeads = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/leads?search=${search}&status=${filterStatus}&source=${filterSource}&page=${page}`
      );

      setLeads(
        res.data.leads || []
      );

      setTotalPages(
        res.data.totalPages
      );
    } catch (error) {
      console.log(
        'Fetch Leads Error:',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ADD LEAD
  const handleAddLead = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await API.post('/leads', {
        name,
        email,
        status,
        source,
      });

      setName('');
      setEmail('');
      setStatus('New');
      setSource('Website');

      fetchLeads();

      toast.success('Lead Added');
    } catch (error) {
      console.log(error);

      toast.error(
        'Failed to add lead'
      );
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.clear();

    navigate('/login');
  };

  // DELETE LEAD
  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        'Are you sure?'
      );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/leads/${id}`
      );

      fetchLeads();

      toast.success(
        'Lead Deleted'
      );
    } catch (error) {
      console.log(error);

      toast.error(
        'Failed to delete lead'
      );
    }
  };

  // UPDATE LEAD
  const handleUpdate = async (
    lead: Lead
  ) => {
    const newName = prompt(
      'Enter New Name',
      lead.name
    );

    const newEmail = prompt(
      'Enter New Email',
      lead.email
    );

    if (!newName || !newEmail)
      return;

    try {
      await API.put(
        `/leads/${lead._id}`,
        {
          name: newName,
          email: newEmail,
        }
      );

      fetchLeads();

      toast.success(
        'Lead Updated'
      );
    } catch (error) {
      console.log(error);

      toast.error(
        'Failed to update lead'
      );
    }
  };

  // DEBOUNCED SEARCH
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads();
    }, 500);

    return () =>
      clearTimeout(timer);
  }, [
    search,
    filterStatus,
    filterSource,
    page,
  ]);

  // STATS
  const totalLeads =
    leads.length;

  const newLeads = leads.filter(
    (lead) =>
      lead.status === 'New'
  ).length;

  const qualifiedLeads =
    leads.filter(
      (lead) =>
        lead.status ===
        'Qualified'
    ).length;

  const lostLeads = leads.filter(
    (lead) =>
      lead.status === 'Lost'
  ).length;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Leads Dashboard
        </h1>
        <p className="text-gray-500">
          Logged in as: {user.role}
        </p>

        <div className="flex gap-3">
          <CSVLink
            data={leads}
            filename="leads.csv"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Export CSV
          </CSVLink>

          <button
            onClick={
              handleLogout
            }
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">
            Total Leads
          </h3>

          <p className="text-2xl font-bold">
            {totalLeads}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">
            New Leads
          </h3>

          <p className="text-2xl font-bold">
            {newLeads}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">
            Qualified
          </h3>

          <p className="text-2xl font-bold">
            {qualifiedLeads}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">
            Lost
          </h3>

          <p className="text-2xl font-bold">
            {lostLeads}
          </p>
        </div>
      </div>

      {/* ADD LEAD FORM */}
      <form
        onSubmit={
          handleAddLead
        }
        className="bg-white p-4 rounded shadow mb-6 grid gap-4"
      >
        <input
          type="text"
          placeholder="Lead Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          required
        />

        <input
          type="email"
          placeholder="Lead Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          required
        />

        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
        >
          <option>New</option>

          <option>
            Contacted
          </option>

          <option>
            Qualified
          </option>

          <option>Lost</option>
        </select>

        <select
          className="border p-2 rounded"
          value={source}
          onChange={(e) =>
            setSource(
              e.target.value
            )
          }
        >
          <option>
            Website
          </option>

          <option>
            Instagram
          </option>

          <option>
            Referral
          </option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Lead
        </button>
      </form>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search Leads"
        className="border p-2 rounded mb-4 w-full"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      {/* FILTERS */}
      <div className="flex gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(
              e.target.value
            )
          }
        >
          <option value="">
            All Status
          </option>

          <option value="New">
            New
          </option>

          <option value="Contacted">
            Contacted
          </option>

          <option value="Qualified">
            Qualified
          </option>

          <option value="Lost">
            Lost
          </option>
        </select>

        <select
          className="border p-2 rounded"
          value={filterSource}
          onChange={(e) =>
            setFilterSource(
              e.target.value
            )
          }
        >
          <option value="">
            All Sources
          </option>

          <option value="Website">
            Website
          </option>

          <option value="Instagram">
            Instagram
          </option>

          <option value="Referral">
            Referral
          </option>
        </select>
      </div>

      {/* LOADING */}
      {loading && (
        <p>Loading...</p>
      )}

      {/* EMPTY */}
      {!loading &&
        leads.length === 0 && (
          <p>
            No Leads Found
          </p>
        )}

      {/* LEADS */}
      <div className="grid gap-4">
        {leads.map((lead) => (
          <div
            key={lead._id}
            className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg">
              {lead.name}
            </h2>

            <p>{lead.email}</p>

            <p>
              Status:{' '}
              {lead.status}
            </p>

            <p>
              Source:{' '}
              {lead.source}
            </p>

            <p className="text-sm text-gray-500">
              {new Date(
                lead.createdAt
              ).toLocaleDateString()}
            </p>

            {/* ADMIN ONLY */}
            {user.role ===
              'admin' && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() =>
                      handleUpdate(
                        lead
                      )
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Update
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        lead._id
                      )
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              )}
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <p className="font-semibold">
          Page {page} of{' '}
          {totalPages}
        </p>

        <button
          disabled={
            page === totalPages
          }
          onClick={() =>
            setPage(page + 1)
          }
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;