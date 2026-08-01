import { useEffect, useState } from "react";
import {
  getNotes,
  createNote,
  deleteNote,
} from "../api/noteApi";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function loadNotes() {
    try {
      const response = await getNotes();
      setNotes(response.data.notes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();

    try {
      await createNote({
        title,
        content,
      });

      setTitle("");
      setContent("");

      loadNotes();
    } catch (error) {
      console.error(error);
      alert("Failed to create note.");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteNote(id);
      loadNotes();
    } catch (error) {
      console.error(error);
      alert("Failed to delete note.");
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Notes
      </h1>

      <form
        onSubmit={handleCreate}
        className="space-y-4 mb-8"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-3"
          required
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded p-3"
          rows="5"
          required
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded"
        >
          Add Note
        </button>
      </form>

      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="border rounded-lg p-5 shadow"
          >
            <h2 className="font-bold text-xl">
              {note.title}
            </h2>

            <p className="mt-3">
              {note.content}
            </p>

            <button
              onClick={() => handleDelete(note.id)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}