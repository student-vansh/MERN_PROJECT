import { useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../api/api";
import Navbar from "../../components/Navbar";

const TYPE_OPTIONS = [
  { value: "notes", label: "Notes" },
  { value: "pyq", label: "PYQ" },
];

export default function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    course: "BTech",
    branch: "",
    semester: "",
    subject: "",
    year: "",
    type: "notes",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const isPdfSelected = useMemo(() => {
    if (!file) return false;
    return (
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    );
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!file) {
      setError("Please select a PDF file.");
      return;
    }
    if (!isPdfSelected) {
      setError("Only PDF files are allowed.");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", file);

      await axios.post(apiUrl("/notes"), formData, {
        withCredentials: true,
      });

      setMessage("Uploaded successfully!");
      setForm({
        title: "",
        course: "BTech",
        branch: "",
        semester: "",
        subject: "",
        year: "",
        type: "notes",
      });
      setFile(null);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Upload failed. Admin login required."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 w-full px-4 sm:px-8 md:px-12 py-8">
        <div className="max-w-3xl mx-auto">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="mb-4 text-sm text-primary hover:underline"
          >
            ← Back to Admin Dashboard
          </button>

          <h1 className="text-3xl font-semibold text-center text-gray-900 mb-2">
            Upload Notes / PYQ
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Upload a PDF with course details (admin only).
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-800">Title</span>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g., DBMS Notes - Unit 1"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-800">Type</span>
                <select
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  {TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-800">Course</span>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  placeholder="BTech"
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-800">Branch</span>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  placeholder="cse / it / cs-ds"
                  value={form.branch}
                  onChange={(e) => setForm({ ...form, branch: e.target.value })}
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-800">Semester</span>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  placeholder="1"
                  value={form.semester}
                  onChange={(e) =>
                    setForm({ ...form, semester: e.target.value })
                  }
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-800">Subject</span>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Data Structures"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-gray-800">Year</span>
                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  placeholder="2025"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-gray-800">PDF File</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="mt-2 block w-full text-sm"
                required
              />
            </label>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            )}
            {message && (
              <div className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary font-medium">
                {message}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-primary px-6 py-2.5 text-white font-medium hover:brightness-110 disabled:opacity-60"
              >
                {submitting ? "Uploading..." : "Upload"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="rounded-xl border border-gray-300 px-6 py-2.5 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
