import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentosrecibidosComponent } from './documentosrecibidos/documentosrecibidos.component';
import { MesadePartesRoutingModule } from './mesadepartes-routing.module';
import { DocumentosRecibidosModule } from './documentosrecibidos/documentosrecibidos.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [DocumentosrecibidosComponent],
  imports: [CommonModule, MesadePartesRoutingModule, DocumentosRecibidosModule,  MatDatepickerModule,
    MatFormFieldModule,SharedModule],
})
export class MesapartesModule {}
