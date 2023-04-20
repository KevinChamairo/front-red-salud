import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { documentosRoutingModule } from './documentos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { FiltroTipoComponent } from './filtro-tipo/filtro-tipo.component';
import { ModalSuccesfullComponent } from './modal-succesfull/modal-succesfull.component';
import { OaComponent } from './oa/oa.component';
import { BtnAcceptComponent } from './btn-accept/btn-accept.component';
import { ModalObservadoComponent } from './modal-observado/modal-observado.component';
import { ModalUpsComponent } from './modal-ups/modal-ups.component';
import { ModalUpsOAComponent } from './modal-ups-oa/modal-ups-oa.component';
import { ModalCargoComponent } from './modal-cargo/modal-cargo.component';

@NgModule({
  declarations: [
 
       FiltroTipoComponent,
       ModalSuccesfullComponent,
       OaComponent,
       BtnAcceptComponent,
       ModalObservadoComponent,
       ModalUpsComponent,
       ModalUpsOAComponent,
       ModalCargoComponent
  ],
  imports: [CommonModule, documentosRoutingModule, SharedModule,],
  exports: [FiltroTipoComponent],
  providers: [],
})
export class DocumentosRecibidosModule {}
