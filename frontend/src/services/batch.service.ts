// src/services/batch.service.ts
import { apiClient } from './api.client';
import { API_CONFIG } from '../config/api';
import type { BatchSummary, BatchDetail } from '../types/api.types';

export const batchService = {
  /**
   * Lista todos los batches
   */
  async listBatches(): Promise<BatchSummary[]> {
    return apiClient.get<BatchSummary[]>(API_CONFIG.ENDPOINTS.BATCHES);
  },

  /**
   * Obtiene el detalle de un batch específico
   */
  async getBatchDetail(batchUuid: string): Promise<BatchDetail> {
    return apiClient.get<BatchDetail>(
      `${API_CONFIG.ENDPOINTS.BATCHES}/${batchUuid}`
    );
  },
};