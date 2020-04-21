import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignaturaDocenteComponent } from './asignatura-docente.component';

const routes: Routes = [
  {
    path: '',
    component: AsignaturaDocenteComponent,
    data: {
      title: 'Asignaturas de los docentes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignaturaDocenteRoutingModule {}
