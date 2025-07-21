interface Job {
  id: number;
  title: string;
  company: string;
  status: string;
}

interface JobListProps {
  jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Job List</h2>
      <ul className="space-y-2">
        {jobs.map((job) => (
          <li key={job.id} className="border p-3 rounded">
            <strong>{job.title}</strong> at {job.company} <em>({job.status})</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
