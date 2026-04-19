import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL||"expense-tracker-backend-chi-green.vercel.app/api"   //temporary heard code due to deployment issue
,
  headers: { "Content-Type": "application/json" },
});

// Automatically attach token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
