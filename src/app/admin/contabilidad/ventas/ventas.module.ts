import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasComponent } from './ventas.component';
import { VentasRoutingModule } from './ventas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { VentasService } from '../services/ventas/ventas.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [VentasComponent],
  imports: [CommonModule, VentasRoutingModule, SharedModule],
})
export class VentasModule {}
