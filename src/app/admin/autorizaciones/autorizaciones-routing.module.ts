import { GenerarAutorizacionesEspecialesComponent } from './generar-autorizaciones-especiales/generar-autorizaciones-especiales.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { GenerarAutorizacionComponent } from './generar-autorizacion/generar-autorizacion.component';
GenerarAutorizacionesEspecialesComponent
const routes: Routes = [
  { path: '', component: GenerarAutorizacionesEspecialesComponent },
  { path: '**', component: GenerarAutorizacionesEspecialesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorizacionesRoutingModule { }
