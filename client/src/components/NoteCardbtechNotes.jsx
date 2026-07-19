import { apiUrl } from "../api/api";

export default function NoteCardbtechNotes({ note }) {
  if (!note) return null;

  const fileUrl = apiUrl(`/${note.fileUrl}`);
  const downloadUrl = apiUrl(`/notes/download/${note._id}`);

  return (
    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
      <iframe src={fileUrl} className="w-full h-48" title={note.title} />

      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition">
        <a
          href={downloadUrl}
          className="bg-white text-black px-4 py-2 rounded-lg font-semibold"
        >
          Download
        </a>
        <span className="text-white text-sm">
          {note.subject} • {note.year}
        </span>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-center text-sm">{note.title}</h3>
      </div>
    </div>
  );
}
