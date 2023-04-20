import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-cargo',
  templateUrl: './modal-cargo.component.html',
  styleUrls: ['./modal-cargo.component.scss']
})
export class ModalCargoComponent implements OnInit {

  public administracionDerivada : number = 0
  public contabilidadDerivada: number = 0
  public siniestroDerivada : number = 0
  constructor(  public dialogRef: MatDialogRef<ModalCargoComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) { }
  
  ngOnInit(): void {
    console.log("data viene",this.data)
    if(this.data.administracion > 0){
      this.administracionDerivada = this.data.administracion
    }
    if(this.data.contabilidad > 0){
      this.contabilidadDerivada = this.data.contabilidad 
    }
    if(this.data.siniestro > 0){
      this.siniestroDerivada = this.data.siniestro
    }
  }
  salir (){
    this.dialogRef.close();
  }
}
