import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorizacionesRoutingModule } from './autorizaciones-routing.module';
// import { GenerarAutorizacionComponent } from './generar-autorizacion/generar-autorizacion.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { GenerarAutorizacionesEspecialesComponent } from './generar-autorizaciones-especiales/generar-autorizaciones-especiales.component';
import { GenerarAutorizacionesEspecialesRoutingModule } from './generar-autorizaciones-especiales/generar-autorizaciones-especiales-routing.module';
import { GenerarAutorizacionesEspecialesModule } from './generar-autorizaciones-especiales/generar-autorizaciones-especiales.module';



@NgModule({
  declarations: [
    // GenerarAutorizacionComponent,
    GenerarAutorizacionesEspecialesComponent,

  ],
  imports: [
    CommonModule,
    AutorizacionesRoutingModule,
    // GenerarAutorizacionModule,
    GenerarAutorizacionesEspecialesModule,
    // GenerarAutorizacionesEspecialesRoutingModule,
    SharedModule
  ]
})
export class AutorizacionesModule { }
