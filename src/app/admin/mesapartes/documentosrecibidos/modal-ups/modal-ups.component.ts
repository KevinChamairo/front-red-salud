import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-ups',
  templateUrl: './modal-ups.component.html',
  styleUrls: ['./modal-ups.component.scss']
})
export class ModalUpsComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ModalUpsComponent>,) { }

  ngOnInit(): void {
  }
  salir (){
    this.dialogRef.close();
  }
}
