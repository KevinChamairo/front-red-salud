// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { SuscripcionRoutingModule } from './suscripcion.routing.module';
// import { AdminSharedModule } from '../shared/adminshared.module';
// import { SharedModule } from 'src/app/shared/shared.module';
// import { SuscripcionComponent} from './suscripcion.component';

import { NgModule } from "@angular/core";
import { SuscripcionComponent } from "./suscripcion.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SuscripcionRoutingModule } from "./suscripcion.routing.module";
import { CommonModule } from "@angular/common";
import { AdminSharedModule } from "../shared/adminshared.module";

@NgModule({
  declarations: [SuscripcionComponent],
  imports: [
    CommonModule,
    SuscripcionRoutingModule,
    AdminSharedModule,
    SharedModule,
  ],
  exports: [AdminSharedModule, SharedModule],
})
export class SucripcionModule {}
