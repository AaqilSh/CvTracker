import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export const getJobs = async () => {
  const res = await axios.get(`${API_BASE}/jobs/`);
  return res.data;
};



