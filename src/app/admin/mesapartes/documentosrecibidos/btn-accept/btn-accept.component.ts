import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalObservadoComponent } from '../modal-observado/modal-observado.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalUpsComponent } from '../modal-ups/modal-ups.component';
import { MesadepartesService } from '../../services/mesadepartes/mesadepartes.service';
import { Formulario1 } from '../../interfaces/mesapartes.interface';
import { ModalSuccesfullComponent } from '../modal-succesfull/modal-succesfull.component';
import { ModalUpsOAComponent } from '../modal-ups-oa/modal-ups-oa.component';

@Component({
  selector: 'app-btn-accept',
  templateUrl: './btn-accept.component.html',
  styleUrls: ['./btn-accept.component.scss'],
})
export class BtnAcceptComponent implements OnInit {
  public estaValidado: boolean = false;
  public oaValidada : boolean = false;
  public valueRequestRegister : any = []
  public loading: boolean = false;
  public form1!: Formulario1;  
  @Input()
  set valueform(value: any) {
    console.log('valor al boton hijo', value);
    try {
      if(value.orden_atencion.length !==0){
      this.valueRequestRegister = value

        this.validarBodyRequest(value)
      }
    } catch (error) {
      this.valueRequestRegister = value
      this.estaValidado = false
   
    }


  }


  @Output() limpiar = new EventEmitter<string>();
  constructor(private fb: FormBuilder, private dialog: MatDialog,private services: MesadepartesService) {}
  formSelect = this.fb.group({
    sele1: [{ value: '', disabled: false }],
  });
  public tipoEstado = [
    {
      id: '1',
      nombre: 'aceptado',
    },
    {
      id: '3',
      nombre: 'observado',
    },
  ];
  ngOnInit(): void {}
  openDialog() {
    this.dialog.open(ModalObservadoComponent, {
      width: '500px',
      height: '458px',
      panelClass: 'modalObersvado-declaration-modal',
      data:this.form1,
      
    })
    .afterClosed()
    .subscribe((data: any) => {
      if (data == 'enviar') {
        this.limpiar.emit("limpiar")
      }else{
        
      }
    });
  //   .subscribe(

  //  ()=>{
  //  
  //  }   
  //   )
  }

  validarEstado() {
    if(this.estaValidado == true){
      console.log("entro")
      let value = this.formSelect.get('sele1')?.value;
      if (value == '3') {
        this.openDialog();
      } else {
        if (value == '1') {
          this.loading = true;
          console.log("esto se va enviar",this.form1)
          
          this.services.registrarDocumentoForm1(this.form1).subscribe((data: any) => {
            this.loading = false;
            this.openDialogSuccesfull()
            this.limpiar.emit("limpiar")
            
          });
        }
      }
    }else{
      if (this.valueRequestRegister.nombreComercial == null) {
        alert(" Verificar los datos")
      }else{
        if(this.oaValidada == false){
          this.openDialogUps()
        }else{
          alert("verifica los datos cñor")
        }
      }
 
   
    }

  }

  validarBodyRequest (request:any){
    console.log("llegueeee",request)
    for (let index = 0; index < request.orden_atencion.length; index++) {
      const element = request.orden_atencion[index];

      if(element.importe_oa == request.importe){
        console.log("validado")
        this.estaValidado = true 
        this.oaValidada = true
        this.form1 = request
      }else{
        console.log("invalidado")
        this.estaValidado = false 
        this.oaValidada = false
      }
      
    }

    

  }

  openDialogSuccesfull(){
    this.dialog.open(ModalSuccesfullComponent, {
      width: '500px',
      height: '265px',
      panelClass:'wildcard-automatic-debit-declaration-modal'
    });
  }

  openDialogUps(){
    this.dialog.open(ModalUpsOAComponent,{
      width: '500px',
      height: '300px',
      panelClass:'modalups-modal'
    })
  }
}
