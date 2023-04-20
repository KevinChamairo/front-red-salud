export const docs: Array<Doc> = [
  {
    cod: 1,
    desc: 'DNI',
  },
  {
    cod: 2,
    desc: 'CE',
  },
  {
    cod: 3,
    desc: 'PAS',
  },
  {
    cod: 4,
    desc: 'DIE',
  },
  {
    cod: 5,
    desc: 'CUI',
  },
  {
    cod: 6,
    desc: 'CNV',
  },
  {
    cod: 7,
    desc: 'SDI',
  },
  {
    cod: 8,
    desc: 'RUC',
  },
];

export const docs_afi: Array<Doc> = [
  {
    cod: 1,
    desc: 'DNI',
  },
  {
    cod: 2,
    desc: 'CE',
  },
  {
    cod: 3,
    desc: 'PAS',
  },
  {
    cod: 4,
    desc: 'DIE',
  },
  {
    cod: 5,
    desc: 'CUI',
  },
  {
    cod: 6,
    desc: 'CNV',
  },
  {
    cod: 7,
    desc: 'SDI',
  },
];

export const motivos: Array<{ key: string; value: number }> = [
  { key: 'Mala venta', value: 1 },
  { key: 'Entrega de medicamentos en el centro médico', value: 5 },
  { key: 'Inconvenientes con call center', value: 3 },
  { key: 'Inconvenientes con la plataforma', value: 4 },
  { key: 'Inconvenientes en el centro médico', value: 2 },
  { key: 'Entrega de medicamentos en cadena de farmacias', value: 6 },
  { key: 'Mala atención de médico en casa', value: 7 },
  { key: 'No le llegó póliza física', value: 8 },
  { key: 'No le llegó la póliza virtual', value: 9 },
  { key: 'Otros', value: 10 },
];

export const servicios: Array<Servicio> = [
  {
    img: 'assets/svg/consulta-ambulatoria.svg',
    title: 'Consulta Ambulatoria',
    link: 'consulta',
    idcobertura: 11,
    disponible: true,
    idcertificado_asegurado: 0,
    tipo_flujo: 0,
    idplan_cobertura: 0,
  },
  {
    img: 'assets/svg/chequeo.svg',
    title: 'Chequeo Preventivo Niño',
    link: 'consulta',
    idcobertura: 7,
    disponible: true,
    idcertificado_asegurado: 0,
    tipo_flujo: 0,
    idplan_cobertura: 0,
  },
  {
    img: 'assets/svg/chequeo.svg',
    title: 'Chequeo Preventivo Adulto',
    link: 'consulta',
    idcobertura: 8,
    disponible: true,
    idcertificado_asegurado: 0,
    tipo_flujo: 0,
    idplan_cobertura: 0,
  },
  {
    img: 'assets/svg/teleconsulta.svg',
    title: 'Teleconsulta',
    link: 'teleconsulta',
    idcobertura: 1,
    disponible: true,
    idcertificado_asegurado: 0,
    tipo_flujo: 0,
    idplan_cobertura: 0,
  },
  {
    img: 'assets/svg/teleconsulta.svg',
    title: 'Teleconsulta Covid',
    link: 'teleconsulta',
    idcobertura: 6,
    disponible: true,
    idcertificado_asegurado: 0,
    tipo_flujo: 0,
    idplan_cobertura: 0,
  },
  {
    img: 'assets/svg/teleconsulta.svg',
    title: 'Teleconsulta Preventiva',
    link: 'teleconsulta',
    idcobertura: 9,
    disponible: true,
    idcertificado_asegurado: 0,
    tipo_flujo: 0,
    idplan_cobertura: 0,
  },
  {
    img: 'assets/svg/omt.svg',
    title: 'OMT',
    link: 'teleconsulta',
    idcobertura: 12,
    disponible: true,
    idcertificado_asegurado: 0,
    tipo_flujo: 0,
    idplan_cobertura: 0,
  },
  {
    img: 'assets/svg/medico-a-domicilio.svg',
    title: 'Médico a Domicilio',
    link: 'teleconsulta',
    idcobertura: 13,
    idplan_cobertura: 0,
    idcertificado_asegurado: 0,
    disponible: true,
    tipo_flujo: 0,
  },
];

export interface Servicio {
  img: string;
  title: string;
  link: string;
  idcobertura: number;
  idplan_cobertura: number;
  idcertificado_asegurado: number;
  tipo_flujo: number;
  disponible: boolean;
}

export interface Doc {
  cod: number;
  desc: string;
}

export interface Departamento {
  depId: string;
  depNombre: string;
  provList: Array<Provincia>;
}

export interface Provincia {
  provId: string;
  provNombre: string;
  distList: Array<Distrito>;
}

export interface Distrito {
  distId: string;
  distNombre: string;
}

export interface Pais {
  pais: string;
  paisId: number;
  paisIso: string;
}

export interface User {
  correo: string;
  idusuario: number;
  username: string;
}

export interface Pagina {
  primero: number;
  ultimo: number;
  numero: number;
}

export interface Platform {
  id: number;
  img: string;
}

export const pfs: Array<Platform> = [
  {
    id: 1,
    img: '/assets/svg/logo-red-salud.svg',
  },
  {
    id: 2,
    img: '/assets/svg/logo-suma-salud.svg',
  },
];

export interface Enfermedad {
  descripcion: string;
  cirugia: boolean;
}
