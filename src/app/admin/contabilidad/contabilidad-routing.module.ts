import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ventas',
    pathMatch: 'full',
  },
  {
    path: 'ventas',
    loadChildren: () =>
      import('./ventas/ventas.module').then((m) => m.VentasModule),
  },
  {
    path: '**',
    redirectTo: 'ventas',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// export class FeatureRoutingModule {}
export class ContabilidadRoutingModule {}
