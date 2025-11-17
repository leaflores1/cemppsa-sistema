// src/services/sync.service.ts
import { apiClient } from './api.client';
import { API_CONFIG } from '../config/api';
import type { SyncBatchRequest, SyncBatchResponse } from '../types/api.types';

export const syncService = {
  /**
   * Sincroniza un batch de lecturas con el servidor
   */
  async syncBatch(data: SyncBatchRequest): Promise<SyncBatchResponse> {
    return apiClient.post<SyncBatchResponse>(
      API_CONFIG.ENDPOINTS.SYNC,
      data
    );
  },
};