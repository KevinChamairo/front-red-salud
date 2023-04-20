import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MesadepartesService } from '../services/mesadepartes/mesadepartes.service';
import { buscarDoc,Documentosrecibidos } from '../interfaces/mesapartes.interface';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModalCargoComponent } from './modal-cargo/modal-cargo.component';

@Component({
  selector: 'app-documentosrecibidos',
  templateUrl: './documentosrecibidos.component.html',
  styleUrls: ['./documentosrecibidos.component.scss']
})

export class DocumentosrecibidosComponent implements OnInit {
  public actual: Date = new Date();

  public type_doc: number = 0;
  public correcon: number = 0;
  public nuevaGlosa: string = '';
  public upfechaemision: Date = new Date();
  public esta!: any;
  public valueInput: string = '';
  public nupdf: number = 0;
  public form: string = '';
  public importeTotal: number = 0;
  public loading: boolean = false;
  public tipo: string = 'Recepcion';
  public select1: number = 0;
  public conca: boolean = false;
  public edidate: boolean = false;
  public editglosa: boolean = false;
  public mostrartabla: boolean = false;
  public mostrartablaCg: boolean = false;
  public mostrarAnexosConar: boolean = false;
  public mostrartablaCenviados: boolean = false;
  public dataComprobantesAutomaticos: any[] = [];
  public ModuloBuscarDocumentos : boolean = true;
  public dataComprobantesEnviados: any[] = [];
  public dataComprobantesEnviadosNu: any[] = [];
  public dataComprobantesEnviados1: any[] = [];
  public dataComprobantesEnviados2: any[] = [];
  public dataComprobantesEnviados3: any[] = [];
  public dataComprobantesEnviados4: any[] = [];
  public dataComprobantesEnviados5: any[] = [];
  public dataDocumentosRecibidos : Documentosrecibidos[]=[];
  public sortedData: Documentosrecibidos[] = [];
  public grupo: number = 10;
  public page: number = 0;
  public grupo2: number = 10;
  public grupo4: number = 10;
  public page2: number = 0;
  public page4: number = 0;
  public enviadosBool: boolean = false;
  public generadosBool: boolean = false;
  public co: number[] = [];
  public bodyCargoRequest : any = []
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
  constructor(private services: MesadepartesService,private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  public method(e: any) {

  
      this.loading = true;
      try {
        let o: buscarDoc = {
          fecha_fin: e.fin,
          fecha_inicio: e.inicio,
         
        };
        this.services.listarDocumentos(o).subscribe((data: any) => {
          this.loading = false;
          this.mostrartabla = true;
          console.log(o);
          console.log('comprobantes por generar');
  
          // this.dataComprobantesAutomaticos = data.data.charges;
          this.dataDocumentosRecibidos = data.data;
          this.dataComprobantesAutomaticos = data.data
          // let importe = this.dataComprobantesAutomaticos.map(
          //   (data) => data.amount
          // );
          // let total = importe.reduce((a, b) => a + b, 0);
          console.log('terrible',this.dataDocumentosRecibidos);
          // this.importeTotal = total;
          // console.log(this.dataComprobantesAutomaticos);
          this.mostrartabla = true;
        });
      } catch (error) {
       
      }

    
    

  }
  public ChangeType ( event: number){

    if(event == 2){
      this.ModuloBuscarDocumentos = false
    }else{
      this.ModuloBuscarDocumentos = true
    }
  }
  sortData(sort: Sort) {
   
    const data = this.dataComprobantesAutomaticos.slice();
    console.log("aeaaa",data)
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.dataComprobantesAutomaticos = data.sort((a, b) => {
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
    console.log("resultado",this.dataDocumentosRecibidos)
  }

  estado() {
    let estadoTabla = parseInt(this.esta);
    console.log(parseInt(this.esta));
    if (estadoTabla == 1) {

      this.dataComprobantesEnviados1 = this.dataDocumentosRecibidos;
      this.dataComprobantesAutomaticos = this.dataDocumentosRecibidos;
      // console.log('todos');
      // console.log(this.dataComprobantesEnviados);
    } else if (estadoTabla == 2) {
   
      this.dataComprobantesEnviados2 = this.dataDocumentosRecibidos.filter(
        (data) => data.estado == 'Aceptado'
      );
      // console.log('filtro1',this.dataComprobantesEnviados2);

      // console.log(this.dataComprobantesEnviados2);
      this.dataComprobantesAutomaticos = this.dataComprobantesEnviados2;
      // console.log('tabla ren emitido');
      // console.log(this.dataComprobantesEnviados);
    } else if (estadoTabla == 3) {
      this.dataComprobantesEnviados4 = this.dataDocumentosRecibidos.filter(
        (data) => data.estado == 'Devuelto'
      );
      this.dataComprobantesAutomaticos = this.dataComprobantesEnviados4;
      // console.log('filtro4');
      // console.log(this.dataComprobantesEnviados4);
      // console.log(this.dataComprobantesEnviados);
    } 

  }


  generarCargo(){
    // vamos a generar un cargo por tipo de estado observado, aceptado todos
    console.log(  "esto es el filtro ",  this.dataComprobantesAutomaticos )
    if( this.dataComprobantesAutomaticos.length >0){
      this.bodyCargoRequest = [] 
      this.dataComprobantesAutomaticos.forEach(element => {
         let body ={
          iddocumento: element.id
         }
         this.bodyCargoRequest.push(body)
      });
      let body = {
        documents : this.bodyCargoRequest
      }
      this.bodyCargoRequest = body
      console.log("lo que se va mandar", this.bodyCargoRequest)
      let responseExample = {
        data : [
          {
            administracion : 9,
            contabilidad: 1 ,
            siniestro : 12,
          }
         
        ]
      }
      this.loading= true
      this.services.generarCargo(this.bodyCargoRequest).subscribe((data:any)=>{
        this.loading = false;
          console.log("data",data.data[0])
        this.openDialog(data.data[0])
        
        this.dataComprobantesAutomaticos = []
  
      })
    }else{
      alert("Debe enviar datos existentes")
    }




    // this.services.listarDocumentos(o).subscribe((data: any) => {
    //   this.loading = false;
    //   this.mostrartabla = true;
    //   console.log(o);
    //   console.log('comprobantes por generar');

    //   // this.dataComprobantesAutomaticos = data.data.charges;
    //   this.dataDocumentosRecibidos = data.data;
    //   this.dataComprobantesAutomaticos = data.data
    //   // let importe = this.dataComprobantesAutomaticos.map(
    //   //   (data) => data.amount
    //   // );
    //   // let total = importe.reduce((a, b) => a + b, 0);
    //   console.log('terrible',this.dataDocumentosRecibidos);
    //   // this.importeTotal = total;
    //   // console.log(this.dataComprobantesAutomaticos);
    //   this.mostrartabla = true;
    // });
    // this.openDialog(responseExample.data[0])
  }
  openDialog(value: any) {
    this.dialog.open(ModalCargoComponent, {
      width: '493px',
      height: '318px',
      panelClass: 'wildcard-automatic-debit-declaration-modal',
      data: value
    });
  }

  filtrarSearch(){
    console.log("aea",this.valueInput)
    // this.dataComprobantesAutomaticos = this.dataComprobantesAutomaticos.filter(
    //   (data) => data.estado == 'Aceptado'
    // );
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  console.log("a",a,"b",b)
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
 
}
