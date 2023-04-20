import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Componentes
import { LoadingComponent } from './components/loading/loading.component';
// Modulos Angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Modulos material
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './components/header/header.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { OpcionfiltroComponent } from './components/opcionfiltro/opcionfiltro.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
// Componentes para reutilizar
const components = [
  LoadingComponent,
  HeaderComponent,
  DrawerComponent,
  FiltroComponent,
  OpcionfiltroComponent,
];
// Modulos de material
const materialModules = [
  MatMenuModule,
  MatIconModule,
  MatExpansionModule,
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTooltipModule,
  MatTabsModule,
  MatSidenavModule,
  NgxPaginationModule,
  MatSortModule,
  MatAutocompleteModule
];
// Modulos de angular
const modules = [FormsModule, ReactiveFormsModule];
// Modulos externos
const externalModules = [];

@NgModule({
  declarations: [
    components,
    FiltroComponent,
    HeaderComponent,
    OpcionfiltroComponent,
  ],
  imports: [CommonModule, materialModules, modules],
  exports: [components, materialModules, modules],
})
export class SharedModule {}
