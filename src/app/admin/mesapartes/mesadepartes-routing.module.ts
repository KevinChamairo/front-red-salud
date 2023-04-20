import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'documentosRecibidos',
    pathMatch: 'full',
  },
  {
    path: 'documentosRecibidos',
    loadChildren: () =>
      import('./documentosrecibidos/documentosrecibidos.module').then(
        (m) => m.DocumentosRecibidosModule
      ),
  },
  {
    path: '**',
    redirectTo: 'documentosRecibidos',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// export class FeatureRoutingModule {}
export class MesadePartesRoutingModule {}
