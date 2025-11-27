// frontend/src/services/consultas.service.ts
import { apiClient } from './api.client';

// Tipos
export interface ConsultaRequest {
  capa?: 'bronze' | 'silver' | 'gold';
  tipo_instrumento?: string;
  instrument_codes?: string[];
  parametros?: string[];
  fecha_inicio?: string;
  fecha_fin?: string;
  limit?: number;
  offset?: number;
  order_by?: string;
  order_desc?: boolean;
}

export interface Lectura {
  id: number;
  batch_uuid: string;
  instrument_code: string;
  parameter: string;
  unit: string;
  value: number;
  measured_at: string;
  notes?: string;
}

export interface ConsultaResponse {
  total: number;
  offset: number;
  limit: number;
  capa: string;
  lecturas: Lectura[];
  metadata: Record<string, any>;
}

export interface InstrumentoStats {
  instrument_code: string;
  parameter: string;
  fecha_inicio: string;
  fecha_fin: string;
  count: number;
  min_value?: number;
  max_value?: number;
  avg_value?: number;
  last_value?: number;
  last_measured_at?: string;
}

export const consultasService = {
  /**
   * Explora datos con filtros avanzados
   */
  async explorarDatos(request: ConsultaRequest): Promise<ConsultaResponse> {
    return apiClient.post<ConsultaResponse>('/api/v1/explorar', request);
  },

  /**
   * Obtiene lecturas de un instrumento específico
   */
  async obtenerLecturas(
    instrumentCode: string,
    params: {
      fecha_inicio?: string;
      fecha_fin?: string;
      parametro?: string;
      capa?: string;
      limit?: number;
    } = {}
  ) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });

    return apiClient.get<any>(
      `/api/v1/instrumentos/${instrumentCode}/lecturas?${queryParams.toString()}`
    );
  },

  /**
   * Obtiene estadísticas de un instrumento
   */
  async obtenerEstadisticas(
    instrumentCode: string,
    fechaInicio?: string,
    fechaFin?: string
  ): Promise<InstrumentoStats> {
    const params: Record<string, string> = {};
    if (fechaInicio) params.fecha_inicio = fechaInicio;
    if (fechaFin) params.fecha_fin = fechaFin;

    return apiClient.get<InstrumentoStats>(
      `/api/v1/instrumentos/${instrumentCode}/stats`,
      { params }
    );
  },

  /**
   * Exporta datos a CSV
   */
  async exportarCSV(request: ConsultaRequest): Promise<Blob> {
    const response = await fetch(`${apiClient['baseURL']}/api/v1/export/csv`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consulta: request, formato: 'csv' })
    });

    if (!response.ok) {
      throw new Error('Error al exportar CSV');
    }

    return response.blob();
  }
};