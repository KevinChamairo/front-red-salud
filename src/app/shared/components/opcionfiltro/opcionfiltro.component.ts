import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  clientes,
  Datocobro,
  Datocobro1,
  series,
} from 'src/app/admin/contabilidad/interfaces/ventas.interface';

@Component({
  selector: 'app-opcionfiltro',
  templateUrl: './opcionfiltro.component.html',
  styleUrls: ['./opcionfiltro.component.scss'],
})
export class OpcionfiltroComponent implements OnInit {
  constructor() {}
  @Input() public datocobro!: series[];
  @Output() fechas = new EventEmitter<{
    op: number;
    inicio: string;
    fin: string;
  }>();
  public fe1: any;
  public fe2: any;
  public op: string = '0';

  ngOnInit(): void {}

  public retornarFecha(fx: string): string {
    let f = fx.split('/');
    return `${f[2]}-${f[1]}-${f[0]}`;
  }

  b(): void {
    // console.log('input');

    // console.log(this.datocobro);
    // console.log(parseInt(this.op));
    // console.log(this.retornarFecha(this.fe1.toLocaleDateString()));
    // console.log(this.retornarFecha(this.fe2.toLocaleDateString()));
    this.fechas.emit({
      op: parseInt(this.op),
      inicio: this.retornarFecha(this.fe1.toLocaleDateString()),
      fin: this.retornarFecha(this.fe2.toLocaleDateString()),
    });
  }
}
