import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-ups-oa',
  templateUrl: './modal-ups-oa.component.html',
  styleUrls: ['./modal-ups-oa.component.scss']
})
export class ModalUpsOAComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ModalUpsOAComponent>) { }

  ngOnInit(): void {
  }
  salir (){
    this.dialogRef.close();
  }
}
