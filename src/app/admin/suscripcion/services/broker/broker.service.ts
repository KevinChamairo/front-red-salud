import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { Utils } from 'src/app/shared/utils';
import { map } from 'rxjs/operators';
import { AfiliadoBroker } from 'src/app/admin/shared/interfaces/comercial';
import { Utils } from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class BrokerService {
  constructor(private http: HttpClient) {}

  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
  };

  listarClientes(): any {
    let url = `${Utils.url_dev}/admin/suscripcion/broker/listarClientes`;
    return this.http
      .get(url, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }

  listarPlanes(idcliente: number): any {
    let url = `${Utils.url_dev}/admin/suscripcion/broker/listarPlanes/${idcliente}`;
    return this.http
      .get(url, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }

  procesarAfiliados(
    afiliados: Array<Array<AfiliadoBroker>>,
    idplan: number,
    idcliente: number,
    idprecio: number,
    idperiodo: number,
    tipo_afiliacion: number,
    nombre_trama: string,
    idusuario: number,
    tipo_trama: number,
    importe: number,
    ini_vigencia: string,
    fin_vigencia: string
  ): any {
    let url = `${Utils.url_dev}/admin/suscripcion/broker/procesarAfiliados`;
    return this.http
      .post(
        url,
        {
          afiliados,
          idplan,
          idcliente,
          idprecio,
          idperiodo,
          tipo_afiliacion,
          nombre_trama,
          idusuario,
          tipo_trama,
          importe,
          ini_vigencia,
          fin_vigencia,
        },
        {
          headers: this.headers,
        }
      )
      .pipe(map((data) => data));
  }
}

