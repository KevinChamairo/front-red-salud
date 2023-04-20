import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroDeGastoRoutingModule } from './registro-de-gasto-routing.module';
import { SharedModule } from '../../../shared/shared.module';


import { DatosAfiliadoComponent } from './datos-afiliado/datos-afiliado.component';
import { RegistroDeGastoComponent } from './registro-de-gasto.component';
import { ModalRechazoFacturaComponent } from './modal-rechazo-factura/modal-rechazo-factura.component';
import { ExpedienteComponent } from './expediente/expediente.component';
import { AcordeonMedicinasComponent } from './acordeon-medicinas/acordeon-medicinas.component';


@NgModule({
  declarations: [

    DatosAfiliadoComponent,
    ModalRechazoFacturaComponent,
    ExpedienteComponent,
    AcordeonMedicinasComponent
  ],
  imports: [

    CommonModule,
    RegistroDeGastoRoutingModule,SharedModule
  ],
  exports:[DatosAfiliadoComponent,ModalRechazoFacturaComponent,ExpedienteComponent,AcordeonMedicinasComponent],
  providers: [],
})
export class RegistroDeGastoModule { }
