export const API_BASE =
  import.meta.env.VITE_API_URL || "https://mern-project-backend-ise0.onrender.com";

export const apiUrl = (path) => `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
