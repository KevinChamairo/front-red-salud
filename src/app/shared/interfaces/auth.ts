export interface Usuario {
  email: string;
  id: number;
  name: string;
  username: string;
}

export interface Modulo {
  id: number;
  name: string;
  views: Vista[];
}

export interface Vista {
  id: number;
  name: string;
}

export interface Imagen {
  key: string;
  img: string;
}

export const imgs: Array<Imagen> = [
  {
    key: 'Contabilidad',
    img: 'assets/svg/atencion-al-cliente.svg',
  },
  {
    key: 'Mesa de Partes',
    img: 'assets/svg/ventas.svg',
  },
];
