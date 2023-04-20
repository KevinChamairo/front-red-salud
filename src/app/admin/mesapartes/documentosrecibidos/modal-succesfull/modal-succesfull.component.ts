import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-succesfull',
  templateUrl: './modal-succesfull.component.html',
  styleUrls: ['./modal-succesfull.component.scss']
})
export class ModalSuccesfullComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalSuccesfullComponent>,
  ) { }

  ngOnInit(): void {
  }
  salir (){
    this.dialogRef.close();
  }
}
