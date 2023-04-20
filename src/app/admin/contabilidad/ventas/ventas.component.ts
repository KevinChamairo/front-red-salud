import { sha1 } from '@angular/compiler/src/i18n/digest';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  series,
  ComprobanteM,
  buscarCm,
  GenerarCB,
  ComprobantesGenerados,
  putEmision,
  UpdateGlosa,
  Datocobro1,
  FacturasGeneradas,
} from '../interfaces/ventas.interface';
import { VentasService } from '../services/ventas/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  constructor(private services: VentasService, private fb: FormBuilder) {}

  public actual: Date = new Date();
  public v: ComprobantesGenerados[] = [];
  public type_doc: number = 0;
  public correcon: number = 0;
  public nuevaGlosa: string = '';
  public ruc: string = '';
  public rs: string = '';
  public upfechaemision: Date = new Date();
  public esta!: any;
  public nupdf: number = 0;
  public form: string = '';
  public importeTotal: number = 0;
  public importeFac: number = 0;
  public loading: boolean = false;
  public tipo: string = 'emisión';
  public select1: number = 0;
  public conca: boolean = false;
  public edidate: boolean = false;
  public editglosa: boolean = false;
  public mostrartabla: boolean = false;
  public mostrartablafc: boolean = false;
  public mostrartablaCg: boolean = false;
  public mostrarAnexosConar: boolean = false;
  public mostrartablaCenviados: boolean = false;
  public dataComprobantesAutomaticos: any[] = [];
  public dataComprobantesGenerados: ComprobantesGenerados[] = [];
  public dataFacturasGenerados: FacturasGeneradas[] = [];
  public dataComprobantesEnviados: any[] = [];
  public dataComprobantesEnviadosNu: any[] = [];
  public dataComprobantesEnviados1: any[] = [];
  public dataComprobantesEnviados2: any[] = [];
  public dataComprobantesEnviados3: any[] = [];
  public dataComprobantesEnviados4: any[] = [];
  public dataComprobantesEnviados5: any[] = [];
  public datocobro: series[] = [];
  public grupo: number = 10;
  public page: number = 0;
  public grupo2: number = 10;
  public grupo4: number = 10;
  public grupo6: number = 10;
  public page2: number = 0;
  public page4: number = 0;
  public page6: number = 0;
  public enviadosBool: boolean = false;
  public generadosBool: boolean = false;
  public co: number[] = [];

  formu = this.fb.group({
    sele1: [
      { value: 0, disabled: false },
      [Validators.required, Validators.min(-2)],
    ],
    sele2: [
      { value: 0, disabled: false },
      [Validators.required, Validators.min(-2)],
    ],
  });

  // buscar concar
  anexos = this.fb.group({
    anexo1: [
      { value: 0, disabled: false },
      [Validators.required, Validators.minLength(6)],
    ],
    anexo2: [
      { value: '', disabled: false },
      [Validators.required, Validators.minLength(9)],
    ],
  });

  desa(): boolean {
    let v = false;
    if (this.formu.get('sele1')?.value == 0) {
      v = true;
    } else {
      v = false;
    }
    return v;
  }

  forCm = this.fb.group({
    tipoDoc: [
      { value: '0', disabled: false },
      [Validators.required, Validators.min(0)],
    ],
    NumeroDoc: [
      { value: '0', disabled: true },
      [Validators.required, Validators.minLength(8)],
    ],
    RazonSocial: [
      { value: '', disabled: false },
      [Validators.required, Validators.minLength(9)],
    ],
    fecha: [
      { value: '', disabled: false },
      [Validators.required, Validators.minLength(9)],
    ],
    Moneda: [
      { value: '0', disabled: false },
      [Validators.required, Validators.min(0)],
    ],
    Importe: [
      { value: '0', disabled: false },
      [Validators.required, Validators.minLength(1)],
    ],
    SerieId: [
      { value: '0', disabled: false },
      [Validators.required, Validators.minLength(0)],
    ],
    Correlativo: [
      { value: '0', disabled: true },
      [Validators.required, Validators.minLength(5)],
    ],
    Direccion: [
      { value: '', disabled: false },
      [Validators.required, Validators.minLength(9)],
    ],
    Descripcion: [
      { value: '', disabled: false },
      [Validators.required, Validators.minLength(9)],
    ],
  });

  public SeriesSelect: series[] = [];

  ngOnInit(): void {
    this.loading = true;
    this.services.listarseries().subscribe((data: any) => {
      this.loading = false;
      this.SeriesSelect = data.data.series;
      console.log(this.SeriesSelect);
    });
  }

  change1() {
    this.select1 = this.formu.get('sele1')?.value;
    this.change2();
  }

  change2() {
    switch (this.select1) {
      case -1:
        if (this.formu.get('sele2')?.value == 3) {
          this.form = 'normal';
          this.tipo = 'emisión';
        }

        break;
      case -2:
        if (this.formu.get('sele2')?.value == 1) {
          this.form = 'manual';
        } else {
          this.form = 'normal';
        }
        break;
      default:
        let id = this.formu.get('sele1')?.value;
        this.type_doc = this.SeriesSelect.filter(
          (x) => x.id == id
        )[0].type_document;

        if (this.type_doc == 3) {
          this.form = 'normal';

          if (this.formu.get('sele2')?.value == 1) {
            this.tipo = 'cobro';
          } else if (this.formu.get('sele2')?.value == 3) {
            this.tipo = 'emisión';
            // console.log('tipo 3 select 2');
          }
        } else {
          if (this.formu.get('sele2')?.value == 1) {
            this.form = 'opcion';
            this.tipo = 'cobro';
            console.log(this.formu.get('sele1')?.value);
            let d: series[] = this.SeriesSelect.filter(
              (data) => data.id == this.formu.get('sele1')?.value
            );
            this.datocobro = d;
            // console.log('datocobro');
            // console.log(this.datocobro);
          } else {
            this.form = 'normal';
            this.tipo = 'emisión';
          }

          // opciones igual a clientes
        }

        break;
    }
  }

  // metodo para consumir las apis segun la boleta y segun la condiscion del segund select
  public method(e: any) {
    let o: buscarCm = {
      serie_id: this.select1,
      fecha_inicial: e.inicio,
      fecha_final: e.fin,
    };

    // console.log(o);
    if (this.formu.get('sele2')?.value == 1) {
      this.tipo == 'cobro';
      this.loading = true;
      this.services.buscarCm(o).subscribe((data: any) => {
        this.loading = false;
        this.mostrartabla = true;
        console.log(o);
        console.log('comprobantes por generar');

        // this.dataComprobantesAutomaticos = data.data.charges;
        this.dataComprobantesAutomaticos = data.data.charges;
        let importe = this.dataComprobantesAutomaticos.map(
          (data) => data.amount
        );
        let total = importe.reduce((a, b) => a + b, 0);
        console.log('importe', total);
        this.importeTotal = total;
        console.log(this.dataComprobantesAutomaticos);
        this.mostrartabla = true;
      });
    } else if (this.formu.get('sele2')?.value == 2) {
      this.tipo == 'emisión';
      this.loading = true;
      console.log(o);
      console.log('boleta con comprobantes generados ');
      this.services.buscarCgene(o).subscribe((data: any) => {
        this.loading = false;
        this.mostrartablaCg = true;
        this.dataComprobantesGenerados = data.data.bills;
        console.log(this.dataComprobantesGenerados);
      });
    } else if (this.formu.get('sele2')?.value == 3) {
      this.tipo = 'emisión';
      this.loading = true;
      this.services.buscarCe(o).subscribe((data: any) => {
        console.log('Boleta - Comprobantes Enviados');
        console.log(o);
        this.loading = false;
        this.dataComprobantesEnviados = data.data.bills;
        this.dataComprobantesEnviadosNu = data.data.bills;
        this.mostrarAnexosConar = true;
        this.mostrartablaCenviados = true;
        console.log(this.dataComprobantesEnviados);

        // console.log(data);
        // this.nupdf = data.data.bills.bill_id;

        // console.log(data.data.bills.bill_id);

        // this.services
        //   .descargarPdfbycorrelativo(this.nupdf)
        //   .subscribe((data: any) => {
        //     console.log(data);
        //   });
      });
    }
  }

  public meto2(e: any) {
    let of = {
      serie_id: this.select1,
      fecha_inicial: e.inicio,
      fecha_final: e.fin,
      op: e.op,
    };
    let ar = this.SeriesSelect.filter((data) => data.id == this.select1);
    let clientesf = ar[0].clients;
    let c = clientesf.filter((data) => data.type == of.op);
    console.log(c);
    this.ruc = c[0].document_id;
    this.rs = c[0].legal_name;
    let bu = {
      serie_id: this.select1,
      fecha_inicial: e.inicio,
      fecha_final: e.fin,
    };
    console.log('output');
    console.log(of);
    console.log(this.ruc);
    console.log(this.rs);
    this.loading = true;
    this.services.buscarCm(bu).subscribe((data: any) => {
      this.loading = false;
      this.mostrartablafc = true;
      this.dataFacturasGenerados = data.data.charges;
      console.log(this.dataFacturasGenerados);
    });
  }

  buspdf(bill_id: number) {
    console.log(bill_id);
    window.open(
      `https://devbackasistencia.red-salud.pe/api/accounting/pdf/${bill_id}`
    );
    // this.services.descargarPdfbycorrelativo(bill_id).subscribe(
    //   (data: any) => {
    //     console.log(data);

    //   },
    //   (er: any) => {
    //     console.log(er);
    //   }
    // );
  }

  GenerarComBoleta() {
    console.log('generar');
    let ge: GenerarCB = {
      serie_id: this.select1,
      charges: this.dataComprobantesAutomaticos,
    };
    this.services.GenerarComprobanteBoleta(ge).subscribe((data: any) => {
      console.log(data);
    });
  }

  getDni() {
    if (this.forCm.get('tipoDoc')?.value == 0) {
      this.forCm.get('NumeroDoc')?.disable();
    } else if (
      this.forCm.get('tipoDoc')?.value == 1 ||
      this.forCm.get('tipoDoc')?.value == 2
    ) {
      this.forCm.get('NumeroDoc')?.enable();
    }
  }

  conc() {
    this.conca == true;
    if (this.conca == false) {
      this.conca = true;
    } else {
      this.conca = false;
    }
  }
  editdate() {
    this.edidate == true;
    if (this.edidate == false) {
      this.edidate = true;
    } else {
      this.edidate = false;
      this.upfechaemision = this.actual;
    }
  }
  editglo() {
    this.editglosa == true;
    if (this.editglosa == false) {
      this.editglosa = true;
    } else {
      this.editglosa = false;
      this.nuevaGlosa = '';
    }
  }

  getDatos() {
    if (this.forCm.get('NumeroDoc')?.valid) {
      let dn = this.forCm.get('NumeroDoc')?.value;
      console.log(dn);
      if (this.forCm.get('tipoDoc')?.value == 1) {
        this.services.extraerDni(dn).subscribe((data: any) => {
          this.forCm.get('RazonSocial')?.enable();
          this.forCm.get('RazonSocial')?.patchValue(data.data.dni.nombre);
          console.log(data.data.dni);
        });
      } else if (this.forCm.get('tipoDoc')?.value == 2) {
        this.services.extraerRuc(dn).subscribe((data: any) => {
          this.forCm.get('RazonSocial')?.enable();
          this.forCm.get('RazonSocial')?.patchValue(data.data.ruc.nombre);
          console.log(data);
        });
      }
    }
  }

  obC() {
    if (this.forCm.get('SerieId')?.valid) {
      let se: number = parseInt(this.forCm.get('SerieId')?.value);
      console.log(se);
      this.services.obtCorrelativo(se).subscribe(
        (data: any) => {
          this.forCm.get('Correlativo')?.enable();
          this.forCm.get('Correlativo')?.patchValue(data.data.correlativo);
          console.log(data);
        },
        (er: any) => {
          console.log(er);
        }
      );
    }
  }

  RetornarFecha(fx: string): string {
    let f = fx.split('/');
    return `${f[2]}-${f[1]}-${f[0]}`;
  }
  verFecha() {
    let fecCm = this.forCm.get('fecha')?.value;
    //console.log(this.forCm.get('fecha')?.value);
    let actual: Date = new Date(fecCm);
    let feString = actual.toLocaleDateString();
    return this.RetornarFecha(feString);
  }

  //buscar anexos concar
  buscarConcar() {
    let data2 = this.anexos.get('anexo2')?.value;
    let a2: Date = new Date(data2);
    let feane2 = a2.toLocaleDateString();
    let nco = parseInt(this.anexos.get('anexo1')?.value);
    let oane = {
      data1: nco,
      data2: this.RetornarFecha(feane2),
    };

    console.log(oane);
  }

  sh() {
    this.verFecha();
    let dataa = this.forCm.value;
    dataa.fecha = this.verFecha();
    dataa.Importe = parseFloat(this.forCm.get('Importe')?.value);
    dataa.Moneda = parseInt(this.forCm.get('Moneda')?.value);
    let datacm: ComprobanteM = {
      serie_id: dataa.SerieId,
      correlativo: dataa.Correlativo,
      descripcion: dataa.Descripcion,
      direccion: dataa.Direccion,
      fecha: dataa.fecha,
      id_moneda: dataa.Moneda,
      importe: dataa.Importe,
      numero_doc: dataa.NumeroDoc,
      razon_social: dataa.RazonSocial,
      tipo_doc: dataa.tipoDoc,
    };
    console.log(datacm);
    this.services.generarCm(datacm).subscribe((data: any) => {
      console.log(data);
    });
  }

  selectall(list: any, tipo: string) {
    switch (tipo) {
      case 'enviados':
        if (this.enviadosBool == false) {
          list.forEach((element: any) => {
            element.selected = false;
          });
          this.v = [];
        } else {
          list.forEach((element: any) => {
            element.selected = true;
            if (!this.v.includes(element)) {
              this.v.push(element);
            }
          });
        }
        console.log(this.v);
        break;
      case 'generados':
        if (this.generadosBool == false) {
          list.forEach((element: any) => {
            element.selected = false;
          });
          this.v = [];
        } else {
          list.forEach((element: any) => {
            element.selected = true;
            if (!this.v.includes(element)) {
              this.v.push(element);
            }
          });
        }
        console.log(this.v);
        break;
    }
  }

  selectindividual(item: any, tipo: string) {
    switch (tipo) {
      case 'enviados':
        if (item.selected == false) {
          this.enviadosBool = false;
          let i = this.v.indexOf(item);
          this.v.splice(i, 1);
        } else {
          if (!this.v.includes(item)) {
            this.v.push(item);
          }
        }
        console.log(this.v);

        break;
      case 'generados':
        if (item.selected == false) {
          this.generadosBool = false;
          let i = this.v.indexOf(item);
          this.v.splice(i, 1);
        } else {
          if (!this.v.includes(item)) {
            this.v.push(item);
          }
        }
        console.log(this.v);
    }
  }

  emitir() {
    console.log('data');
    console.log(this.dataComprobantesGenerados);

    console.log('selec');
    console.log(this.v);
    console.log(this.v);
  }

  // filtrado por estado

  estado() {
    let estadoTabla = parseInt(this.esta);
    console.log(parseInt(this.esta));
    if (estadoTabla == 1) {
      this.dataComprobantesEnviados1 = this.dataComprobantesEnviadosNu;
      this.dataComprobantesEnviados = this.dataComprobantesEnviados1;
      console.log('todos');
      console.log(this.dataComprobantesEnviados);
    } else if (estadoTabla == 2) {
      this.dataComprobantesEnviados2 = this.dataComprobantesEnviadosNu.filter(
        (data) => data.status == 'Emitido'
      );
      console.log('filtro1');

      console.log(this.dataComprobantesEnviados2);
      this.dataComprobantesEnviados = this.dataComprobantesEnviados2;
      console.log('tabla ren emitido');
      console.log(this.dataComprobantesEnviados);
    } else if (estadoTabla == 4) {
      this.dataComprobantesEnviados4 = this.dataComprobantesEnviadosNu.filter(
        (data) => data.status == 'Rechazado'
      );
      this.dataComprobantesEnviados = this.dataComprobantesEnviados4;
      console.log('filtro4');
      console.log(this.dataComprobantesEnviados4);
      console.log(this.dataComprobantesEnviados);
    } else if (estadoTabla == 3) {
      this.dataComprobantesEnviados3 = this.dataComprobantesEnviadosNu.filter(
        (data: any) => data.status == 'En Proceso'
      );
      this.dataComprobantesEnviados = this.dataComprobantesEnviados3;
      console.log('en proceso');
      console.log(this.dataComprobantesEnviados3);
      console.log(this.dataComprobantesEnviados);
    } else if (estadoTabla == 5) {
      this.dataComprobantesEnviados5 = this.dataComprobantesEnviadosNu.filter(
        (data: any) => data.status == 'Anulado'
      );
      this.dataComprobantesEnviados = this.dataComprobantesEnviados5;
      console.log('anulado');
      console.log(this.dataComprobantesEnviados5);
      console.log(this.dataComprobantesEnviados);
    }
  }

  butonAnular(): boolean {
    let r = false;
    if (
      parseInt(this.esta) == 2 ||
      parseInt(this.esta) == 3 ||
      parseInt(this.esta) == 4
    ) {
      r = true;
    } else {
      r = false;
    }
    return r;
  }
  butonActualizarEstado(): boolean {
    let r = false;
    if (parseInt(this.esta) == 3 || parseInt(this.esta) == 4) {
      r = true;
    } else {
      r = false;
    }
    return r;
  }

  // editar fecha de emision
  upfeemi() {
    let emi = this.upfechaemision;
    let nu = emi.toLocaleDateString();
    let femi = this.RetornarFecha(nu);
    console.log('fecha de emision');
    console.log(femi);
    console.log('correlativo');
    let corre = this.v.map((data) => {
      return data.bill_id;
    });

    let fe: putEmision = {
      date: femi,
      bills: corre,
    };

    console.log(fe);
    this.loading = true;
    this.services.updatefechaEmision(fe).subscribe(
      (data: any) => {
        this.loading = false;
        console.log('se actualizo');
        this.edidate = false;
        window.location.reload();
      },
      (er: any) => {
        console.log(er);
      }
    );
  }
  // editar glosa
  upnuevaglosa() {
    if (this.nuevaGlosa.length > 0) {
      let corr = this.v.map((data) => {
        return data.bill_id;
      });
      let glo: UpdateGlosa = {
        note: this.nuevaGlosa,
        bills: corr,
      };
      this.loading = true;
      this.services.upglosa(glo).subscribe(
        (data: any) => {
          this.loading = false;
          console.log('se actualizo la glosa');
          this.editglosa = false;
          window.location.reload();
        },
        (er: any) => {
          console.log(er);
        }
      );
      // console.log(this.nuevaGlosa);
      console.log(glo);
    } else {
      return;
    }
  }
}
