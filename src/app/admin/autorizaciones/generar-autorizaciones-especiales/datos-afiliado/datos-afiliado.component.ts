import { Component, OnInit,Input } from '@angular/core';
import {Asegurado} from '../../interfaces/autorizaciones.interface'
@Component({
  selector: 'app-datos-afiliado',
  templateUrl: './datos-afiliado.component.html',
  styleUrls: ['./datos-afiliado.component.scss']
})



export class DatosAfiliadoComponent implements OnInit {
  public Asegurados!: Asegurado;
  @Input()
  set dataafiliado(value:any){
    console.log("dataafiliado",value)
    this.Asegurados  = value.asegurado
    console.log(this.Asegurados)
  }


  constructor() { }

  ngOnInit(): void {

  }

}
