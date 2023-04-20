import { Injectable } from '@angular/core';
import { buscarDoc, Documentosrecibidos, Formulario2, ConsultarRUC, ConsultarOA,Formulario1, Cargo } from '../../interfaces/mesapartes.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../shared/parameters';
import { map } from 'rxjs/operators';
import { LocalStorageStoreService } from '../../../../auth/LocalStorage.service';

@Injectable({
  providedIn: 'root'
})
export class MesadepartesService {


  constructor(private http:HttpClient, private LocalStorage: LocalStorageStoreService) { }
  url = environment.url_api;
  
  private authToken = this.LocalStorage.getItem('token')

  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
 
    
    Authorization: `Bearer ${this.authToken}`,
  };
  headers2 = {

    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${this.authToken}`,
  };
  headers3 = {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${this.authToken}`,
  };

  listarDocumentos(fechas: buscarDoc): any{
    let url = `${this.url}/documents/buscar_doc`;
    return this.http
      .post(url, fechas, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }

  tipoDocumento(): any{
    let url = `${this.url}/documents/tipo`;
    return this.http
      .get(url, {
        headers: this.headers2,
      })
      .pipe(map((data) => data));
  }
  registrarDocumentoForm2( formulario1: Formulario2): any{
    let url = `${this.url}/documents/registrar_doc`;
    return this.http
      .post(url, formulario1,{
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }
  
  consultarRuc(bodyRuc: ConsultarRUC): any{

    let url = `${this.url}/documents/ruc`;
    return this.http
      .post(url, bodyRuc,{
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }

  consultarOA(bodyOA: ConsultarOA): any{
    let url = `${this.url}/documents/oa`;
    return this.http
      .post(url, bodyOA,{
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }
  registrarDocumentoForm1( formulario1: Formulario1): any{
    let url = `${this.url}/documents/registrar_doc`;
    return this.http
      .post(url, formulario1,{
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }
  generarCargo( cargoBodyQuest: Cargo): any{
    let url = `${this.url}/documents/generar_cargo`;
    return this.http
      .post(url, cargoBodyQuest,{
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }


  uloadFile2( files: File, ): any {
    const formularioFile = new FormData()
    let url = `https://pruebapg.globalredsalud.com/api/admin/ecommerce/uploadFile`;
    // let url2 = `https://backend.globalredsalud.com/api/admin/ecommerce/uploadFile`;
    formularioFile.append('file_obj', files,'gaea.png')
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
  uloadFile3( files: File, name:string): any {
    const formularioFile = new FormData()
    // let url = `https://pruebapg.globalredsalud.com/api/admin/ecommerce/uploadFile`;
    let url = `${this.url}/documents/uploadFile`;
    
    // let url2 = `https://backend.globalredsalud.com/api/admin/ecommerce/uploadFile`;
    formularioFile.append('file_obj', files,name)
    return this.http
      .post(
        url,
        formularioFile,
        {
          headers: this.headers2,
        }
      )
      .pipe(map((data) => data));
  }
}
