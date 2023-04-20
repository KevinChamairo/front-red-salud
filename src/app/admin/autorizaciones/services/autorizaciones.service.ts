import { bodyBusqueda,Autorizacion } from './../interfaces/autorizaciones.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/shared/parameters';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AutorizacionesService {
  url = environment.url_api;
  constructor( private http: HttpClient) { }

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
  consultarAfiliado(bodyBusqueda: bodyBusqueda): any{

    let url = `${this.url}/autorizaciones/busqueda`;
    return this.http
      .post(url, bodyBusqueda,{
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }

  coberturasporMotivo(bodyProducto: any): any{

    let url = `${this.url}/autorizaciones/coberturasbymotivo`;
    return this.http
      .post(url, bodyProducto,{
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }



  productoporID(bodyProducto: any): any{

    let url = `${this.url}/autorizaciones/productsbyId`;
    return this.http
      .post(url, bodyProducto,{
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }

  cargarExpediente( files: File,name:string): any {
    const formularioFile = new FormData()
    // let url = `https://pruebapg.globalredsalud.com/api/admin/ecommerce/uploadFile`;
    let url = `${this.url}/autorizaciones/uploadFile`;

    // let url2 = `https://backend.globalredsalud.com/api/admin/ecommerce/uploadFile`;
    formularioFile.append('file_obj', files,name)
    return this.http
      .post(
        url,
        formularioFile,
        {
          headers: this.headers3,
        }
      )
      .pipe(map((data) => data));
  }

  diagnostico(data2:any):any{

    let url = `${this.url}/autorizaciones/getDiagnosticos`;
    return this.http
    .post(url,data2,{
      headers: this.headers,
    })
    .pipe(map((data) => data));
  }



  getProveedores():any{
    let url = `${this.url}/autorizaciones/proveedores`;
    return this.http
    .get(url,{
      headers:this.headers
    })
    .pipe(map((data) => data));

  }


  generarAutorizacion(autorizacion: Autorizacion):any{
    let url = `${this.url}/autorizaciones/registerAutorizacion`;


    // let url = `${this.url}/autorizaciones/productsbyId`;
    try {
      return this.http
      .post(url, autorizacion,{
        headers: this.headers,
      })
      .pipe(map((data) => data));

    } catch (error) {
      return null
    }





  }



}
