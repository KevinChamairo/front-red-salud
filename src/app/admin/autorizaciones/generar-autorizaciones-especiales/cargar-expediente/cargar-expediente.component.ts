import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AutorizacionesService } from '../../services/autorizaciones.service';
import { startWith, map, filter } from 'rxjs/operators';
import { bodyArrayAutorizacion } from '../../interfaces/autorizaciones.interface';
import { ModalSuccesAutorizacionComponent } from '../modal-succes-autorizacion/modal-succes-autorizacion.component';
import { MatDialog } from '@angular/material/dialog';

import {
  Diagnostico,
  Proveedores,
  Productos,
  Autorizacion,
} from '../../interfaces/autorizaciones.interface';
@Component({
  selector: 'app-cargar-expediente',
  templateUrl: './cargar-expediente.component.html',
  styleUrls: ['./cargar-expediente.component.scss'],
})
export class CargarExpedienteComponent implements OnInit {

  ngOnInit(): void {
    this.consultarProveedores();
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((state) =>
        state && state.length > 3
          ? this._filterStates(state)
          : this.states.slice()
      )
    );

    this.filteredProveedores = this.stateProveedores.valueChanges.pipe(
      startWith(''),
      map((state) =>
        state ? this._filterProveedores(state) : this.statesProveedores.slice()
      )
    );

    try {
      this.filteredProductos = this.stateProductos.valueChanges.pipe(
        startWith(''),
        map((state) =>
          state ? this._filterProductos(state) : this.statesProd.slice()
        )
      );
    } catch (error) {
      console.log('error', error);
    }
  }

  radioButton = null;
  stateCtrl = new FormControl('');
  stateProveedores = this.fb.control({ value: '', disabled: true });
  expedienteID: number = 0;
  stateProductos = new FormControl('');
  responseC1E10: any[] = [];
  checkbox: any[] = [];
  typeConsult: any[] = [];
  typeConsultFilter: any[] = [];
  stateDisabledImporte: boolean = true;
  stateDisabledProveedores: boolean = true;
  tipoProveedor: number = 1
  public valueModificado : any =[]
  idopcion: number = 0;
  streets: string[] = [
    'Champs-Élysées',
    'Lombard Street',
    'Abbey Road',
    'Fifth Avenue',
  ];
  filteredStates!: Observable<Diagnostico[]>;
  filteredProveedores!: Observable<Proveedores[]>;
  filteredProductos!: Observable<Productos[]>;

  public importeFinal : number = 0
  public cie10Error : Boolean = false
  public archivoFilError : Boolean = false
  public importeError : Boolean = false
  public nameFile: string = '';
  public responseUrl: string = '';
  public states: Diagnostico[] = [];
  public statesProveedores: Proveedores[] = [];
  public statesProd: Productos[] = [];
  public ordenAtencion: string = '';
  public responseProveedores: any[] = [];
  public asegurado: any = {};

  public bodyRequestAutorizacion: Autorizacion = {
    idcie10: 0,
    ruta_expediente: '',
    idsiniestro: 0,
    datos: [],
  };
  public bodyArrayAutorizacion: any = {};
  responseFilterProduct: any[] = [];
  responseProduct: Productos[] = [];
  responseProveedores2: any[] = [];

  responseProveedoresExterno: any [] = [

    {
      id: 0,
      nombre: "OTROS",
      tipo:"aea"
    }
  ]
  responseCoberturas: any[] = [];
  public esta!: any;
  arrayTable: any[] = [];

  formulario1 = this.fb.group({
    id: [{ value: 0, disabled: false }],
    motivos: [
      { value: {}, disabled: false },
      [Validators.required, Validators.min(-2)],
    ],
    expediente: [
      { value: '', disabled: false },
      [Validators.required, Validators.min(-2)],
    ],
    archivoExpediente: [{ value: '', disabled: false, },[Validators.required]],
    // archivoExpediente: [{ value: '', disabled: false }, [Validators.required]],
    producto: [{ value: '', disabled: false }, [Validators.required]],
    importe: [{ value: '', disabled: true }, [Validators.required]],
    proveedor: [
      {
        value: '',
        disabled: false,
      },
      [Validators.required]
    ],
    tipoPago: [{ value: '', disabled: false }, [Validators.required]],
    coberturas: [{ value: '', disabled: false }, [Validators.required]],

    idopcion: [{ value: '', disabled: false }, [Validators.required]],
  });

  @Output() resetear = new EventEmitter<string>();

  @Input()
  set motivos(value: any) {
    console.log('motivos', value.motivos);
    console.log('asuntis', value.asegurado);
    this.motivosArray = value.motivos;
    this.asegurado = value.asegurado;
    // console.log(this.checkbox)
  }
  @Input()
  set oa(value: any) {
    console.log('diagnosticos', value);

    this.ordenAtencion = value;
  }

  public loading: boolean = false;
  public motivosArray: any[] = [];

  constructor(
    private fb: FormBuilder,
    private services: AutorizacionesService,
    private dialog: MatDialog
  ) {}

  stateProveedor(): boolean {
    return this.formulario1.controls.tipoPago.value != 'Liquidacion';
  }

  mostrarArchivo(): void {
    if (this.nameFile !== '') {
      window.open(this.nameFile, '_blank');
    }
  }
  upload(event: any): void {

    try {


      this.valueModificado = event.target.files[0]
      let valueArchivo = this.valueModificado.name
      let array=valueArchivo.split('.')
      let armadoName =    this.asegurado.oa+'.'+array[1]
      console.log('first');
      this.loading = true;
      this.services
        .cargarExpediente(event.target.files[0],armadoName)
        .subscribe((data: any) => {
          if (data.success) {
            this.nameFile = data.data.url;
            this.archivoFilError= false
            this.formulario1.get('archivoExpediente')?.setValue(data.data.url);
            this.loading = false;
          } else {
            alert('ERROR AL CARGAR ARCHIVO');
            this.archivoFilError= true
            this.loading = false;
          }
        });
    } catch (error) {
      this.archivoFilError= true
    }

  }
  consultarDiagnostico() {
    let valueinput = this.stateCtrl.value;
    let idExpediente = '';
    console.log('valorEscrito', valueinput);
    if (valueinput.length > 2) {
      console.log('entre');
      console.log('responseC1E10', this.responseC1E10);
      this.responseC1E10.forEach((element) => {
        if (element.descripcion == valueinput) {
          console.log('nombre', valueinput);
          idExpediente = element.id;
          this.expedienteID = element.id;
          console.log('this', this.expedienteID);
        }
      });
      this.cie10Error = false
      this.formulario1.get('expediente')?.setValue(idExpediente);
    } else {
      this.cie10Error = true
      this.formulario1.get('expediente')?.setValue('');
    }

    if (valueinput.length == 3) {
      this.loading = true;
      try {
        let bodyRequest = {
          word: valueinput,
        };
        this.services.diagnostico(bodyRequest).subscribe((data: any) => {
          this.loading = false;
          if (!data.error) {
            this.states = data;
            this.responseC1E10 = data;
          }

          // this.filteredStates = data
        });
      } catch (error) {
        this.loading = false;
        alert('Ocurrio un error');
      }
    } else {
      if (valueinput.length < 3) {
        this.cie10Error = true
        this.states = [];
      }
    }
  }

  consultarProveedores() {
    this.loading = true;
    try {
      this.services.getProveedores().subscribe((data: any) => {
        this.loading = false;
        console.log('dataProveedores', data);
        if (data.length > 0) {
          this.statesProveedores = data;
          this.responseProveedores2 = data;
        } else {
          this.statesProveedores = [];
        }
      });
    } catch (error) {}
  }

  validarProveedor() {
    if(this.tipoProveedor == 1){
      let proveedor = this.stateProveedores.value;
      let idProveedor = '';

      console.log('proveedor', proveedor);
      if (proveedor.length >= 1) {
        // console.log("formulario", this.formulario1.value)
        this.responseProveedores2.forEach((element) => {
          if (element.nombre == proveedor) {
            // console.log("entre", element)
            idProveedor = element.id;


          }
        });
        console.log('idProveedor', idProveedor);
        if (idProveedor == '') {
          this.formulario1.get('proveedor')?.setValue('');
        } else {
          this.formulario1.get('proveedor')?.setValue({
            id: idProveedor,
            nombre: proveedor,

          });
        }
      } else {
        this.formulario1.get('proveedor')?.setValue('');
      }
    }else{
      this.formulario1.get('proveedor')?.setValue({
        id: 0,
        nombre: 'Otros',

      });
    }

  }



  validarProducto() {
    let producto = this.stateProductos.value;
    let importeFinal2  = 0
    let idProducto = 0;
    if (producto.length > 2) {
      console.log('producto', producto);
      console.log('arrayProducts', this.responseProduct);
      this.responseProduct.forEach((element) => {
        if (element.producto == producto) {
          // console.log("entre", element)
          idProducto = element.id;
          importeFinal2= element.importe_max
        }
      });
      this.importeFinal = importeFinal2
      console.log("entro aca",       this.importeFinal)
      console.log('idProducto', idProducto);
      this.formulario1.get('importe')?.enable();
      this.formulario1.get('producto')?.setValue({
        producto: producto,
        id: idProducto,
      });

    }else{
      this.importeFinal = importeFinal2
      this.formulario1.get('producto')?.setValue({
        producto: producto,
        id: idProducto,
      });
    }
  }
  public _filterStates(value: string): Diagnostico[] {
    console.log('entro a filtrar', this.states.values);
    const filterValue = value.toLowerCase();

    return this.states.filter((state) =>
      state.descripcion.toLowerCase().includes(filterValue)
    );
  }

  public _filterProveedores(value: string): Proveedores[] {
    const filterValue = value.toLowerCase();
    return this.statesProveedores.filter((state) =>
      state.nombre.toLowerCase().includes(filterValue)
    );
  }

  public _filterProductos(value: string): Productos[] {
    const filterValue = value.toLowerCase();
    return this.statesProd.filter((state) =>
      state.producto.toLowerCase().includes(filterValue)
    );
  }
  validar(id: any, cobertura: any) {
    this.limpiarCamposIMPPRODPRO()
    this.loading = true;

    // this.formulario1.get('coberturas')?.setValue({
    //   id: id,
    //   cobertura: cobertura,
    // });
    let bodyDiagnostico = {
      idopcion: id,
      oa: this.ordenAtencion,
    };

    this.formulario1.get('idopcion')?.setValue(id);
    try {
      this.services.productoporID(bodyDiagnostico).subscribe((data: any) => {
        this.loading = false;
        console.log('aea', data);
        if (data.length >= 0) {
          this.statesProd = data;
          this.filteredProductos = this.stateProductos.valueChanges.pipe(
            startWith(''),
            map((state) =>
              state ? this._filterProductos(state) : this.statesProd.slice()
            )
          );
          this.responseProduct = data;
        }
      });
    } catch (error) {
      this.loading = false;
      alert('Ocurrio un error');
    }
  }



  limpiarCamposIMPPRODPRO(){
    this.stateProveedores.setValue('');
    this.stateProductos.setValue('');

  }

  consultService(id: any, descripcion: any) {
    console.log('viene', id, descripcion);
    this.formulario1.get('motivos')?.setValue({
      id: id,
      descripcion: descripcion,
    });
    let bodyProduct = {
      id: id,
      oa: this.ordenAtencion,
    };
    this.loading = true;
    try {
      this.services.coberturasporMotivo(bodyProduct).subscribe((data: any) => {
        this.loading = false;
        console.log('aea', data);
        if (data.length >= 0) {
          this.responseCoberturas = data;
        }
      });
    } catch (error) {
      this.loading = false;
      alert('Ocurrio un error');
    }
  }

  pruebita(aea: any) {
    console.log('esta', aea);
  }
  delete(id: any) {
    this.arrayTable = this.arrayTable.filter((item) => item.id !== id);
  }

  limpiar() {
    // this.formulario1.get('motivos')?.setValue({})
    // this.formulario1.get('expediente')?.setValue('');
    // this.formulario1.get('archivoExpediente')?.setValue('');
    this.formulario1.get('producto')?.setValue('');
    this.formulario1.get('importe')?.reset('');
    this.formulario1
      .get('proveedor')
      ?.setValue({ id: 0, nombre: 'Otros' });
    this.formulario1.get('tipoPago')?.reset();
    this.formulario1.get('coberturas')?.setValue('');
    // this.nameFile = '';
    // this.stateCtrl.setValue('');
    this.formulario1.get('motivos')?.reset();
    this.responseCoberturas = [];
    this.stateProductos.setValue('');
    this.statesProd = [];
    this.stateProveedores.setValue('');

    this.idopcion = 0;
  }

  // -----------METODO PARA INABILITAR LIQUIDACION Y REEMBOLSO -----------
  enableProveedores() {
    this.tipoProveedor =1
    console.log('estado', this.stateProveedores);
    this.stateProveedores.enable();
    this.statesProveedores = this.responseProveedores2
    this.filteredProveedores = this.stateProveedores.valueChanges.pipe(
      startWith(''),
      map((state) =>
        state ? this._filterProveedores(state) : this.statesProveedores.slice()
      )
    );

  }
  disableProveedores() {
    this.tipoProveedor =2
    console.log('estado', this.stateProveedores);
    // this.stateProveedores.disable();
    this.statesProveedores = this.responseProveedoresExterno
    this.filteredProveedores = this.stateProveedores.valueChanges.pipe(
      startWith(''),
      map((state) =>
        state ? this._filterProveedores(state) : this.statesProveedores.slice()
      )
    );

  }
  ///-------------------------------------------------------------------------

  // ACA LO AGREGAMOS A LA TABLA DE ARRAYTABLE
  validarFormulario() {

    if(this.importeFinal == 0 ){
      if (this.formulario1.valid ){
        this.formulario1.get('id')?.setValue(this.arrayTable.length);
        console.log('formulario', this.formulario1.value);
        this.arrayTable.push(this.formulario1.value);
        this.limpiar();
      } else {
        console.log('formulario', this.formulario1.value);
        alert('Falta completar algunos campos correctamente');
      }
    } else{
      if(this.formulario1.valid && (this.importeFinal >= this.formulario1.get('importe')?.value)){
        this.formulario1.get('id')?.setValue(this.arrayTable.length);
        console.log('formulario', this.formulario1.value);
        this.arrayTable.push(this.formulario1.value);
        this.limpiar();
      } else {
        console.log('formulario', this.formulario1.value);
        alert('Falta completar algunos campos correctamente');
      }
    }

  }

  // ACA VAMOS A MANDAR TODO
  generarAutorizacion() {
    if (this.arrayTable.length > 0) {
      let arrayBodysito: any[] = [];

      this.bodyRequestAutorizacion.idcie10 = this.expedienteID;
      this.bodyRequestAutorizacion.idsiniestro = this.asegurado.idsiniestro;
      this.bodyRequestAutorizacion.ruta_expediente = this.nameFile;

      this.arrayTable.forEach((element) => {
        let object : any ={}
        // console.log("arrayBodisito al inicio", arrayBodysito)
        console.log("elemento", element)
        if (element.producto.id == 0) {
          object.producto_desc = element.producto.producto;
        }

        if (element.producto.id != 0) {
          object.idproducto = element.producto.id;
        }

        object.idproveedor = element.proveedor.id;


        object.importe = element.importe;
        object.tipo_pago = element.tipoPago;
        object.idopcion = element.idopcion;


        console.log("pusheamos esto", object)
        arrayBodysito.push(object);
      });

      console.log('arrayDe datoa', arrayBodysito);

      this.bodyRequestAutorizacion.datos = arrayBodysito;

      console.log('requestAutorizacion', this.bodyRequestAutorizacion);

      this.loading = true;

      try {
        this.services
          .generarAutorizacion(this.bodyRequestAutorizacion)
          .subscribe((data: any) => {
            this.loading = false;
            console.log('aea', data);

            if (data.message == 'Autorizacion registrada') {
              this.resetear.emit('limpiar');
              this.arrayTable = [];
              this.openDialogSuccesfull();
            }
          });
      } catch (error) {
        this.loading = false;
        alert('Ocurrio un error');
      }
    }else{
      alert('Error debe completar el flujo')
    }
  }

  openDialogSuccesfull() {
    this.dialog.open(ModalSuccesAutorizacionComponent, {
      width: '500px',
      height: '333px',
      panelClass: 'successAutorizacion',
    });
  }
}
