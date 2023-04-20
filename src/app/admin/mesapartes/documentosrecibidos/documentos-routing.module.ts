import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DocumentosrecibidosComponent } from './documentosrecibidos.component';

const routes: Routes = [
  { path: '', component: DocumentosrecibidosComponent },
  { path: '**', component: DocumentosrecibidosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class documentosRoutingModule {}
