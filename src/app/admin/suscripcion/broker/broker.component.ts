import { Component, OnInit } from '@angular/core';

import {
  AfiliadoBroker,
  ClienteBroker,
  ClientePlanBroker,
  FrecuenciaPlanBroker,
  PlanBroker,
} from '../../shared/interfaces/comercial';
import { Doc, docs } from '../../shared/interfaces/utils';
import * as XLSX from 'xlsx';
import { BrokerService } from '../services/broker/broker.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/interfaces/auth';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.scss'],
})
export class BrokerComponent implements OnInit {
  // constructor() { }

  // ngOnInit(): void {
  // }
  public filtro: string = '';
  public afi: Array<AfiliadoBroker> = [];

  public file: File;
  public nombre_trama: string = '';
  public arrayBuffer: any;
  public filelist: any;
  public afiliados: Array<AfiliadoBroker> = [];

  public afiliados_send: Array<Array<AfiliadoBroker>> = [];

  public clientes: Array<ClienteBroker> = [];
  public cliente: ClientePlanBroker = {
    idcliente: 0,
    nombre: '',
    planes: [],
    ruc: '',
  };
  public plan: PlanBroker = {
    frecuencias: [],
    idcliente_plan: 0,
    idplan: 0,
    plan: '',
    edad_maxima: 0,
    tipo_procesamiento: 0,
  };
  public user: Usuario;
  public frecuencia: FrecuenciaPlanBroker = {
    descripcion: '',
    eventos: 0,
    iddescuento: 0,
    idprecio: 0,
    idperiodo: 0,
    max_polizas: 0,
    moneda: '',
    precio: 0,
    precio_final: 0,
    valor_descuento: '',
  };
  // public grupo: number = 5;
  public grupo: number = 10;

  public page: number;

  public docs: Array<Doc> = docs;
  public loading: boolean = false;
  public brokerFG: FormGroup = new FormGroup({});
  public tipo_trama: number = 0;

  constructor(
    private service: BrokerService,
    private fb: FormBuilder,
    private sharedservice: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.brokerFG = this.fb.group({
      cliente: [0, [Validators.required, Validators.min(1)]],
      plan: [
        { value: 0, disabled: true },
        [Validators.required, Validators.min(1)],
      ],
      frecuencia: [
        { value: 0, disabled: true },
        [Validators.required, Validators.min(1)],
      ],
      contratante: [0, [Validators.required, Validators.min(1)]],
      tipo: [0, [Validators.required, Validators.min(1)]],
      inicio_vigencia: [0, [Validators.required]],
      fin_vigencia: [0, [Validators.required]],
    });
    this.listarClientes();
  }

  filtrar(): void {
    this.page = 1;
    this.afiliados = this.afi;
    this.afiliados = this.afiliados.filter(
      (data) =>
        data.tipo_documento
          .toString()
          .toLowerCase()
          .includes(this.filtro.toLowerCase()) ||
        data.nro_documento
          .toString()
          .toLowerCase()
          .includes(this.filtro.toLowerCase()) ||
        `${data.nombre1} ${data.nombre2} ${data.apellido_paterno} ${data.apellido_materno} `
          .toString()
          .toLowerCase()
          .includes(this.filtro.toLowerCase()) ||
        data.fecha_nacimiento
          .toString()
          .toLowerCase()
          .includes(this.filtro.toLowerCase()) ||
        data.parentesco
          .toString()
          .toLowerCase()
          .includes(this.filtro.toLowerCase()) ||
        data.tipo.toString().toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  addfile(event: any): void {
    this.file = event.target.files[0];
    console.log(this.file.name);
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      let data = new Uint8Array(this.arrayBuffer);
      let arr = new Array();
      for (let i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      let bstr = arr.join('');
      let workbook = XLSX.read(bstr, { type: 'binary' });
      let first_sheet_name = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[first_sheet_name];
      let arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.filelist = arraylist;
      if (this.brokerFG.controls.contratante.value == 1) {
        if (this.validateStruct1(this.filelist[0]))
          for (const f of this.filelist)
            if (this.validateFields1(f))
              this.afiliados.push({
                tipo_documento: f.tipo_documento,
                nro_documento: f.nro_documento.toString(),
                apellido_paterno: f.apellido_paterno,
                apellido_materno: f.apellido_materno,
                nombre1: f.nombre1,
                nombre2: f.nombre2 != undefined ? f.nombre2 : '',
                fecha_nacimiento: f.fecha_nacimiento.toString(),
                parentesco: f.parentesco,
                sexo: f.sexo,
                nacionalidad: f.nacionalidad,
                direccion: f.direccion != undefined ? f.direccion : '',
                departamento: f.departamento != undefined ? f.departamento : '',
                provincia: f.provincia != undefined ? f.provincia : '',
                distrito: f.distrito != undefined ? f.distrito : '',
                celular: f.celular.toString(),
                email: f.email,
                tipo: f.tipo,
              });
            else {
              this.afiliados = [];
              alert('Datos requeridos vacíos en trama');
            }
        else {
          this.afiliados = [];
          alert('Estructura de trama incorrecta');
        }
      } else {
        if (this.validateStruct2(this.filelist[0]))
          for (const f of this.filelist)
            if (this.validateFields2(f))
              this.afiliados.push({
                tipo_documento: f.tipo_documento,
                nro_documento: f.nro_documento.toString(),
                apellido_paterno: f.apellido_paterno,
                apellido_materno: f.apellido_materno,
                nombre1: f.nombre1,
                nombre2: f.nombre2 != undefined ? f.nombre2 : '',
                fecha_nacimiento: f.fecha_nacimiento.toString(),
                parentesco: f.parentesco,
                sexo: f.sexo,
                nacionalidad: f.nacionalidad,
                direccion: f.direccion != undefined ? f.direccion : '',
                departamento: f.departamento != undefined ? f.departamento : '',
                provincia: f.provincia != undefined ? f.provincia : '',
                distrito: f.distrito != undefined ? f.distrito : '',
                celular: f.celular.toString(),
                email: f.email,
                tipo: f.tipo,
              });
            else {
              this.afiliados = [];
              alert('Datos requeridos vacíos en trama');
              return;
            }
        else {
          this.afiliados = [];
          alert('Estructura de trama incorrecta');
        }
      }
      this.afi = this.afiliados;
      this.nombre_trama = this.file.name;

      if (this.brokerFG.controls.contratante.value == 1) {
        this.agrupar1();
      } else {
        this.agrupar2();
        this.validarTrama();
      }
    };
    event.target.value = '';
  }

  // Para validar la estructura de la trama en el tipo de contratante 1
  validateStruct1(a: AfiliadoBroker): boolean {
    if (
      !a.tipo_documento ||
      !a.nro_documento ||
      !a.apellido_paterno ||
      !a.apellido_materno ||
      !a.nombre1 ||
      !a.fecha_nacimiento ||
      !a.sexo ||
      !a.nacionalidad ||
      !a.direccion ||
      !a.departamento ||
      !a.provincia ||
      !a.distrito ||
      !a.celular ||
      !a.email ||
      !a.parentesco ||
      !a.tipo
    )
      return false;
    return true;
  }

  // Para validar la estructura de la trama en el tipo de contratante 2
  validateStruct2(a: AfiliadoBroker): boolean {
    if (
      !a.tipo_documento ||
      !a.nro_documento ||
      !a.apellido_paterno ||
      !a.apellido_materno ||
      !a.nombre1 ||
      !a.fecha_nacimiento ||
      !a.sexo ||
      !a.nacionalidad ||
      !a.direccion ||
      !a.departamento ||
      !a.provincia ||
      !a.distrito ||
      !a.celular ||
      !a.email ||
      !a.tipo
    )
      return false;
    return true;
  }

  // Para validar los campos de la trama en el tipo de contratante 1
  validateFields1(a: AfiliadoBroker): boolean {
    if (
      a.tipo_documento == undefined ||
      a.nro_documento == undefined ||
      a.apellido_paterno == undefined ||
      a.apellido_materno == undefined ||
      a.nombre1 == undefined ||
      a.fecha_nacimiento == undefined ||
      a.sexo == undefined ||
      a.nacionalidad == undefined ||
      // a.direccion == undefined ||
      // a.departamento == undefined ||
      // a.provincia == undefined ||
      // a.distrito == undefined ||
      a.celular == undefined ||
      a.email == undefined ||
      a.parentesco == undefined ||
      a.tipo == undefined
    )
      return false;
    return true;
  }

  // Para validar los campos de la trama en el tipo de contratante 2
  validateFields2(a: AfiliadoBroker): boolean {
    if (
      a.tipo_documento == undefined ||
      a.nro_documento == undefined ||
      a.apellido_paterno == undefined ||
      a.apellido_materno == undefined ||
      a.nombre1 == undefined ||
      a.fecha_nacimiento == undefined ||
      a.sexo == undefined ||
      a.nacionalidad == undefined ||
      // a.direccion == undefined ||
      // a.departamento == undefined ||
      // a.provincia == undefined ||
      // a.distrito == undefined ||
      a.celular == undefined ||
      a.email == undefined ||
      a.tipo == undefined
    )
      return false;
    return true;
  }

  // Listar clientes para seleccionar
  listarClientes(): void {
    this.loading = true;
    this.service.listarClientes().subscribe((data: any) => {
      this.loading = false;
      this.clientes = data.clientes;
    });
  }

  // Listar planes para seleccionar
  listarPlanes(): void {
    let idcliente = this.brokerFG.controls.cliente.value;
    this.brokerFG.controls.plan.setValue(0);
    this.brokerFG.controls.frecuencia.setValue(0);
    this.brokerFG.get('frecuencia')?.disable();
    this.loading = true;
    this.service.listarPlanes(idcliente).subscribe((data: any) => {
      this.loading = false;
      this.cliente = data.cliente;
      this.brokerFG.get('plan')?.enable();
    });
  }

  // Seleccionar plan
  setPlan(): void {
    this.brokerFG.controls.frecuencia.setValue(0);
    this.frecuencia = {
      descripcion: '',
      eventos: 0,
      iddescuento: 0,
      idprecio: 0,
      idperiodo: 0,
      max_polizas: 0,
      moneda: '',
      precio: 0,
      precio_final: 0,
      valor_descuento: '',
    };
    let idplan = this.brokerFG.controls.plan.value;
    this.plan = this.cliente.planes.filter((p) => p.idplan == idplan)[0];
    this.brokerFG.get('frecuencia')?.enable();
  }

  // Seleccionar frecuencia
  setFrecuencia(): void {
    let idprecio = this.brokerFG.controls.frecuencia.value;
    this.frecuencia = this.plan.frecuencias.filter(
      (f) => f.idprecio == idprecio
    )[0];
  }
  // Para el tipo de contratante 2
  agrupar2(): void {
    if (
      this.afiliados[0].tipo == 'CONTRATANTE' ||
      this.afiliados[0].tipo == 'CONTRATANTE Y AFILIADO'
    ) {
      let i = 0;
      for (let z = 0; z < this.afiliados.length; z++) {
        if (this.afiliados[z].tipo == 'CONTRATANTE') {
          // this.afiliados[z].parentesco = '';
          this.afiliados_send[i] = [];
          this.afiliados_send[i].push(this.afiliados[z]);
          i++;
        } else if (this.afiliados[z].tipo == 'AFILIADO') {
          this.afiliados_send[i - 1].push(this.afiliados[z]);
        } else if (this.afiliados[z].tipo == 'CONTRATANTE Y AFILIADO') {
          this.afiliados_send[i] = [];
          this.afiliados_send[i].push(this.afiliados[z]);
          i++;
        }
      }
    } else {
      this.afiliados = [];
      alert(
        `Error en la trama: La trama debe empezar con un "contratante" o "contratante y afiliado"`
      );
    }
  }

  aea(): void {
    let fecha = this.brokerFG.controls.inicio_vigencia.value
      .toLocaleDateString()
      .split('/');
    console.log(`${fecha[2]}-${fecha[1]}-${fecha[0]}`);
  }

  // Validar trama para el tipo de contratante 2
  validarTrama(): boolean {
    for (const e of this.afiliados_send) {
      // cuando solo hay un contrantante sin afiliados
      if (e[0].tipo == 'CONTRATANTE' && e.length <= 1) {
        this.afiliados = [];
        alert(
          `Error en el grupo ${
            this.afiliados_send.indexOf(e) + 1
          }: Grupo con solo un contratante`
        );
        return false;
      }
      // cuando un contratante y afiliado no es titular
      if (
        e[0].tipo == 'CONTRATANTE Y AFILIADO' &&
        e[0].parentesco != 'TITULAR'
      ) {
        this.afiliados = [];
        alert(
          `Error en el grupo ${
            this.afiliados_send.indexOf(e) + 1
          }: Contratante y afiliado debe ser titular`
        );
        return false;
      }
      // cuando hay un contratante con parentesco
      if (e[0].tipo == 'CONTRATANTE' && e[0].parentesco != undefined) {
        this.afiliados = [];
        alert(
          `Error en el grupo ${
            this.afiliados_send.indexOf(e) + 1
          }: Contratante no puede tener parentesco`
        );
        return false;
      }
      // cuando el primer afiliado no es titular
      if (e[0].tipo == 'CONTRATANTE' && e[1].parentesco != 'TITULAR') {
        this.afiliados = [];
        alert(
          `Error en el grupo ${
            this.afiliados_send.indexOf(e) + 1
          }: El primer afiliado debe ser titular`
        );
        return false;
      }
      // cuando hay más de un titular
      let t = e.filter((a) => a.parentesco == 'TITULAR');
      if (t.length > 1) {
        this.afiliados = [];
        alert(
          `Error en el grupo ${
            this.afiliados_send.indexOf(e) + 1
          }: Solo puede haber un titular`
        );
        return false;
      }
      // darle parentezco '' a contratante
      if (e[0].tipo == 'CONTRATANTE') {
        e[0].parentesco = '';
      }
    }
    return true;
  }

  // Para el tipo de contratante 1
  agrupar1(): void {
    if (this.validateTipo1(this.afiliados)) {
      alert('El tipo de registro debe ser "AFILIADO"');
      this.afiliados = [];
    } else {
      let i = 0;
      for (const a of this.afiliados) {
        if (a.parentesco == 'TITULAR') {
          this.afiliados_send[i] = [];
          this.afiliados_send[i].push(a);
          i++;
        } else {
          this.afiliados_send[i - 1].push(a);
        }
      }
    }
  }

  validateTipo1(arr: any): boolean {
    for (const e of arr) {
      if (e.tipo == 'CONTRATANTE' || e.tipo == 'CONTRATANTE Y AFILIADO') {
        return true;
      }
    }
    return false;
  }

  // Adición de campo grupo en la tabla de los afiliados
  grupoafi(a: AfiliadoBroker): number {
    let n = 0;
    for (const g of this.afiliados_send) {
      for (const af of g) {
        if (a == af) {
          n = this.afiliados_send.indexOf(g) + 1;
        }
      }
    }
    return n;
  }

  // Definir grupos de afiliados
  procesarAfiliados(): void {
    this.loading = true;

    this.user = JSON.parse(this.sharedservice.getUsuario());
    this.tipo_trama = this.brokerFG.controls.tipo.value;

    let fecha = this.brokerFG.controls.inicio_vigencia.value
      .toLocaleDateString()
      .split('/');

    let fecha2 = this.brokerFG.controls.fin_vigencia.value
      .toLocaleDateString()
      .split('/');

    this.service
      .procesarAfiliados(
        this.afiliados_send,
        this.plan.idplan,
        this.cliente.idcliente,
        this.frecuencia.idprecio,
        this.frecuencia.idperiodo,
        this.brokerFG.controls.contratante.value,
        this.nombre_trama,
        this.user.id,
        this.tipo_trama,
        this.frecuencia.precio_final,
        `${fecha[2]}-${fecha[1]}-${fecha[0]}`,
        `${fecha2[2]}-${fecha2[1]}-${fecha2[0]}`
      )
      .subscribe((data: any) => {
        if (data.error) {
          this.loading = false;
          alert(data.error);
        } else {
          alert('Se procesaron los afiliados');
          this.loading = false;
          this.router.navigate(['admin']);
        }
      });
  }

  // Validar edad del contratante
  validateEdadContratante(f: string): boolean {
    let s = true;
    let hoy = new Date();
    let cumpleanos = new Date(
      `${f[4]}${f[5]}${f[6]}${f[7]},${f[2]}${f[3]},${f[0]}${f[1]}`
    );
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    if (edad < 18) {
      s = false;
    }
    return s;
  }

  // Validar edad del afiliado
  validateEdadAfiliado(f: string): boolean {
    let s = true;
    let hoy = new Date();
    let cumpleanos = new Date(
      `${f[4]}${f[5]}${f[6]}${f[7]},${f[2]}${f[3]},${f[0]}${f[1]}`
    );
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    if (edad > this.plan.edad_maxima) {
      s = false;
    }
    return s;
  }

  // Retornar fecha
  buildFecha(f: string): string {
    return `${f[0]}${f[1]}/${f[2]}${f[3]}/${f[4]}${f[5]}${f[6]}${f[7]}`;
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
 }
