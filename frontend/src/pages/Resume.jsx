import { useEffect, useState } from "react";
import { uploadResume, getResume } from "../api/resumeApi";

export default function Resume() {
  const [resume, setResume] = useState(null);
  const [file, setFile] = useState(null);

  async function loadResume() {
    try {
      const response = await getResume();
      setResume(response.data.resume);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadResume();
  }, []);

  async function handleUpload(e) {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    console.log("Selected File:", file);

    const formData = new FormData();
    formData.append("resume", file);

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await uploadResume(formData);

      alert(response.data.message);

      setResume({
        file_name: file.name,
      });

      setFile(null);

      loadResume();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.error ||
        error.message ||
        "Upload failed."
      );
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">
        Resume Upload
      </h1>

      <form onSubmit={handleUpload}>
        <div className="flex items-center gap-5">

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
          >
            Upload Resume
          </button>

        </div>
      </form>

      {resume && (
        <div className="mt-10 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Uploaded Resume
          </h2>

          <p>
            <strong>File Name:</strong> {resume.file_name}
          </p>

          <p className="mt-3 text-green-600 font-semibold">
            ✅ Resume Uploaded
          </p>
        </div>
      )}
    </div>
  );
}