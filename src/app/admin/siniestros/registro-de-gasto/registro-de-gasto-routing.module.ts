import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroDeGastoComponent } from './registro-de-gasto.component';

const routes: Routes = [
  { path: '', component: RegistroDeGastoComponent },
  { path: '**', component: RegistroDeGastoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroDeGastoRoutingModule {}
