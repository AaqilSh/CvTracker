  import { useState } from "react";
import { addJob } from "../services/api";

interface JobFormProps {
  onJobAdded: () => void;
  editingJob?: Job | null;
  onJobUpdated?: () => void;
}
interface Job {
  id: number;
  title: string;
  company: string;
  jd_text: string;
  status: string;
}

export default function JobForm({ onJobAdded, editingJob, onJobUpdated }: JobFormProps) {
  const [form, setForm] = useState({
    title: editingJob?.title || "",
    company: editingJob?.company || "",
    jd_text: editingJob?.jd_text || "",
    status: editingJob?.status || "Applied",
  });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState(""); 


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addJob(form);
      setForm({ title: "", company: "", jd_text: "", status: "Applied" });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000); // Hide after 3 seconds  
      onJobAdded();
    } catch (error) {
      setErrorMsg("Failed to add job. Please try again.");
      console.error('Error adding job:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

    const statusOptions = [
    { value: "Applied", color: "bg-blue-100 text-blue-800", icon: "📝" },
    { value: "Interview", color: "bg-yellow-100 text-yellow-800", icon: "💬" },
    { value: "Offer", color: "bg-green-100 text-green-800", icon: "🎉" },
    { value: "Rejected", color: "bg-red-100 text-red-800", icon: "❌" }
  ];

  return (
        <form onSubmit={handleSubmit} className="space-y-6">
      {/* Job Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Title
        </label>
        <input
          type="text"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
          placeholder="e.g. Senior Software Engineer"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

           {/* Company */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company
        </label>
        <input
          type="text"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
          placeholder="e.g. Google, Microsoft, etc."
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
      </div>
           {/* Job Description */}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Description
        </label>
        <span className="text-xs text-gray-500">
          {form.jd_text.length}/500 characters
        </span>
        <textarea
          rows={4}
          maxLength={500}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
          placeholder="Paste the job description here..."
          value={form.jd_text}
          onChange={(e) => setForm({ ...form, jd_text: e.target.value })}
        />
      </div>

           <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Application Status
        </label>
        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-white"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.icon} {option.value}
            </option>
          ))}
        </select>
      </div>

         <button
        type="submit"
        disabled={isSubmitting || !form.title || !form.company}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Adding...</span>
          </>
        ) : (
          <>
            <span>✨</span>
            <span>Add Application</span>
          </>
        )}
      </button>
      <button
          type="button"
          onClick={() => setForm({ title: "", company: "", jd_text: "", status: "Applied" })}
          disabled={isSubmitting}
          className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
          Clear
          </button>
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <div className="flex-shrink-0">
            <span className="text-green-500 text-xl">✅</span>
          </div>
          <div>
            <p className="text-sm font-medium text-green-800">Success!</p>
            <p className="text-sm text-green-600">Job application added successfully.</p>
          </div>
        </div>
      )}
      
      {errorMsg && (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3 mt-2">
        <span className="text-red-500 text-xl">❌</span>
        <span className="text-sm text-red-700">{errorMsg}</span>
      </div>
    )}
      
      </form>
      );
}