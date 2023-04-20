import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MesadepartesService } from '../../services/mesadepartes/mesadepartes.service';
import { ModalSuccesfullComponent } from '../modal-succesfull/modal-succesfull.component';

@Component({
  selector: 'app-modal-observado',
  templateUrl: './modal-observado.component.html',
  styleUrls: ['./modal-observado.component.scss']
})
export class ModalObservadoComponent implements OnInit {

  constructor(   private dialog: MatDialog,public dialogRef: MatDialogRef<ModalObservadoComponent>, @Inject(MAT_DIALOG_DATA) public data: any ,    private fb: FormBuilder,private services: MesadepartesService ) { }
  public dataRequestObservado : any=[]
  public loading: boolean = false;
  ngOnInit(): void {
    console.log("data viene",this.data)
    this.dataRequestObservado = this.data
  }
  formu = this.fb.group({

    sele1: [
      { value: 0, disabled: false },
      [Validators.required, Validators.min(-2)],
    ],
  motivo : [
    {value: '', disabled: false},
    [Validators.required]
  ]

  })
  public tipoObservado = [
    {
      id: "1",
      nombre: "sin OA",
    },
    {
      id: "2",
      nombre: "Documento Ilegible",
    }
  ]

  salir (){
    this.dialogRef.close('enviar');
  }
  validar(){
    console.log("formu", this.formu.valid)
    if(this.formu.valid){
      this.loading = true
      this.dataRequestObservado.estado = 3
      this.dataRequestObservado.idmotivo = this.formu.get('sele1')?.value
      this.dataRequestObservado.descripcion_observacion = this.formu.get('motivo')?.value
      console.log("esto se envia", this.dataRequestObservado)
      this.services.registrarDocumentoForm1(this.dataRequestObservado).subscribe((data: any) => {

        this.loading = false;
        this.salir()
        this.openDialogSuccesfull()
        
        
      });
    }

  }
  
  openDialogSuccesfull(){
    this.dialog.open(ModalSuccesfullComponent, {
      width: '500px',
      height: '265px',
      panelClass:'wildcard-automatic-debit-declaration-modal'
    });
  }
}
