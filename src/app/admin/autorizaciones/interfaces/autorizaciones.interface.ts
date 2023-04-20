export interface bodyBusqueda {
  dni: string;
  oa: string;
}

export interface Asegurado {
  aseg_ape1: string;
  aseg_ape2: string;
  aseg_direcc: string;
  aseg_id: number;
  aseg_nom1: string;
  aseg_nom2: string;
  aseg_numDoc: string;
  aseg_telf: string;
  cert_num: string;
  nombre_plan: string;
  num_orden_atencion: string;
  tipoDoc_id: number;
  edad: number;
  inicio_vigencia: string
}

export interface Diagnostico {
  descripcion: string;
  id: number;
}

export interface Proveedores {
  id: number;
  nombre: string;
  tipo: string;
}

export interface Productos {
  id: number;
  importe_max: number;
  producto: string;
}

export interface Autorizacion {
  idcie10: number;
  ruta_expediente: string;
  idsiniestro: number;
  datos: bodyArrayAutorizacion[];
}


export interface bodyArrayAutorizacion{
  producto_desc: string;
  idproveedor: number;
  tipo_prove: string;
  importe: number;
  idopcion: number;
  tipo_pago:string;
}
