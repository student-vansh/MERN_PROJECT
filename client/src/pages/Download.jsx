import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../api/api";
import Navbar from "../components/Navbar";
import NoteCardbtechNotes from "../components/NoteCardbtechNotes";

export default function MyDownloads() {
  const navigate = useNavigate();
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(apiUrl("/user/my-downloads"), { withCredentials: true })
      .then((res) => {
        setDownloads(res.data.downloads || []);
      })
      .catch(() => {
        setError("Failed to load downloads. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 w-full px-4 sm:px-8 md:px-12 py-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/home")}
            className="mb-4 text-sm text-primary hover:underline"
          >
            ← Back to home
          </button>

          <h1 className="text-3xl font-semibold text-center mb-6">My Downloads</h1>

          {loading ? (
            <div className="text-center py-10 text-gray-600">Loading...</div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-gray-700">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-primary text-white px-4 py-2 rounded-lg"
              >
                Retry
              </button>
            </div>
          ) : downloads.length === 0 ? (
            <div className="text-center py-10 text-gray-600">
              <p>No downloads yet.</p>
              <button
                onClick={() => navigate("/allcourse")}
                className="mt-4 text-primary font-medium hover:underline"
              >
                Browse notes
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {downloads.map((d) => (
                <NoteCardbtechNotes key={d._id} note={d.note} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
