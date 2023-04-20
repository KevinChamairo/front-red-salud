import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: IndexComponent,
      },
      //   {
      //     path: 'perfil',
      //     loadChildren: () =>
      //       import(`./perfil/perfil.module`).then((m) => m.PerfilModule),
      //   },
      {
        path: 'contabilidad',
        loadChildren: () =>
          import('./contabilidad/contabilidad.module').then(
            (m) => m.ContabilidadModule
          ),
      },
      {
        path: 'mesadepartes',
        loadChildren: () =>
          import('./mesapartes/mesapartes.module').then(
            (m) => m.MesapartesModule
          ),
      },
      {
        path: 'suscripcion',
        loadChildren: () =>
          import('./suscripcion/suscripcion.module').then(
            (m) => m.SucripcionModule
          ),
      },

      {
        path: 'autorizaciones',
        loadChildren: ()=>
        import('./autorizaciones/autorizaciones.module').then(
          (m) => m.AutorizacionesModule
          )
      },
      {
        path: 'siniestros',
        loadChildren: ()=>
        import('./siniestros/siniestros.module').then(
          (m) => m.SiniestrosModule
          )
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
