import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Try to get token from localStorage (client-side)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    console.error("API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    });

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// API methods
export const api = {
  // Auth endpoints
  auth: {
    login: (data: { email: string; password: string }) =>
      apiClient.post("/api/auth/login", data),
    register: (data: { name: string; email: string; password: string }) =>
      apiClient.post("/api/auth/register", data),
  },

  // Courses endpoints
  courses: {
    getAll: () => apiClient.get("/api/courses"),
    getById: (id: string) => apiClient.get(`/api/courses/${id}`),
    create: (data: any) => apiClient.post("/api/courses", data),
    update: (id: string, data: any) =>
      apiClient.put(`/api/courses/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/courses/${id}`),
  },

  // Products endpoints
  products: {
    getAll: () => apiClient.get("/api/products"),
    getById: (id: string) => apiClient.get(`/api/products/${id}`),
    create: (data: any) => apiClient.post("/api/products", data),
    update: (id: string, data: any) =>
      apiClient.put(`/api/products/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/products/${id}`),
  },

  // News endpoints
  news: {
    getAll: () => apiClient.get("/api/news"),
    getById: (id: string) => apiClient.get(`/api/news/${id}`),
    create: (data: any) => apiClient.post("/api/news", data),
    update: (id: string, data: any) => apiClient.put(`/api/news/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/news/${id}`),
  },

  // Tournaments endpoints
  tournaments: {
    getAll: () => apiClient.get("/api/tournaments"),
    getById: (id: string) => apiClient.get(`/api/tournaments/${id}`),
    create: (data: any) => apiClient.post("/api/tournaments", data),
    update: (id: string, data: any) =>
      apiClient.put(`/api/tournaments/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/tournaments/${id}`),
  },

  // Admin endpoints
  admin: {
    getStats: () => apiClient.get("/api/admin/stats"),
    getUsers: () => apiClient.get("/api/admin/users"),
    getActivities: () => apiClient.get("/api/admin/activities"),
  },

  // Health check
  health: () => apiClient.get("/health"),
};

export default apiClient;
