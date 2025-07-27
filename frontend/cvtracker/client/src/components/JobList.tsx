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
  const statusOptions = [
    { value: "Applied", color: "bg-blue-100 text-blue-800", icon: "📝" },
    { value: "Interview", color: "bg-yellow-100 text-yellow-800", icon: "💬" },
    { value: "Offer", color: "bg-green-100 text-green-800", icon: "🎉" },
    { value: "Rejected", color: "bg-red-100 text-red-800", icon: "❌" }
  ];

  const getStatusStyle = (status: string) => {
    return statusOptions.find(option => option.value === status) || statusOptions[0];
  };

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📋</div>
        <h3 className="text-lg font-medium text-gray-500 mb-2">No applications yet</h3>
        <p className="text-gray-400">Start by adding your first job application!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
              <p className="text-gray-600 mb-3">{job.company}</p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(job.status).color}`}>
              <span className="mr-1">{getStatusStyle(job.status).icon}</span>
              {job.status}
            </span>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              Applied on {new Date().toLocaleDateString()}
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200">
                Edit
              </button>
              <button className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors duration-200">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
