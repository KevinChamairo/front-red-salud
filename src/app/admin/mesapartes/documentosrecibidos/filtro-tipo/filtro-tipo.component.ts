import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  TipoDocumento,
  Formulario2,
} from '../../interfaces/mesapartes.interface';
import { MesadepartesService } from '../../services/mesadepartes/mesadepartes.service';
import { ModalSuccesfullComponent } from '../modal-succesfull/modal-succesfull.component';
import { ModalUpsComponent } from '../modal-ups/modal-ups.component';
@Component({
  selector: 'app-filtro-tipo',
  templateUrl: './filtro-tipo.component.html',
  styleUrls: ['./filtro-tipo.component.scss'],
})
export class FiltroTipoComponent implements OnInit {
  public TipoDocumento: TipoDocumento[] = [];

  public TipoFormulario: number = 0;
  public estaValidado: boolean = false;
  constructor(
    private services: MesadepartesService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}
  public loading: boolean = false;
  public select1: number = 0;
  public inputstate: boolean = true;
  public datosBoletaOa: any[] = [];
  public datosInfoCambiante: any = [];
  public datosInfoDura: any = [];
  public valueVariable: string = '';
  public btnActiveOA: Boolean = false;
  public fechaEmisionDisabled: Boolean = true;
  public mostrarOA: Boolean = false;
  public inputIsDisabled: boolean = false;
  public comprobanteregistrado: boolean = false;
  public redmedica : number = 0
  public responseUrl : string = ''
  public nameFile : string = ''
  public valueModificado : any =[]

  // public fechaRecepcionDisabled :  Boolean = true;
  formulario2 = this.fb.group({
    nDocumento: [
      { value: '', disabled: false },
      [Validators.required, Validators.minLength(3)],
    ],
    remitente: [{ value: '', disabled: false }, [Validators.required]],
    fechaven: [{ value: '', disabled: false }, [Validators.required]],
    asunto: [{ value: '', disabled: false }, [Validators.required]],
  });
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
  formulario1 = this.fb.group({
    sele1: [
      { value: 0, disabled: false },
      [Validators.required, Validators.min(-2)],
    ],
    orden_atencion: [{ value: [], disabled: false }],
    serie: [
      { value: '', disabled: false },
      [Validators.required, Validators.minLength(3)],
    ],
    numero: [{ value: '', disabled: false }, [Validators.required]],
    tipo_pago: [{ value: '', disabled: false }],
    estado: [{ value: '', disabled: false }],
    ruc: [
      { value: '', disabled: true },

      [Validators.required, Validators.minLength(11)],
    ],

    importe: [{ value: '', disabled: true }, [Validators.required]],
    razonSocial: [{ value: '', disabled: true }, [Validators.required]],
    nombreComercial: [{ value: '', disabled: true }, [Validators.required]],
    fecha_emision: [{ value: '', disabled: false }, [Validators.required]],
    fecha_recepcion: [{ value: '', disabled: false }, [Validators.required]],
    link_factura: [{ value: '', disabled: false }, [Validators.required]],

  });
  ngOnInit(): void {
    this.loading = true;
    this.services.tipoDocumento().subscribe((data: any) => {
      this.loading = false;
      this.TipoDocumento = data.data;
      console.log(this.TipoDocumento);
    });
  }
  public method(e: any) {
    console.log('mmm', e);
    let bodyRequestOA = {
      idsiniestro: e.idsiniestro,
      importe_oa: e.importe_oa,
      link_documento: e.link_documento
    };
    this.formulario1.get('orden_atencion')?.setValue([bodyRequestOA]);
    this.formulario1.get('tipo_pago')?.setValue(e.tipo_pago);
    this.formulario1.get('estado')?.setValue(1);
    this.enviaralHijo();
  }

  public limpiar(e: any) {
    console.log('llegue aca', e);
    if (e == 'limpiar') {
      this.TipoFormulario = 0;

      this.formulario1.get('ruc')?.reset('');
      this.formulario1.get('importe')?.disable();
      this.formulario1.get('sele1')?.setValue(0);
      this.formulario1.get('importe')?.reset('');
      this.formulario1.get('fecha_emision')?.reset('');
      this.formulario1.get('fecha_recepcion')?.reset('');
      this.formulario1.get('numero')?.reset('');
      this.formulario1.get('serie')?.reset('');
      this.formulario1.get('razonSocial')?.reset('');
      this.formulario1.get('nombreComercial')?.reset('');
      this.formulario1.get('razonSocial')?.disable();
      this.formulario1.get('nombreComercial')?.disable();
      this.formulario1.get('orden_atencion')?.reset([]);
      this.mostrarOA = false;
    }
  }
  getName() {
    console.log(this.formulario1.get('numero')?.value);
  }
  change1() {
    this.select1 = this.formulario1.get('sele1')?.value;

    this.TipoDocumento.forEach((element) => {
      if (element.id == this.select1) {

        this.TipoFormulario = element.tipo_formulario;
      }
    });
  }
  serieCorrecta(): boolean {
    let v = false;
    if (this.formulario1.get('serie')?.invalid) {
      v = true;
    } else {
      v = false;
    }
    this.validarRUC();
    // this.validarBtnForm2()
    return v;
  }
  numeroCorrecto(): boolean {
    let v = false;
    if (this.formulario1.get('numero')?.invalid) {
      v = true;
    } else {
      v = false;
    }
    this.validarRUC();
    // this.validarBtnForm2()
    return v;
  }
  validarRUC() {
    if (
      this.formulario1.get('numero')?.invalid ||
      this.formulario2.get('serie')?.invalid
    ) {
      this.formulario1.get('ruc')?.disable();
    } else {
      this.formulario1.get('ruc')?.enable();
    }
  }

  fechaRecepcionDisabled(): boolean {
    let v = true;

    if (this.fechaEmisionDisabled == true) {
      v = true;
    } else {
      v = false;
    }
    return v;
  }
  documentoCorrecto(): boolean {
    let v = false;
    if (this.formulario2.get('nDocumento')?.invalid) {
      v = true;
    } else {
      v = false;
    }
    this.validarBtnForm2();
    return v;
  }
  validarBtnForm2(): boolean {
    let v = false;
    if (
      this.formulario2.get('fechaven')?.invalid ||
      this.formulario2.get('nDocumento')?.invalid ||
      this.formulario2.get('remitente')?.invalid ||
      this.formulario2.get('asunto')?.invalid
    ) {
      v = true;
      this.estaValidado = false;
    } else {
      this.estaValidado = true;
      v = false;
    }
    return v;
  }
  remitenteCorrecto(): boolean {
    let v = false;
    if (this.formulario2.get('fechaven')?.invalid) {
      v = true;
    } else {
      v = false;
    }

    return v;
  }

  fechaCorrecta(): boolean {
    let v = false;
    if (this.formulario2.get('remitente')?.invalid) {
      v = true;
    } else {
      v = false;
    }
    return v;
  }
  public ValidarFormulario() {
    console.log('fecha', this.formulario2.get('fechaven'));
    console.log('remitente', this.formulario2.get('remitente'));

    console.log('asunto', this.formulario2.get('asunto'));
    console.log('nDocumento', this.formulario2.get('nDocumento'));
    if (
      this.formulario2.get('fechaven')?.invalid ||
      this.formulario2.get('nDocumento')?.invalid ||
      this.formulario2.get('remitente')?.invalid ||
      this.formulario2.get('asunto')?.invalid
    ) {
      alert('Hay un error papi');
    } else {
      let fechaFormateada = this.formulario2
        .get('fechaven')
        ?.value.toLocaleDateString();
      fechaFormateada = fechaFormateada.split('/').reverse().join('-');

      console.log('fechaFormateada', fechaFormateada);
      let valueForm2 = {
        asunto: this.formulario2.get('asunto')?.value,
        estado: 5,
        fecha_recepcion: fechaFormateada,
        numero: this.formulario2.get('nDocumento')?.value,
        remitente: this.formulario2.get('remitente')?.value,
        tipo_documento:this.formulario1.get('sele1')?.value,
        tipo_pago: 4,
      };
      console.log('valueForm2', valueForm2);

      this.loading = true;
      this.services
        .registrarDocumentoForm2(valueForm2)
        .subscribe((data: any) => {
          this.loading = false;
          this.openDialog();
        });
    }
  }
  openDialog() {
    this.dialog.open(ModalSuccesfullComponent, {
      width: '500px',
      height: '265px',
      panelClass: 'wildcard-automatic-debit-declaration-modal',
    });
  }
  openDialogUps() {
    this.dialog.open(ModalUpsComponent, {
      width: '500px',
      height: '300px',
      panelClass: 'modalups-modal',
    });
  }

  addOA() {
    if (this.comprobanteregistrado == false) {
      if (this.btnActiveOA == false) {
        console.log('esta mal', this.formulario1.valid);
      } else {
        this.mostrarOA = true;
        console.log('vamos a validar', this.formulario1.valid);
      }
    } else {
      alert('El comprobante ya se encuentra en mesa de parte');
    }
  }
  changed(): any {
    if (this.valueVariable.length == 11) {
      this.loading = true;
      let cuerpoConsultRuc = {
        ruc: this.formulario1.get('ruc')?.value,
        serie: this.formulario1.get('serie')?.value,
        numero: this.formulario1.get('numero')?.value,
      };
      this.services.consultarRuc(cuerpoConsultRuc).subscribe((data: any) => {
        this.loading = false;
        this.validateDataExist(data.data);
        this.datosBoletaOa = data.data;
        this.mostrarOA = false;
      });
    } else {
    }
  }
  mostrarArchivo(){
    if(this.responseUrl !== ''){
      window.open(this.responseUrl, '_blank');
    }
  }
  validateDataExist(responseApi: any) {
    try {
      for (let index = 0; index < responseApi.length; index++) {
        const element = responseApi[index];

        if (element.nombre_comercial == '') {
          this.comprobanteregistrado = false;
          this.redmedica = element.red_medica

          this.formulario1.get('razonSocial')?.enable();
          this.formulario1.get('nombreComercial')?.enable();
          this.formulario1.get('razonSocial')?.setValue(element.razon_social);
          this.formulario1
            .get('nombreComercial')
            ?.setValue(element.nombre_comercial);
          this.formulario1.get('importe')?.enable();
          this.fechaEmisionDisabled = false;
          this.formulario1.get('importe')?.setValue(element.importe);
          this.formulario1
            .get('fecha_emision')
            ?.setValue(element.fecha_emision);
          this.formulario1
            .get('fecha_recepcion')
            ?.setValue(element.fecha_recepcion);
          console.log('aea', this.fechaEmisionDisabled);
        } else {
          if (element.mensaje !== '') {
            if (element.red_medica == 1) {
                this.redmedica = 1
            }else{
              this.redmedica =0
            }
            this.inputIsDisabled = true;
            this.formulario1.get('razonSocial')?.disable();
            this.formulario1.get('nombreComercial')?.disable();
            this.formulario1.get('importe')?.setValue(element.importe);
            var res = new Date(element.fecha_emision);
            res.setDate(res.getDate() + 1);
            this.comprobanteregistrado = true;
            var res2 = new Date(element.fecha_recepcion);
            res2.setDate(res2.getDate() + 1);
            console.log('dates', res.toLocaleString());
            this.formulario1.get('fecha_emision')?.setValue(res);
            this.formulario1.get('fecha_recepcion')?.setValue(res2);
            this.btnActiveOA = false;
            this.fechaEmisionDisabled = true;
            this.formulario1.get('importe')?.disable();
            this.openDialogUps();

          }
          if (element.mensaje == '') {
            this.redmedica = element.red_medica
            this.formulario1.get('importe')?.enable();
            this.fechaEmisionDisabled = false;
            this.comprobanteregistrado = false;
            this.formulario1.get('razonSocial')?.enable();
            this.formulario1.get('nombreComercial')?.enable();
            this.formulario1.get('fecha_emision')?.setValue(element.fecha_emision)
            this.formulario1.get('fecha_recepcion')?.setValue(element.fecha_recepcion)
            this.btnActiveOA = false;
          }
          this.formulario1.get('razonSocial')?.setValue(element.razon_social);
          this.formulario1
            .get('nombreComercial')
            ?.setValue(element.nombre_comercial);
          this.formulario1.get('importe')?.setValue(element.importe);
        }
      }
    } catch (error) {}
  }
  upload(event: any): void {

    if(this.formulario1.get('serie')?.value != '' && this.formulario1.get('numero')?.value !== ''){
      this.loading = true

      console.log(event.target.files)
       this.valueModificado = event.target.files[0]
      let valueArchivo = this.valueModificado.name
      let array=valueArchivo.split('.')


      console.log("array",valueArchivo)
      let armadoName =  this.formulario1.get('serie')?.value + '-' + this.formulario1.get('numero')?.value+'.'+array[1]
      // let armadoName = "aea.pdf"
      // this.valueModificado['name'] = armadoName
      console.log("esto se enviara a lusho",armadoName)
      debugger
      var file = new File([], armadoName, {
        type:event.target.files[0].type,
      },);

      console.log("aea",file)

      this.services
      .uloadFile3(
        event.target.files[0],armadoName
      )
      .subscribe((data: any) => {
        if (data.success) {
          this.responseUrl = data.data.url
          this.nameFile = data.data.name
          this.formulario1.get('link_factura')?.setValue(this.responseUrl);
          this.enviaralHijo()
          console.log("a", this.responseUrl)
          this.loading = false;
        } else {
          alert("ERROR AL ACTUALIZAR IMAGEN")
          this.loading = false;
        }
      })
    }else{
      alert('Debe completar el campo Serie y el campo Numero')
    }

  }
  enviaralHijo() {
    try {
      if (this.formulario1.valid) {
        if (this.comprobanteregistrado == false) {
          this.btnActiveOA = true;
          var fechaEmisionFormateada = new Date(
            this.formulario1.get('fecha_emision')?.value
          );
          var fechaRecepcionFormateada = new Date(
            this.formulario1.get('fecha_recepcion')?.value
          );
          this.datosInfoDura = this.formulario1.value;
          // delete this.datosInfoDura.nombreComercial
          // delete this.datosInfoDura.razonSocial
          delete this.datosInfoDura.sele1;
          this.datosInfoDura.tipo_documento =
            this.formulario1.get('sele1')?.value;
          this.datosInfoDura.orden_atencion =
            this.formulario1.get('orden_atencion')?.value;
          this.datosInfoDura.iddocumento = 0;
          this.datosInfoDura.fecha_emision =
            fechaEmisionFormateada.toLocaleDateString('fr-CA');
          this.datosInfoDura.fecha_recepcion =
            fechaRecepcionFormateada.toLocaleDateString('fr-CA');
          console.log('info formateada', this.datosInfoDura);

          this.datosInfoCambiante = this.datosInfoDura;
        } else {
          this.btnActiveOA = false;
          console.log('info fea');
          this.datosInfoCambiante = {};
        }
      }else{
        this.btnActiveOA= false
        this.datosInfoCambiante = {};
        console.log("mmmm posible", this.formulario1)
      }
    } catch (error) {
      console.log('aca tmb puede entrar el error', error);
    }
  }
  validarcambios() {
    try {
      if (this.formulario1.get('ruc')?.value == '') {
        console.log('no va entrar pq aun no esta lleno');
      } else {
        console.log('va entrar pq aun  esta lleno');

        this.changed();
      }
    } catch (error) {}
  }
}
