import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';





import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';


// import { MesadepartesService } from '../../mesapartes/services/mesadepartes/mesadepartes.service';
import { buscarDoc,Documentosrecibidos } from '../../mesapartes/interfaces/mesapartes.interface';



// import { ModalCargoComponent } from '../../mesapartes/documentosrecibidos/modal-cargo/modal-cargo.component';
import { SiniestrosService } from '../services/siniestros.service';
import { ModalObservadoComponent } from '../../mesapartes/documentosrecibidos/modal-observado/modal-observado.component';
import { ModalRechazoFacturaComponent } from './modal-rechazo-factura/modal-rechazo-factura.component';
@Component({
  selector: 'app-registro-de-gasto',
  templateUrl: './registro-de-gasto.component.html',
  styleUrls: ['./registro-de-gasto.component.scss']
})
export class RegistroDeGastoComponent implements OnInit {
  public mostrarTabla: boolean = true
  public mostrarRegistroGasto: boolean=false
  public esta!: any;
  public valueInput: string = '';

  public loading: boolean = false;

  public mostrartabla: boolean = false;



  public dataAfiliado : any [] = []
  public dataComprobantesEnviados: any[] = [];  
  public sortedData: Documentosrecibidos[] = [];
  public sortedData2 : any []= []
  public grupo: number = 10;
  public page: number = 0;
  public grupo2: number = 10;
  public grupo4: number = 10;
  public page2: number = 0;
  public page4: number = 0;
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
  constructor(private services: SiniestrosService,private fb: FormBuilder, private dialog: MatDialog,) { }

  ngOnInit(): void {

    this.loading = true;
    try {
      this.services.listaRegistro().subscribe((data: any) => {
        this.loading = false;

        if(data.error){
          this.mostrartabla = false
          this.dataAfiliado = []
          alert('Error no se Encontro al Asegurado')
        }else{
          console.log("data",data)

          this.mostrartabla = true;
          this.dataAfiliado = data.data
          this.sortedData2 = data.data
        }


      });
    } catch (error) {
      this.loading = false

      alert('Ocurrio un error')
    }
    this.dataAfiliado = [
      {
        numero:'12',
        ruc:'20347100316',
        proveedor:'Clinica Jesus del Norte',
        oa:'25765',
        fecha_atencion:'10/02/2021',
        plan:'Plan Mas Salud',
        especialidad:'PEDIATRIA',
        comprobante:'F001-0006',
        afiliado:'Jorge Guerra Aguirrre',
        estado:'Atención abierta'
      },
      {
        numero:'13',
        ruc:'20347100317',
        proveedor:'Clinica Jesus Maria',
        oa:'25765',
        fecha_atencion:'10/02/2021',
        plan:'Plan Mas Salud',
        especialidad:'PEDIATRIA',
        comprobante:'F001-0006',
        afiliado:'Jorge Guerra Aguirrre',
        estado:'Atención abierta'
      }



    ]

  }



  sortData(sort: Sort) {

    const data = this.dataAfiliado.slice();
    console.log("aeaaa",data)
    if (!sort.active || sort.direction === '') {
      this.sortedData2 = data;
      return;
    }
    this.dataAfiliado = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'numero':
          return compare(a.numero, b.numero,isAsc);
        case 'ruc':
          return compare(a.ruc, b.ruc, isAsc);
        case 'proveedor':
          return compare(a.proveedor, b.proveedor, isAsc);
        case 'oa':
          return compare(a.oa, b.oa, isAsc);
        case 'fecha_atencion':
          return compare(a.fecha_atencion, b.fecha_atencion, isAsc);
        case 'plan':
          return compare(a.plan, b.plan, isAsc);
        case 'especialidad':
          return compare(a.especialidad, b.especialidad, isAsc);
        case 'comprobante':
          return compare(a.comprobante, b.comprobante, isAsc);
          case 'afiliado':
            return compare(a.afiliado, b.afiliado, isAsc);
        case 'estado':
          return compare(a.estado, b.estado, isAsc);
        default:
          return 0;
      }
    });

  }
  estado() {


  }


 mostrarRegistro(){
  this.mostrarRegistroGasto= true
  this.mostrarTabla= false
 }
  openDialog(value: any) {
    this.dialog.open(ModalRechazoFacturaComponent, {
      width: '500px',
      height: '424px',
      panelClass: 'modalObersvado-declaration-modal',
      data: value
    }) .afterClosed()
    .subscribe((data: any) => {
      console.log("data",data);
      
      if(data){
        // alert("Se eliminon correctamente el id", )

        this.dataAfiliado = this.dataAfiliado.filter(
          (afiliado) => afiliado.iddocumento != data.iddocumento
        );
      }
    });
  }

  filtrarSearch(){
    console.log("aea",this.valueInput)

    if(this.valueInput == ''){
      this.dataAfiliado = this.sortedData2
    }else{
      this.filtrar()
    }

  }



  filtrar(): void {
    this.page = 1;

    this.dataAfiliado = this.dataAfiliado.filter(
      (filtro) =>
           filtro.numero
          .toString()
          .toLowerCase()
          .includes(this.valueInput.toLowerCase()) ||
          filtro.ruc
          .toString()
          .toLowerCase()
          .includes(this.valueInput.toLowerCase()) ||
          filtro.proveedor
          .toString()
          .toLowerCase()
          .includes(this.valueInput.toLowerCase()) ||
          filtro.oa
          .toString()
          .toLowerCase()
          .includes(this.valueInput.toLowerCase()) ||
          filtro.fecha_atencion
          .toString()
          .toLowerCase()
          .includes(this.valueInput.toLowerCase()) ||
          filtro.plan
          .toString()
          .toLowerCase()
          .includes(this.valueInput.toLowerCase())||
          filtro.especialidad
          .toString()
          .toLowerCase()
          .includes(this.valueInput.toLowerCase())||
          filtro.comprobante
          .toString()
          .toLowerCase()
          .includes(this.valueInput.toLowerCase())||
          filtro.afiliado
          .toString()
          .toLowerCase()
          .includes(this.valueInput.toLowerCase())||
          filtro.estado
          .toString()
          .toLowerCase()
          .includes(this.valueInput.toLowerCase())

    );

  }


  // agregaremos una propiedad al arreglo que se muestra en la tabla
  addState(value:any){
    // asignamos la propiedad state al arreglo
    value.state = true
    let index = this.dataAfiliado.findIndex(item => item.numero == value.numero)

    this.dataAfiliado[index] = value

  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  console.log("a",a,"b",b)
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);

}
