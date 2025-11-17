// src/services/health.service.ts
import { apiClient } from './api.client';
import { API_CONFIG } from '../config/api';

export const healthService = {
  /**
   * Verifica si la API está funcionando
   */
  async checkHealth(): Promise<{ status: string }> {
    return apiClient.get<{ status: string }>(API_CONFIG.ENDPOINTS.HEALTH);
  },
};