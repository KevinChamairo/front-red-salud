import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VentasComponent } from './ventas.component';

const routes: Routes = [
  { path: '', component: VentasComponent },
  { path: '**', component: VentasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasRoutingModule {}
