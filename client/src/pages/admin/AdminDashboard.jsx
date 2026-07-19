import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";

export default function AdminDashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl("/notes"), { withCredentials: true });
      setNotes(res.data.notes || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load notes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = useMemo(() => {
    let list = notes;
    if (filter !== "all") list = list.filter((n) => n.type === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (n) =>
          n.title?.toLowerCase().includes(q) ||
          n.subject?.toLowerCase().includes(q) ||
          n.branch?.toLowerCase().includes(q) ||
          n.course?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [notes, filter, search]);

  const stats = useMemo(
    () => ({
      total: notes.length,
      notes: notes.filter((n) => n.type === "notes").length,
      pyq: notes.filter((n) => n.type === "pyq").length,
    }),
    [notes]
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note permanently?")) return;
    try {
      await axios.delete(apiUrl(`/notes/${id}`), { withCredentials: true });
      fetchNotes();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed.");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Welcome, {user?.username || "Admin"} — manage all notes & PYQs
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/upload")}
              className="bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:brightness-110"
            >
              + Upload New
            </button>
            <button
              onClick={() => navigate("/home")}
              className="border border-gray-300 bg-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-50"
            >
              View Site
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2.5 rounded-xl font-medium hover:opacity-90"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Files</p>
            <p className="text-3xl font-bold text-primary mt-1">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <p className="text-sm text-gray-500">Notes</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.notes}</p>
          </div>
          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <p className="text-sm text-gray-500">PYQs</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.pyq}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by title, subject, branch..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All types</option>
            <option value="notes">Notes only</option>
            <option value="pyq">PYQ only</option>
          </select>
          <button
            onClick={fetchNotes}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-600">Loading notes...</div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border">
            <p className="text-gray-600 font-medium">No notes found</p>
            <button
              onClick={() => navigate("/upload")}
              className="mt-4 text-primary font-medium hover:underline"
            >
              Upload your first file
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">
                    {note.title}
                  </h3>
                  <span
                    className={`shrink-0 text-xs px-2 py-1 rounded-full ${
                      note.type === "pyq"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {note.type?.toUpperCase()}
                  </span>
                </div>

                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Course:</span> {note.course}
                  </p>
                  <p>
                    <span className="font-medium">Branch:</span> {note.branch} · Sem{" "}
                    {note.semester}
                  </p>
                  <p>
                    <span className="font-medium">Subject:</span> {note.subject}
                  </p>
                  <p>
                    <span className="font-medium">Year:</span> {note.year}
                  </p>
                </div>

                <div className="flex gap-3 mt-4 pt-4 border-t">
                  <a
                    href={apiUrl(`/${note.fileUrl}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    View PDF
                  </a>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-red-500 text-sm font-medium hover:underline ml-auto"
                  >
                    Delete
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
