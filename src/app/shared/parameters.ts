// Credenciales
const enviroments = {
  prod: {
    url_api: 'https://devbackasistencia.red-salud.pe/api',
  },
  dev: {
    url_api: 'https://devbackasistencia.red-salud.pe/api',
  },

  local : {
    url_api: 'http://localhost:5000/api',
  }
};

export const environment = enviroments.local;
