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
export interface Documentosrecibidos {
  documento: string;
  estado: string;
  fecha_emision: string;
  fecha_recepcion: string;
  id: number;
  nombre_comercial: string;
  orden_atencion: [];
  razon_social: string;
  ruc: string;
  usuario: string;
}
export interface buscarDoc {
  fecha_fin: string;
  fecha_inicio: string;
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

export interface TipoDocumento {
  id: number;
  tipo_documento: string;
  tipo_formulario: number;
}

export interface Formulario2 {
  asunto: number;
  estado: number;
  fecha_recepcion: string;
  numero: number;
  remitente: string;
  tipo_documento: number;
  tipo_pago: number;
}

export interface ConsultarRUC {
  ruc: number;
  serie: string;
  numero: string;
}

export interface ConsultarOA {
  dni: string;
  fecha: string;
  oa: string;
}
export interface afiliadosOA {
  afiliado: string;
  dni: string;
  estado: string;
  fecha_atencion: string;
  idsiniestro: number;
  nombre_comercial: string;
  num_orden: string;
  proveedor_id: number;
}
export interface Formulario1 {
  tipo_documento: number;
  serie: string;
  numero: string;
  ruc: string;
  importe: string;
  fecha_emision: string
  fecha_recepcion: string
  iddocumento:number
  estado: number
  tipo_pago: number
  orden_atencion: [];
  nombre_comercial: string
  razon_social: string
}
export interface Cargo {
  documents : []
}
