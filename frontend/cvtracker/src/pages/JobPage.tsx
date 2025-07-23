import { useEffect, useState } from "react";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import { getJobs } from "../services/api";

export default function JobPage() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const data = await getJobs();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Career Companion: CV Tracker</h2>
      <JobForm onJobAdded={fetchJobs} />
      <JobList jobs={jobs} />
    </div>
  );
}
