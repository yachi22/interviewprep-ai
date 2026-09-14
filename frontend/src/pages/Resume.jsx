import { useEffect, useState } from "react";
import {
  getResume,
  uploadResume,
} from "../api/resumeApi";

export default function Resume() {
  const [resume, setResume] = useState(null);
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadResume() {
    try {
      setLoading(true);
      setError("");

      const response = await getResume();

      setResume(response.data.resume);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
          "Failed to load resume."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadResume();
  }, []);

  function handleFileChange(e) {
    const selectedFile = e.target.files?.[0];

    setError("");
    setMessage("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const allowedExtensions = [
      ".pdf",
      ".doc",
      ".docx",
    ];

    const fileName = selectedFile.name.toLowerCase();

    const validExtension =
      allowedExtensions.some((extension) =>
        fileName.endsWith(extension)
      );

    if (!validExtension) {
      setError(
        "Only PDF, DOC, and DOCX files are allowed."
      );
      setFile(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError(
        "Resume must be smaller than 5 MB."
      );
      setFile(null);
      return;
    }

    setFile(selectedFile);
  }

  async function handleUpload(e) {
    e.preventDefault();

    if (!file) {
      setError("Please select a resume file.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setMessage("");

      const formData = new FormData();

      formData.append("resume", file);

      const response = await uploadResume(formData);

      setResume(response.data.resume);
      setFile(null);

      e.target.reset();

      setMessage(
        "Resume uploaded successfully."
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
          "Failed to upload resume."
      );
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-slate-500">
          Loading resume...
        </p>
      </div>
    );
  }

  const resumeUrl = resume?.file_url
    ? `http://localhost:5000${resume.file_url}`
    : null;

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          📄 Resume
        </h1>

        <p className="text-slate-500 mt-2">
          Upload and manage the resume you use for applications.
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

      {/* Upload */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          {resume ? "Replace Resume" : "Upload Resume"}
        </h2>

        <p className="text-sm text-slate-500 mb-5">
          PDF, DOC, or DOCX. Maximum size: 5 MB.
        </p>

        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="block w-full border border-slate-300 rounded-lg p-3 mb-4"
          />

          {file && (
            <p className="text-sm text-slate-600 mb-4">
              Selected:{" "}
              <span className="font-medium">
                {file.name}
              </span>
            </p>
          )}

          <button
            type="submit"
            disabled={uploading || !file}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            {uploading
              ? "Uploading..."
              : resume
                ? "Replace Resume"
                : "Upload Resume"}
          </button>
        </form>
      </div>

      {/* Current Resume */}
      {resume ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Current Resume
              </h2>

              <p className="text-slate-600 mt-2">
                📎 {resume.file_name}
              </p>

              {resume.created_at && (
                <p className="text-xs text-slate-400 mt-2">
                  Uploaded{" "}
                  {new Date(
                    resume.created_at
                  ).toLocaleString()}
                </p>
              )}
            </div>

            {resumeUrl && (
  <a
    href={resumeUrl}
    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium text-sm"
  >
    View Resume
  </a>
)}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
          <div className="text-4xl mb-3">
            📄
          </div>

          <h2 className="text-xl font-semibold text-slate-800">
            No resume uploaded
          </h2>

          <p className="text-slate-500 mt-2">
            Upload your resume to keep it ready for applications.
          </p>
        </div>
      )}
    </div>
  );
}