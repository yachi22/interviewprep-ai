import { useEffect, useState } from "react";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../api/notesApi";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadNotes() {
    try {
      setLoading(true);
      setError("");

      const response = await getNotes();
      setNotes(response.data.notes || []);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
          "Failed to fetch notes."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  function clearForm() {
    setTitle("");
    setContent("");
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      if (editingId) {
        await updateNote(editingId, {
          title,
          content,
        });

        setMessage("Note updated successfully.");
      } else {
        await createNote({
          title,
          content,
        });

        setMessage("Note created successfully.");
      }

      clearForm();
      await loadNotes();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
          "Failed to save note."
      );
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(note) {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);

    setError("");
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEdit() {
    clearForm();
    setError("");
    setMessage("");
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await deleteNote(id);

      setNotes((current) =>
        current.filter((note) => note.id !== id)
      );

      if (editingId === id) {
        clearForm();
      }

      setMessage("Note deleted successfully.");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
          "Failed to delete note."
      );
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          📝 Notes
        </h1>

        <p className="text-slate-500 mt-2">
          Save your interview preparation notes in one place.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-5">
          {error}
        </div>
      )}

      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-5">
          {message}
        </div>
      )}

      {/* Create / Edit Form */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-5">
          {editingId ? "Edit Note" : "Create a Note"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="e.g. DBMS Revision"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Content
            </label>

            <textarea
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              placeholder="Write your notes here..."
              rows="6"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Note"
                  : "Add Note"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Notes */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-5">
          My Notes
        </h2>

        {loading ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-slate-500">
              Loading notes...
            </p>
          </div>
        ) : notes.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
            <div className="text-4xl mb-3">
              📝
            </div>

            <h3 className="text-xl font-semibold text-slate-800">
              No notes yet
            </h3>

            <p className="text-slate-500 mt-2">
              Create your first preparation note above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
              >
                <div className="flex justify-between gap-4">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {note.title}
                  </h3>

                  {Boolean(note.is_pinned) && (
                    <span title="Pinned">
                      📌
                    </span>
                  )}
                </div>

                <p className="text-slate-600 mt-3 whitespace-pre-wrap">
                  {note.content}
                </p>

                <p className="text-xs text-slate-400 mt-5">
                  Updated{" "}
                  {note.updated_at
                    ? new Date(
                        note.updated_at
                      ).toLocaleString()
                    : ""}
                </p>

                <div className="flex gap-4 mt-5 pt-4 border-t border-slate-100">
                  <button
                    onClick={() =>
                      handleEdit(note)
                    }
                    className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(note.id)
                    }
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    🗑 Delete
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