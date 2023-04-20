import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerarAutorizacionesEspecialesComponent } from './generar-autorizaciones-especiales.component';
const routes: Routes = [
  { path: '', component: GenerarAutorizacionesEspecialesComponent },
  { path: '**', component: GenerarAutorizacionesEspecialesComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerarAutorizacionesEspecialesRoutingModule { }
