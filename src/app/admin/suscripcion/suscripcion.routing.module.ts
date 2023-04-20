import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuscripcionComponent } from './suscripcion.component';

const routes: Routes = [
  {
    path: '',
    component: SuscripcionComponent,
    pathMatch: 'full',
  },
  {
    path: 'broker',
    loadChildren: () =>
      import('./broker/broker.module').then((m) => m.BrokerModule),
  },
  // {
  //   path: 'seguimiento',
  //   loadChildren: () =>
  //     import('./seguimiento/seguimiento.module').then((m) => m.SeguimientoModule),
  // },
  {
    path: '**',
    redirectTo: 'devoluciones',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuscripcionRoutingModule {}
