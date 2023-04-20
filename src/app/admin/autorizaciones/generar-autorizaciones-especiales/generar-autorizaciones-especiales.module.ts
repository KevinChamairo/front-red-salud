import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerarAutorizacionesEspecialesRoutingModule } from './generar-autorizaciones-especiales-routing.module';
import { CargarExpedienteComponent } from './cargar-expediente/cargar-expediente.component';
import { DatosAfiliadoComponent } from './datos-afiliado/datos-afiliado.component';
import { ModalProveedorComponent } from './modal-proveedor/modal-proveedor.component';
import { ModalSuccesAutorizacionComponent } from './modal-succes-autorizacion/modal-succes-autorizacion.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    CargarExpedienteComponent,
    DatosAfiliadoComponent,
    ModalProveedorComponent,
    ModalSuccesAutorizacionComponent
  ],
  imports: [
    CommonModule,
    GenerarAutorizacionesEspecialesRoutingModule,
    SharedModule
  ],
  exports:[CargarExpedienteComponent,DatosAfiliadoComponent]
})
export class GenerarAutorizacionesEspecialesModule { }
