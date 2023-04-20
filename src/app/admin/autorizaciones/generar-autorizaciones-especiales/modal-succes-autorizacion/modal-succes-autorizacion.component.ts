import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-succes-autorizacion',
  templateUrl: './modal-succes-autorizacion.component.html',
  styleUrls: ['./modal-succes-autorizacion.component.scss']
})
export class ModalSuccesAutorizacionComponent implements OnInit {

  constructor(   public dialogRef: MatDialogRef<ModalSuccesAutorizacionComponent>,) { }

  ngOnInit(): void {
  }
  salir (){
    this.dialogRef.close();
  }
}
