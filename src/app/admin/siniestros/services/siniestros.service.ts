import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/shared/parameters';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SiniestrosService {
  url = environment.url_api;
  constructor( private http:HttpClient) { }

  private tokenDev = '08c976e8-e8bd-4493-b3fa-bddc3804f9af'

  private authToken = '08c976e8-e8bd-4493-b3fa-bddc3804f9af'

  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',


    Authorization: `Bearer ${this.authToken}`,
  };

  headers2 = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',



  };


  headers3 = {

    'Access-Control-Allow-Credentials': 'true',

    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${this.authToken}`,
  };



  listaRegistro():any{
    let url = `${this.url}/siniestros/registro_gasto/lista_registros`;
    return this.http
    .get(url,{
      headers:this.headers
    })
    .pipe(map((data) => data));

  }
  rechazarFactura(data:any):any{
    let url = `${this.url}/siniestros/registro_gasto/recepcion`;
    return this.http
    .post(url,data,{
      headers:this.headers
    })
    .pipe(map((data) => data));

  }
}
