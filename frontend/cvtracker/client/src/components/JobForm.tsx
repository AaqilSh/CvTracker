  import { useState } from "react";
import { addJob } from "../services/api";

interface JobFormProps {
  onJobAdded: () => void;
}

export default function JobForm({ onJobAdded }: JobFormProps) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    jd_text: "",
    status: "Applied",
  });

    const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addJob(form);
      setForm({ title: "", company: "", jd_text: "", status: "Applied" });
      onJobAdded();
    } catch (error) {
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
      </form>
      );
}