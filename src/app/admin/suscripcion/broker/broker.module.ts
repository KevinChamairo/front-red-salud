// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AdminSharedModule } from '../../shared/adminshared.module';
// import { SharedModule } from 'src/app/shared/shared.module';
// import { BrokerRoutingModule } from './broker.routing.module';
// import { BrokerComponent } from './broker.component';
// import {MatTableModule} from '@angular/material/table';

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { BrokerRoutingModule } from "./broker.routing.module";
import { BrokerComponent } from "./broker.component";
import { AdminSharedModule } from "../../shared/adminshared.module";


@NgModule({
  declarations: [BrokerComponent],
  imports: [
    CommonModule,
    BrokerRoutingModule,
    SharedModule,
    AdminSharedModule,
    //  MatTableModule
  ],
  exports: [AdminSharedModule, SharedModule],
})
export class BrokerModule {}
