import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContabilidadRoutingModule } from './contabilidad-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ContabilidadRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
})
export class ContabilidadModule {}
