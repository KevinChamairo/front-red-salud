import {
  buscarCe,
  buscarCgene,
  ComprobanteM,
  GenerarCB,
  putEmision,
  UpdateGlosa,
} from './../../interfaces/ventas.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { buscarCm } from '../../interfaces/ventas.interface';
import { environment } from '../../../../shared/parameters';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  constructor(private http: HttpClient) {}

  url = environment.url_api;

  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer 9cd972cb-c689-450e-8b7d-5cf47036b228',
  };

  listarseries(): any {
    let url = `${this.url}/accounting/series`;
    return this.http
      .get(url, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }
  descargarPdfbycorrelativo(bill_id: number): any {
    let url = `${this.url}/accounting/pdf/${bill_id}`;
    return this.http
      .get(url, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }

  updatefechaEmision(fe: putEmision): any {
    let url = `${this.url}/accounting/bills/date`;
    return this.http
      .put(url, fe, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }

  upglosa(glo: UpdateGlosa): any {
    let url = `${this.url}/accounting/bills/note`;
    return this.http
      .put(url, glo, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }

  extraerDni(dni: number): any {
    let url = `${this.url}/dni`;
    return this.http
      .post(
        url,
        {
          dni,
        },
        {
          headers: this.headers,
        }
      )
      .pipe(map((data) => data));
  }
  extraerRuc(ruc: string): any {
    let url = `${this.url}/ruc`;
    return this.http
      .post(
        url,
        {
          ruc,
        },
        {
          headers: this.headers,
        }
      )
      .pipe(map((data) => data));
  }
  obtCorrelativo(serie_id: number): any {
    let url = `${this.url}/accounting/correlative`;
    return this.http
      .post(
        url,
        {
          serie_id,
        },
        {
          headers: this.headers,
        }
      )
      .pipe(map((data) => data));
  }
  generarCm(dato: ComprobanteM): any {
    let url = `${this.url}/accounting/correlative`;
    return this.http
      .post(url, dato, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }
  buscarCm(datoo: buscarCm): any {
    let url = `${this.url}/accounting/charges`;
    return this.http
      .post(url, datoo, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }
  buscarCe(datoCe: buscarCe): any {
    let url = `${this.url}/accounting/bills?status=enviados`;
    return this.http
      .post(url, datoCe, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }
  buscarCgene(datoCge: buscarCgene): any {
    let url = `${this.url}/accounting/bills`;
    return this.http
      .post(url, datoCge, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }

  GenerarComprobanteBoleta(data: GenerarCB): any {
    let url = `${this.url}/accounting/vouchers/generate`;
    return this.http
      .post(url, data, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }
}
