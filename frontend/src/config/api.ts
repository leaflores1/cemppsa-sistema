// src/config/api.ts
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  ENDPOINTS: {
    HEALTH: '/health',
    SYNC: '/api/v1/sync',
    CATALOG: '/api/v1/catalog',
    BATCHES: '/api/v1/batches',
  }
};