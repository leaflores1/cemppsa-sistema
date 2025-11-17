// src/services/catalog.service.ts
import { apiClient } from './api.client';
import { API_CONFIG } from '../config/api';
import type { Catalog } from '../types/api.types';

export const catalogService = {
  /**
   * Obtiene el catálogo completo de instrumentos y unidades
   */
  async getCatalog(): Promise<Catalog> {
    return apiClient.get<Catalog>(API_CONFIG.ENDPOINTS.CATALOG);
  },
};