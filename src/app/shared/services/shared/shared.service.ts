import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utils } from '../../utils';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  headers2 = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
  };

  constructor(private http: HttpClient) {}

  setStorage(i: any, key: string): void {
    localStorage.setItem(key, i.toString());
  }

  getStorage(key: string): any {
    return localStorage.getItem(key);
  }
  setSesionStorage(i: any, key: string): void {
    sessionStorage.setItem(key, i.toString());
  }
  getSesionStorage(key: string): any {
    return sessionStorage.getItem(key);
  }

  deleteStorage(key: string): void {
    localStorage.removeItem(key);
  }

  getModulos(): any {
    return localStorage.getItem('modulos');
  }

  getUsuario(): any {
    return localStorage.getItem('usuario');
  }

  getPaises(): any {
    return localStorage.getItem('paises');
  }

  getUbigeos(): any {
    return localStorage.getItem('ubigeos');
  }

  getUsers(): any {
    return localStorage.getItem('usuarios');
  }

  listPaises(): any {
    let url_api = `${Utils.url_dev}/admin/registrar-llamada-ventas/paises`;
    return this.http.get(url_api).pipe(map((data) => data));
  }

  listUbigeos(): any {
    let url_api = `${Utils.url_dev}/admin/registrar-llamada-ventas/ubigeos`;
    return this.http.get(url_api).pipe(map((data) => data));
  }

  listUsers(): any {
    let url_api = `${Utils.url_dev}/admin/atencion-cliente/contrato/getUsuarios`;
    return this.http.get(url_api).pipe(map((data) => data));
  }

  searchDni(dni: string): any {
    let url_api = `${Utils.url_dev}/cliente/dni`;
    return this.http.post(url_api, { dni: dni }).pipe(map((data) => data));
  }

  searchRuc(ruc: string): any {
    let url_api = `${Utils.url_dev}/cliente/ruc`;
    return this.http.post(url_api, { ruc: ruc }).pipe(map((data) => data));
  }

  searchModulo(m: string): boolean {
    let value = false;

    for (let md of JSON.parse(this.getModulos())) {
      if (md.name == m) {
        value = true;
      }
    }

    return value;
  }

  consultPlatform(idusuario: number): any {
    let url_api = `${Utils.url_holding}/consultPlatform`;
    return this.http.post(url_api, { idusuario }).pipe(map((data) => data));
  }
}
