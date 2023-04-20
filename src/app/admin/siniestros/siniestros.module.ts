import { RegistroDeGastoModule } from './registro-de-gasto/registro-de-gasto.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiniestrosRoutingModule } from './siniestros-routing.module';
import { RegistroDeGastoComponent } from './registro-de-gasto/registro-de-gasto.component';

import { SharedModule } from '../../shared/shared.module';
import { RegistroDeGastoRoutingModule } from './registro-de-gasto/registro-de-gasto-routing.module';
// import { AcordionMedicinasComponent } from './acordion-medicinas/acordion-medicinas.component';



@NgModule({
  declarations: [RegistroDeGastoComponent],
  imports: [
    CommonModule,
    SiniestrosRoutingModule,
    RegistroDeGastoModule,
    SharedModule
  ]
})
export class SiniestrosModule { }
