import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../../api/api";
import Navbar from "../../components/Navbar";

import NoteCardbtechNotes from "../../components/NoteCardbtechNotes";

const BRANCH_LABELS = {
  it: "IT",
  cse: "CSE",
  "cs-ds": "CS-DS",
  iot: "IOT",
  aiml: "AIML",
};

export default function PyqPage() {
  const navigate = useNavigate();
  const { branch, num } = useParams();

  const branchLabel =
    (branch && BRANCH_LABELS[branch]) ?? branch?.toUpperCase() ?? "Branch";

  const semesterLabel = useMemo(() => {
    if (!num) return "Semester";
    const n = Number(num);
    return Number.isFinite(n) ? `Semester ${n}` : `Semester ${num}`;
  }, [num]);

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!branch || !num) return;

    setLoading(true);
    setError(null);

    axios.get(apiUrl("/notes"), {
      params: {
        course: "BTech",
        branch: branch.toUpperCase(),
        semester: num,
        type: "pyq"
      }
    })
      .then((res) => {
        setNotes(res.data?.notes || []);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load PYQ. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [branch, num]);

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar />

      <div className="flex-1 w-full box-border px-3 min-[400px]:px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-6 sm:py-10 md:py-12 lg:py-14">
        <div className="max-w-6xl mx-auto w-full min-w-0">
          <button
            type="button"
            onClick={() => navigate(`/questionpaper/btech-branch/${branch}`)}
            className="mb-4 text-sm text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            ← Back to semesters
          </button>

          <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-[2.5rem] font-semibold text-center text-gray-900 mb-2 px-1 text-balance leading-tight">
            Previous Year Question Paper
          </h1>

          <p className="text-center text-xs min-[400px]:text-sm sm:text-base text-gray-500 mb-6 max-w-2xl mx-auto px-2 leading-relaxed">
            B.Tech · <span className="font-medium text-gray-700">{branchLabel}</span> ·{" "}
            {semesterLabel}
          </p>

          {loading ? (
            <div className="py-10 text-center text-gray-600">Loading...</div>
          ) : error ? (
            <div className="py-10 text-center">
              <p className="text-gray-700 font-medium">{error}</p>
              <button
                type="button"
                onClick={() => navigate(0)}
                className="mt-4 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-white hover:brightness-110"
              >
                Retry
              </button>
            </div>
          ) : notes.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-gray-700 font-medium">No Notes Found</p>
            </div>
          ) : (
            <div
              className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {notes.map((note) => (
                <NoteCardbtechNotes key={note._id} note={note} />
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}