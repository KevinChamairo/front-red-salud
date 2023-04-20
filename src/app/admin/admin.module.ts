import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { IndexComponent } from './pages/index/index.component';
import { AdminRoutingModule } from './admin.routing.module';
import { SharedModule } from '../shared/shared.module';
import { ContabilidadModule } from './contabilidad/contabilidad.module';
import { MesapartesModule } from './mesapartes/mesapartes.module';
import { AutorizacionesModule } from './autorizaciones/autorizaciones.module';

@NgModule({
  declarations: [AdminComponent, IndexComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ContabilidadModule,
    MesapartesModule,
    AutorizacionesModule
  ],
})
export class AdminModule {}
