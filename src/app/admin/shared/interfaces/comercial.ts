export interface AfiliadoBroker {
  // Datos generales
  tipo_documento: string;
  nro_documento: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombre1: string;
  nombre2: string;
  fecha_nacimiento: string;
  sexo: string;
  nacionalidad: string;
  // Datos de contacto
  direccion: string;
  departamento: string;
  provincia: string;
  distrito: string;
  celular: string;
  email: string;
  // Datos de afiliación
  parentesco: string;
  tipo: string; // 1: CONTRATANTE, 2: AFILIADO, 3: CONTRATANTE Y AFILIADO
}

export interface ClienteBroker {
  idcliente: number;
  nombre_comercial: string;
  ruc: string;
}
export interface ClientePlanBroker {
  idcliente: number;
  nombre: string;
  ruc: string;
  planes: PlanBroker[];
}

export interface PlanBroker {
  idcliente_plan: number;
  idplan: number;
  plan: string;
  edad_maxima: number;
  tipo_procesamiento: number;
  frecuencias: FrecuenciaPlanBroker[];
}

export interface FrecuenciaPlanBroker {
  descripcion: string;
  eventos: number;
  iddescuento: number;
  idprecio: number;
  idperiodo: number;
  max_polizas: number;
  moneda: string;
  precio: number;
  precio_final: number;
  valor_descuento: string;
}
