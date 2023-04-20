import { afiliadosOA } from './../../interfaces/mesapartes.interface';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MesadepartesService } from '../../services/mesadepartes/mesadepartes.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-oa',
  templateUrl: './oa.component.html',
  styleUrls: ['./oa.component.scss'],

})

export class OaComponent implements OnInit {
  public isActive : boolean = true
  public valueImporte : string = ''
  public tipo_pago : number = 2
  public valueTemporal: any  = []
  public loading: boolean = false;
  public responseUrl : string = ''
  public nameFile : string = ''
  public valueModificado : any =[]
  public contadorArchivos : number = 1
  @Input()
  set data(value:any){
    console.log("llego",value)
    try {
      for (let index = 0; index < value.length; index++) {
        const element = value[index];
           console.log("elemento",element.red_medica)
        if(element.red_medica ==1){
          this.isActive = false
        }
        if(element.red_medica == 0){
          this.isActive = true
        }
      }
    } catch (error) {
      console.log("pues paso esto",error)
    }

  }
  @Input()
  set importe(value:any){
    console.log("importe",value)
  }
  @Output() value = new EventEmitter<any>();

  formConsultOA = this.fb.group({
    numeroOA: [{ value: '', disabled: false }],
    dni: [{ value: '', disabled: false }],
    fecha: [{ value: '', disabled: false }],
    importe:[{value:'',disabled:false}]
  });
  formSelect = this.fb.group(
    {
      sele1: [{ value: '', disabled: false }],

    }
  )
  public tipoEstado = [
    {
      id: "1",
      nombre: "aceptado",
    },
    {
      id: "2",
      nombre: "observado",
    }
  ]
  public dataOrdenAtencion: any[] = [];
  public dataOrdenAtencionNueva : any  = [];
  public mostrartabla: boolean = false;
  public mostrartablaAgregarOA: boolean = false;
  public grupo: number = 10;
  public page: number = 0;
  public grupo2: number = 10;
  public grupo4: number = 10;
  public page2: number = 0;
  public page4: number = 0;


  public gruponuevo: number = 10;
  public pagenuevo: number = 0;
  public grupo2nuevo: number = 10;
  public grupo4nuevo: number = 10;
  public page2nuevo: number = 0;
  public page4nuevo: number = 0;


  public sortedData: afiliadosOA[] = [];
  ngOnInit(): void {


  }
  constructor(private fb: FormBuilder, private services: MesadepartesService) {}

  consultarOA() {

    if ( this.formConsultOA.get('numeroOA')?.value !== ''  ||this.formConsultOA.get('dni')?.value !== '' || this.formConsultOA.get('fecha')?.value !== '' ) {
      let cuerpoConsultOA = {
        oa: this.formConsultOA.get('numeroOA')?.value,
        dni: this.formConsultOA.get('dni')?.value,
        fecha: this.formConsultOA.get('fecha')?.value,
      };
      this.services.consultarOA(cuerpoConsultOA).subscribe((data: any) => {
        if(data.data.length !==0){
          this.dataOrdenAtencion = data.data
          this.mostrartabla = true
        }else{
          this.dataOrdenAtencion = data.data
          this.mostrartabla = false
        }
      });
    } else {
      // alert('terrible lo que va pasar');
      alert("Faltan completar los datos")
    }
  }
  upload(event: any): void {
    this.loading = true

    console.log(event.target.files)
     this.valueModificado = event.target.files[0]
    let valueArchivo = this.valueModificado.name
    let array=valueArchivo.split('.')
    let array2 = valueArchivo.split('.').pop()
    console.log('variable',array2)

    let armadoName = this.dataOrdenAtencionNueva[0].num_orden + '-'+this.dataOrdenAtencionNueva[0].dni+'('+this.contadorArchivos+')'+'.'+array2

    // let armadoName = "aea.pdf"
    // this.valueModificado['name'] = armadoName
    console.log("esto se enviara a lusho",this.valueModificado)
    console.log("esto se cambiar ade nombre",armadoName)

    this.services
    .uloadFile3(
      event.target.files[0],armadoName
    )
    .subscribe((data: any) => {
      if (data.success) {
        this.responseUrl = data.data.url
        this.nameFile = data.data.name
        console.log("a", this.responseUrl)
        this.loading = false;
        this.contadorArchivos = this.contadorArchivos +1
        let bodyResponse ={
          url: data.data.url,
          name : armadoName
        }
        this.dataOrdenAtencionNueva[0].archivos.push(bodyResponse)

        this.valueTemporal.link_documento= bodyResponse.url
        this.value.emit(this.valueTemporal)
      } else {
        alert("ERROR AL ACTUALIZAR IMAGEN")
        this.loading = false;
      }
    })
  }
  sortData2(sort: Sort) {

    const data = this.dataOrdenAtencion.slice();
    console.log("aeaaa",data)
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.dataOrdenAtencion = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id,isAsc);
        case 'ruc':
          return compare(a.ruc, b.ruc, isAsc);
        case 'razon_social':
          return compare(a.razon_social, b.razon_social, isAsc);
        case 'nombre_comercial':
          return compare(a.nombre_comercial, b.nombre_comercial, isAsc);
        case 'fecha_recepcion':
          return compare(a.fecha_recepcion, b.fecha_recepcion, isAsc);
        case 'fecha_emision':
          return compare(a.fecha_emision, b.fecha_emision, isAsc);
        case 'documento':
          return compare(a.documento, b.documento, isAsc);
        case 'orden_atencion':
          return compare(a.documento, b.documento, isAsc);
          case 'estado':
            return compare(a.estado, b.documento, isAsc);
        case 'usuario':
          return compare(a.usuario, b.usuario, isAsc);
        default:
          return 0;
      }
    });
    console.log("resultado",this.dataOrdenAtencion)
  }
   sortData(sort: Sort) {

    const data = this.dataOrdenAtencion.slice();
    console.log("aeaaa",data)
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.dataOrdenAtencion = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id,isAsc);
        case 'ruc':
          return compare(a.ruc, b.ruc, isAsc);
        case 'razon_social':
          return compare(a.razon_social, b.razon_social, isAsc);
        case 'nombre_comercial':
          return compare(a.nombre_comercial, b.nombre_comercial, isAsc);
        case 'fecha_recepcion':
          return compare(a.fecha_recepcion, b.fecha_recepcion, isAsc);
        case 'fecha_emision':
          return compare(a.fecha_emision, b.fecha_emision, isAsc);
        case 'documento':
          return compare(a.documento, b.documento, isAsc);
        case 'orden_atencion':
          return compare(a.documento, b.documento, isAsc);
          case 'estado':
            return compare(a.estado, b.documento, isAsc);
        case 'usuario':
          return compare(a.usuario, b.usuario, isAsc);
        default:
          return 0;
      }
    });
    console.log("resultado",this.dataOrdenAtencion)
  }


  validarImporte(){

    if(this.valueTemporal.importe_oa !== null){
      console.log("aea1",this.valueTemporal)
      this.valueTemporal.importe_oa = this.formConsultOA.get('importe')?.value
      this.value.emit(this.valueTemporal)
    }else{
      console.log("aea",this.valueTemporal)
    }
  }
  openUrl(url:any){
    window.open(url, '_blank');
  }
  addSiniestro (item :any ){
    item.archivos = []

  let addRequestBody = {
    idsiniestro: item.idsiniestro,
    importe_oa : 0,
    tipo_pago: this.tipo_pago,
    link_documento :  ''
  }
  this.valueTemporal = addRequestBody
  let valueExist =  false
  this.mostrartablaAgregarOA = true
  if(this.dataOrdenAtencionNueva.length == 0){
    this.dataOrdenAtencionNueva.push(item)
    this.value.emit (addRequestBody)
  }else{
  //   let variable : afiliadosOA [] = [];
  //   variable.push(item)
  //   this.dataOrdenAtencionNueva.forEach(element => {
  //     if(element.num_orden == item.num_orden){
  //       valueExist = true
  //     }
  //   });
  //  if(valueExist == false){
  //   this.value.emit (addRequestBody)
  //   this.dataOrdenAtencionNueva.push(item)

  //  }
  }

  console.log("aea", this.dataOrdenAtencionNueva)
}

actualizarImporteOA(){
  console.log("importe", this.valueImporte)
}
setTypeLiquidacion(numero: number){
  console.log("numero",numero)
  this.tipo_pago = numero
  if(this.valueTemporal.tipo_pago!==null ){

    this.valueTemporal.tipo_pago = numero
    this.value.emit ( this.valueTemporal)
  }
}
deleteOAUser(item:afiliadosOA){
  console.log("este es el item",item)
let filtrado = this.dataOrdenAtencionNueva.filter((id: { num_orden: string; }) => id.num_orden!== item.num_orden)
 this.dataOrdenAtencionNueva = filtrado

 if(this.dataOrdenAtencionNueva.length == 0 ){
  this.mostrartablaAgregarOA = false
 }
}
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  console.log("a",a,"b",b)
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);

}
