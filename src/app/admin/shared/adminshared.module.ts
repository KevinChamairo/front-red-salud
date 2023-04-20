import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { HeaderComponent } from './components/header/header.component';
// import { DrawerComponent } from './components/drawer/drawer.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
// import { FilterComponent } from './components/filter/filter.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { DialogComponent } from './components/dialog/dialog.component';
// import { DialogFormComponent } from './components/dialog-form/dialog-form.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { DialogContratoComponent } from './components/dialog-contrato/dialog-contrato.component';
// import { DialogContabilidadComponent } from './components/dialog-contabilidad/dialog-contabilidad/dialog-contabilidad.component';
// import { DialogPreguntasComponent } from './components/dialog-preguntas/dialog-preguntas.component';
// import { TextEditorComponent } from './components/text-editor/text-editor.component';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import { SafeHtmlPidePipe } from './pipes/SafeHtmlPidePipe/safe-html-pide.pipe';
// import { StyleClassPipe } from './pipes/StyleClass/style-class.pipe';
// import { SwiperModule } from 'swiper/angular';
// import { DialogSeguimientoComponent } from './components/dialog-seguimiento/dialog-seguimiento.component';
// import { DialogDeclaracionComponent } from './components/dialog-declaracion/dialog-declaracion.component';
// import { ModaleditComponent } from './components/modaledit/modaledit.component';
// import { SharedModule } from 'src/app/shared/shared.module';
// import { AltamodalComponent } from './components/altamodal/altamodal.component';
// import { DialogSetiafComponent } from './components/dialog-setiaf/dialog-setiaf.component';

const components = [
  // HeaderComponent,
  // DrawerComponent,
  // TextEditorComponent,
  // FilterComponent,
  // DialogComponent,
  // DialogFormComponent,
  // DialogContratoComponent,
  // DialogContabilidadComponent,
  // SafeHtmlPidePipe,
  // StyleClassPipe,
  // DialogPreguntasComponent,
];

const mat_modules = [
  MatMenuModule,
  MatIconModule,
  MatExpansionModule,
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,
  FormsModule,
  ReactiveFormsModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatDialogModule,
  MatCheckboxModule,
  MatStepperModule,
  MatRadioModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatDividerModule,
  MatTabsModule,
  MatSidenavModule,
  MatSlideToggleModule,
  // SwiperModule,
  // SharedModule,
  NgxPaginationModule,
  // CKEditorModule,
];

@NgModule({
  declarations: [
    // components,
    // DialogSeguimientoComponent,
    // DialogDeclaracionComponent,
    // ModaleditComponent,
    // AltamodalComponent,
    // DialogSetiafComponent
  ],
  imports: [CommonModule, RouterModule, mat_modules, NgxPaginationModule],
  // exports: [components, mat_modules, NgxPaginationModule],
})
export class AdminSharedModule {}
