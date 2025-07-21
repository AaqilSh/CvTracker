import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export const getJobs = async () => {
  const res = await axios.get(`${API_BASE}/jobs/`);
  return res.data;
};

export const addJob = async (job: {
  title: string;
  company: string;
  jd_text: string;
  status?: string;
}) => {
  const res = await axios.post(`${API_BASE}/jobs/`, job);
  return res.data;
};

export const uploadResume = async (file: File) => {
  const form = new FormData();
  form.append("file", file);
  const res = await axios.post(`${API_BASE}/resume/upload`, form);
  return res.data;
};