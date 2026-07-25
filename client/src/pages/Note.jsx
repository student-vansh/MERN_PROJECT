import { useEffect, useState } from "react";
import axios from "axios";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("https://mern-project-backend-ijg7.onrender.com/notes")
      .then((res) => setNotes(res.data.notes))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>All Notes</h2>

      {notes.map((note) => (
        <div key={note._id}>
          <h3>{note.title}</h3>

          <a
            href={`https://mern-project-backend-ijg7.onrender.com/${note.fileUrl}`}
            target="_blank"
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
}