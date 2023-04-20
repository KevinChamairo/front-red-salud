import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MesadepartesService } from 'src/app/admin/mesapartes/services/mesadepartes/mesadepartes.service';
import { SiniestrosService } from '../../services/siniestros.service';

@Component({
  selector: 'app-modal-rechazo-factura',
  templateUrl: './modal-rechazo-factura.component.html',
  styleUrls: ['./modal-rechazo-factura.component.scss']
})
export class ModalRechazoFacturaComponent implements OnInit {

  constructor(   private dialog: MatDialog,public dialogRef: MatDialogRef<ModalRechazoFacturaComponent>, @Inject(MAT_DIALOG_DATA) public data: any ,    private fb: FormBuilder,private services: SiniestrosService ) { }
  public loading: boolean = false;
  formu = this.fb.group({


  motivo : [
    {value: '', disabled: false},
    [Validators.required]
  ]

  })
  ngOnInit(): void {
    console.log("viene data", this.data);
  }
  rechazarFactura (){
   if( this.formu.valid){
    this.loading = true
    try {
      let bodyRequest = {
        id: this.data.iddocumento,
        estado:3,
        motivo: this.formu.get('motivo')?.value
      }
      this.services.rechazarFactura(bodyRequest).subscribe((data: any) => {

        this.loading = false;

        this.dialogRef.close(this.data);
        
      });
    } catch (error) {
      
    }
   }else{
    alert('Debe rellenar el campo Motivo correctamente')
   }
  }

  cancelar(){
    this.dialogRef.close();
  }
}
