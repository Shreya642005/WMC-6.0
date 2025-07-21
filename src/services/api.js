import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
});

// API endpoints
export const missionAPI = {
  // Create a new mission
  createMission: async (missionData) => {
    const formData = new FormData();
    
    // Append all form fields
    Object.keys(missionData).forEach(key => {
      if (missionData[key] !== null && missionData[key] !== undefined) {
        formData.append(key, missionData[key]);
      }
    });

    return await api.post('/missions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Get all missions
  getAllMissions: async () => {
    return await api.get('/missions');
  },

  // Get single mission by ID
  getMissionById: async (id) => {
    return await api.get(`/missions/${id}`);
  },

  // Update mission
  updateMission: async (id, missionData) => {
    const formData = new FormData();
    
    Object.keys(missionData).forEach(key => {
      if (missionData[key] !== null && missionData[key] !== undefined) {
        formData.append(key, missionData[key]);
      }
    });

    return await api.put(`/missions/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Delete mission
  deleteMission: async (id) => {
    return await api.delete(`/missions/${id}`);
  },

  // Health check
  healthCheck: async () => {
    return await api.get('/health');
  },
};

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;