import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { imgs, Modulo } from 'src/app/shared/interfaces/auth';
import { LocalStorageStoreService } from '../../../auth/LocalStorage.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit {
  // @Input() modulo: Array<Modulo>;
  @Output() cl = new EventEmitter<string>();
  public panelOpenState: boolean = false;
  public clase: string = 'opened';
  public clase_modulo: string = 'modulo-open';
  public ModulesFromUser: any []= []
  constructor(private ruta: Router, private LocalStorage: LocalStorageStoreService) {}

  ngOnInit(): void {

   this.ModulesFromUser = JSON.parse(this.LocalStorage.getItem('modules'))


   console.log("modules", this.ModulesFromUser)

  }

  // Para abrir y cerrar el drawer
  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }

  // Para enviar el evento de cerrar para agrandar el contenido
  oyc(): void {
    if (this.clase == 'opened') {
      this.clase = 'closed';
    } else {
      this.clase = 'opened';
    }
    this.cl.emit(this.clase);
  }

  // Para abrir y cerrar el drawer
  class(s: string): string {
    let value = '';
    switch (s) {
      case 'drawer':
        value = this.clase;
        break;
      case 'modulo':
        this.clase == 'opened'
          ? (value = this.clase_modulo)
          : (value = 'modulo-close');
        break;
    }
    return value;
  }

  ir() {
    this.ruta.navigate(['admin/contabilidad/ventas']);
  }
  ir2() {
    this.ruta.navigate(['admin/mesadepartes/documentosRecibidos']);
  }
  ir3() {
    this.ruta.navigate(['admin/autorizaciones/generar-autorizaciones-especiales']);
  }
  ir4() {
    this.ruta.navigate(['admin/siniestros/registro-de-gastos']);
  }
  ir5() {
    this.ruta.navigate(['admin/suscripcion/broker']);
  }

  probando(value:any){
    console.log("value",value)
    if(value == 6){
      this.ir()
    }

    if(value == 17){
      this.ir2()
    }
    if(value == 45){
      this.ir5()
    }
  }
}
