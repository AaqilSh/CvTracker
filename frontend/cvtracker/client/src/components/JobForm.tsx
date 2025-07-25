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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input className="border p-2 w-full" placeholder="Job Title"
        value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Company"
        value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
      <textarea className="border p-2 w-full" placeholder="Job Description"
        value={form.jd_text} onChange={(e) => setForm({ ...form, jd_text: e.target.value })} />
      <select className="border p-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
        <option>Applied</option><option>Interview</option><option>Offer</option><option>Rejected</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}