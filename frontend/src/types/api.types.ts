// src/types/api.types.ts

// Tipos para el catálogo
export interface Instrument {
  instrument_code: string;
  name: string;
  type: string;
}

export interface Unit {
  unit_code: string;
  description: string;
}

export interface Catalog {
  instruments: Instrument[];
  units: Unit[];
}

// Tipos para sincronización
export interface Reading {
  client_row_id: number;
  instrument_code: string;
  parameter: string;
  unit: string;
  value: number;
  measured_at: string; // ISO 8601
  notes?: string;
}

export interface SyncBatchRequest {
  batch_uuid: string;
  device_id: string;
  technician_id: string;
  created_at: string; // ISO 8601
  readings: Reading[];
}

export interface RowStatus {
  client_row_id: number;
  status: string;
  message?: string;
}

export interface SyncBatchResponse {
  batch_uuid: string;
  status: string;
  saved: number;
  errors: string[];
  rows: RowStatus[];
}

// Tipos para batches
export interface BatchSummary {
  batch_uuid: string;
  status: string;
  source: string;
  created_at: string;
  server_received_at: string;
}

export interface ReadingDetail {
  client_row_id: number;
  instrument_code: string;
  parameter: string;
  unit: string;
  value: number;
  measured_at: string;
  notes?: string;
}

export interface BatchDetail {
  file_registry: {
    batch_uuid: string;
    status: string;
    source: string;
    created_at: string;
    server_received_at: string;
  };
  rows: ReadingDetail[];
}