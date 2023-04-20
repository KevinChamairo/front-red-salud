import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss'],
})
export class FiltroComponent implements OnInit {
  @Input() public tipo: string = 'emisión';
  @Output() fechas = new EventEmitter<{ inicio: string; fin: string }>();
  public filtroFG = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filtroFG = this.fb.group({
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
    });
  }

  public enviarFechas(): void {
    try {
      this.fechas.emit({
        inicio: this.retornarFecha(
          this.filtroFG.get('inicio')?.value.toLocaleDateString()
        ),
        fin: this.retornarFecha(
          this.filtroFG.get('fin')?.value.toLocaleDateString()
        ),
      });
    } catch (error) {
      alert("Error verifica los datos ingresados")
    }
 
  }

  public retornarFecha(fx: string): string {
    let f = fx.split('/');
    return `${f[2]}-${f[1]}-${f[0]}`;
  }
}
