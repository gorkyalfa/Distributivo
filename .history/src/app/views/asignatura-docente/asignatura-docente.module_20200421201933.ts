import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AsignaturaDocenteComponent } from './asignatura-docente.component';
import { AsignaturaDocenteRoutingModule } from './asignatura-docente-routing.module';
import { CommonModule } from '@angular/common';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AlertModule.forRoot(),
    AsignaturaDocenteRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ AsignaturaDocenteComponent ]
})
export class AsignaturaDocenteModule { }
