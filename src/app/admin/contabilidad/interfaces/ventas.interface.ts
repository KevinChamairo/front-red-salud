export interface series {
  clients: clientes[];
  description: string;
  id: number;
  serie: string;
  type: number;
  type_document: number;
}

export interface clientes {
  document_id: string;
  id: number;
  legal_name: string;
  type: number;
}

export interface ComprobanteM {
  tipo_doc: number;
  numero_doc: string;
  serie_id: number;
  id_moneda: number;
  correlativo: number;
  razon_social: string;
  direccion: string;
  fecha: Date;
  importe: number;
  descripcion: string;
}
export interface buscarCm {
  serie_id: number;
  fecha_inicial: string;
  fecha_final: string;
}
export interface buscarCe {
  serie_id: number;
  fecha_inicial: string;
  fecha_final: string;
}
export interface buscarCgene {
  serie_id: number;
  fecha_inicial: string;
  fecha_final: string;
}
export interface ComprobantesAutomaticos {
  id: number;
  fecha: string;
  plan: string;
  nro_certificado: string;
  dni: string;
  nombre: string;
  importe: number;
}
export interface ComprobanteEnviado {
  amount: number;
  bill: string;
  bill_id: number;
  client_document: string;
  client_name: string;
  correlative: number;
  date: string;
  document_type: number;
  note: string;
  status: string;
  status_code: number;
  summary_correlative: number;
  selected: boolean;
}
export interface ComprobantesGenerados {
  amount: number;
  bill: string;
  bill_id: number;
  client_document: string;
  client_name: string;
  correlative: number;
  date: string;
  document_type: number;
  note: string;
  status: string;
  status_code: number;
  summary_correlative: number;
  selected: boolean;
}

export interface FacturasGeneradas {
  amount: number;
  plan_id: number;
  plan_name: string;
  sub_charges_number: number;
  sub_charges: sub_charges[];
  selected: boolean;
}
export interface sub_charges {
  amount: number;
  id: number;
}

export interface GenerarCB {
  serie_id: number;
  charges: charges[];
}

export interface charges {
  amount: number;
  contractor_document: string;
  date: string;
  id_cobro: number;
  plan_id: number;
}

export interface putEmision {
  date: string;
  bills: number[];
}

export interface UpdateGlosa {
  note: string;
  bills: number[];
}

export interface Datocobro {
  document_id: string;
  id: number;
  legal_name: string;
  type: number;
}

export interface Datocobro1 {
  clients: Datocobro[];
  description: string;
  id: number;
  serie: string;
  type: number;
  type_document: number;
}
